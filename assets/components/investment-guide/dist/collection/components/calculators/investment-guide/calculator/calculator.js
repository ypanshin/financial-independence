import { Host, h } from "@stencil/core";
import Big from 'big.js';
import validate from 'validate.js';
import { AccountLabel, AccountColor } from '../model/account-type';
import { InvestmentGuideValueKey, InvestmentGuideValueLabel } from '../model/investment-guide-value';
import { GeneralFormValueKey } from '../general-form/model/general-form-value';
import { MortgageFormValueKey } from '../mortgage-form/model/mortgage-form-value';
import { getInvestmentGuideValueConstraints } from '../model/validate-constraints';
import { WebWorkerProxy } from './web-worker/web-worker-proxy';
import { Utils } from './utils';
const ValueKey = Object.assign(Object.assign(Object.assign({}, GeneralFormValueKey), InvestmentGuideValueKey), MortgageFormValueKey);
export class Calculator {
    constructor() {
        this.options = {
            [ValueKey.investmentHorizon]: false,
            [ValueKey.investmentRate]: false,
            [ValueKey.horizonMarginalTaxRate]: false,
            [ValueKey.horizonEffectiveTaxRate]: false,
            [ValueKey.marginalTaxRate]: false,
            [ValueKey.inflationRate]: false,
            [ValueKey.mortgageRate]: false,
            [ValueKey.reinvestTaxReturn]: false,
        };
        this.errors = {};
        this.loading = true;
        this.today = Date.now();
    }
    dataWatchHandler(newValue) {
        this.data = newValue;
        this.workerProxy.postMessage(newValue);
    }
    componentWillLoad() {
        this.workerProxy = new WebWorkerProxy(this.publicPath);
        this.workerProxy.onMessage = (message) => {
            this.processData(message);
            this.loading = false;
        };
    }
    componentDidLoad() {
        this.data = this.value;
        this.workerProxy.postMessage(this.value);
    }
    processData(data) {
        this.rrspFutureValue = data.rrsp.futureValue;
        this.tfsaFutureValue = data.tfsa.futureValue;
        this.mortgageFutureValue = data.mortgage.futureValue;
        this.nonRegisteredFutureValue = data.nonRegistered.futureValue;
        this.rrspData = data.rrsp;
        this.tfsaData = data.tfsa;
        this.mortgageData = data.mortgage;
        this.nonRegisteredData = data.nonRegistered;
    }
    isValid(value, key) {
        const invalid = validate.single(value, getInvestmentGuideValueConstraints()[key]);
        if (invalid) {
            this.errors = Object.assign(Object.assign({}, this.errors), { [key]: invalid[0] });
            return false;
        }
        else {
            this.errors = Object.assign(Object.assign({}, this.errors), { [key]: undefined });
            return true;
        }
    }
    handleAmountChange(e) {
        if (this.isValid(e.detail.value, InvestmentGuideValueKey.amount)) {
            const data = Object.assign(Object.assign({}, this.data), { amount: e.detail.value });
            this.loading = true;
            this.valueChange.emit(data);
        }
    }
    handleStepperPercentChange(key, e) {
        if (this.isValid(e.detail, key)) {
            const value = +Big(e.detail).div(100);
            const data = Object.assign(Object.assign({}, this.data), { [key]: value });
            this.loading = true;
            this.valueChange.emit(data);
        }
    }
    handleStepperChange(key, e) {
        if (this.isValid(e.detail, key)) {
            const data = Object.assign(Object.assign({}, this.data), { [key]: e.detail });
            this.loading = true;
            this.valueChange.emit(data);
        }
    }
    handleReinvestTaxReturnChange(e) {
        const data = Object.assign(Object.assign({}, this.data), { reinvestTaxReturn: e.detail.checked });
        this.loading = true;
        this.valueChange.emit(data);
    }
    percent(key) {
        return +Big(this.data[key]).times(100);
    }
    presentAlertCheckbox() {
        const alert = document.createElement('ion-alert');
        alert.header = 'Parameters';
        alert.inputs = Object.keys(this.options).map(key => ({
            type: 'checkbox',
            label: InvestmentGuideValueLabel[key],
            value: key,
            checked: this.options[key]
        }));
        alert.buttons = [{
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
            }, {
                text: 'Ok',
                handler: (selected) => {
                    for (const key of Object.keys(this.options)) {
                        this.options[key] = selected.indexOf(key) > -1;
                    }
                    this.options = Object.assign({}, this.options);
                }
            }];
        document.body.appendChild(alert);
        return alert.present();
    }
    render() {
        return (h(Host, null, this.data ? this.renderCalculator() : null));
    }
    renderCalculator() {
        return (h("div", null,
            h("ion-card", null,
                h("ion-item", { class: this.errors[InvestmentGuideValueKey.amount] ? 'ion-invalid' : '' },
                    h("ion-label", { position: "floating" }, "Amount"),
                    h("ion-input", { value: this.data.amount.toString(), onIonChange: this.handleAmountChange.bind(this) }),
                    h("ion-button", { slot: "end", fill: "clear", size: "default", onClick: () => this.configClick.emit() },
                        h("ion-icon", { name: "cog", slot: "icon-only" }))),
                this.renderError(InvestmentGuideValueKey.amount)),
            h("ion-card", null,
                h("ion-item", null,
                    h("ion-icon", { name: "options", slot: "start" }),
                    h("ion-label", null, "Parameters"),
                    h("ion-button", { slot: "end", fill: "clear", size: "default", onClick: this.presentAlertCheckbox.bind(this) },
                        h("ion-icon", { name: "add", slot: "icon-only" }))),
                this.renderPercentStepper(InvestmentGuideValueLabel[ValueKey.marginalTaxRate], ValueKey.marginalTaxRate, 1, 1, 50),
                this.renderError(ValueKey.marginalTaxRate),
                this.renderPercentStepper(InvestmentGuideValueLabel[ValueKey.inflationRate], ValueKey.inflationRate, 0.25, 0.25, 20),
                this.renderError(ValueKey.inflationRate),
                this.renderPercentStepper(InvestmentGuideValueLabel[ValueKey.investmentRate], ValueKey.investmentRate, 1, 0, 50),
                this.renderError(ValueKey.investmentRate),
                this.renderNumberStepper(InvestmentGuideValueLabel[ValueKey.investmentHorizon], ValueKey.investmentHorizon, 1, 1, 100),
                this.renderError(ValueKey.investmentHorizon),
                this.renderPercentStepper(InvestmentGuideValueLabel[ValueKey.horizonMarginalTaxRate], ValueKey.horizonMarginalTaxRate, 1, 0, 50),
                this.renderError(ValueKey.horizonMarginalTaxRate),
                this.renderPercentStepper(InvestmentGuideValueLabel[ValueKey.horizonEffectiveTaxRate], ValueKey.horizonEffectiveTaxRate, 1, 0, 50),
                this.renderError(ValueKey.horizonEffectiveTaxRate),
                this.renderPercentStepper(InvestmentGuideValueLabel[ValueKey.mortgageRate], ValueKey.mortgageRate, 0.25, 0.25, 50),
                this.renderError(ValueKey.mortgageRate),
                this.renderRRSPReinvestTaxReturnItem()),
            h("ion-card", null,
                this.renderMortgageItem(this.data.mortgage),
                this.renderTFSAItem(this.data.tfsa),
                this.renderRRSPItem(this.data.rrsp),
                this.renderNonRegisteredItem(this.data.nonRegistered)),
            h("ion-card", null,
                h("ion-card-content", null,
                    h("budgific-ig-schedule", { loading: this.loading, mortgage: this.mortgageData, rrsp: this.rrspData, tfsa: this.tfsaData, nonRegistered: this.nonRegisteredData })))));
    }
    renderRRSPReinvestTaxReturnItem() {
        return this.options[InvestmentGuideValueKey.reinvestTaxReturn] || this.errors[InvestmentGuideValueKey.reinvestTaxReturn] ? [(h("ion-item", { class: this.errors[InvestmentGuideValueKey.amount] ? 'ion-invalid' : '' },
                h("ion-checkbox", { slot: "start", checked: this.data.reinvestTaxReturn, onIonChange: this.handleReinvestTaxReturnChange.bind(this) }),
                h("ion-label", null, "RRSP Reinvest Tax Return"),
                h("info-button", { slot: "end" },
                    h("p", null, "Reinvest the tax return."))))] : null;
    }
    renderFutureValue(value) {
        return !this.loading ? (h("ion-note", { slot: "end", style: { 'font-size': '15px' } }, Utils.currency(value))) : (h("ion-skeleton-text", { animated: true, style: { height: '17px', width: '72px' } }));
    }
    renderMortgageItem(show) {
        return show ? (h("ion-item", null,
            h("ion-icon", { slot: "start", name: "analytics", style: { color: AccountColor.mortgage } }),
            h("ion-label", null, AccountLabel.mortgage),
            this.renderFutureValue(this.mortgageFutureValue))) : null;
    }
    renderTFSAItem(show) {
        return show ? (h("ion-item", null,
            h("ion-icon", { slot: "start", name: "analytics", style: { color: AccountColor.tfsa } }),
            h("ion-label", null, AccountLabel.tfsa),
            this.renderFutureValue(this.tfsaFutureValue))) : null;
    }
    renderRRSPItem(show) {
        return show ? (h("ion-item", null,
            h("ion-icon", { slot: "start", name: "analytics", style: { color: AccountColor.rrsp } }),
            h("ion-label", null, AccountLabel.rrsp),
            this.renderFutureValue(this.rrspFutureValue))) : null;
    }
    renderNonRegisteredItem(show) {
        return show ? (h("ion-item", null,
            h("ion-icon", { slot: "start", name: "analytics", style: { color: AccountColor.nonRegistered } }),
            h("ion-label", null, AccountLabel.nonRegistered),
            this.renderFutureValue(this.nonRegisteredFutureValue))) : null;
    }
    renderPercentStepper(label, key, step, min, max) {
        return this.options[key] || this.errors[key] ? (h("budgific-ig-stepper-item", { label: label, value: this.percent(key), step: step, min: min, max: max, onValueChange: this.handleStepperPercentChange.bind(this, key) })) : null;
    }
    renderNumberStepper(label, key, step, min, max) {
        return this.options[key] || this.errors[key] ? (h("budgific-ig-stepper-item", { label: label, value: this.data[key], step: step, min: min, max: max, onValueChange: this.handleStepperChange.bind(this, key) })) : null;
    }
    renderError(key) {
        return this.errors[key] ? h("ion-item", { class: "error-item" },
            h("ion-text", null, this.errors[key])) : null;
    }
    static get is() { return "budgific-ig-calculator"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calculator.css"]
    }; }
    static get styleUrls() { return {
        "$": ["calculator.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "IInvestmentGuideValue",
                "resolved": "IInvestmentGuideValue",
                "references": {
                    "IInvestmentGuideValue": {
                        "location": "import",
                        "path": "../model/investment-guide-value"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The value"
            }
        }
    }; }
    static get contextProps() { return [{
            "name": "publicPath",
            "context": "publicPath"
        }]; }
    static get states() { return {
        "options": {},
        "rrspFutureValue": {},
        "tfsaFutureValue": {},
        "mortgageFutureValue": {},
        "nonRegisteredFutureValue": {},
        "rrspData": {},
        "tfsaData": {},
        "mortgageData": {},
        "nonRegisteredData": {},
        "data": {},
        "errors": {},
        "loading": {}
    }; }
    static get events() { return [{
            "method": "valueChange",
            "name": "valueChange",
            "bubbles": true,
            "cancelable": true,
            "composed": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "configClick",
            "name": "configClick",
            "bubbles": true,
            "cancelable": true,
            "composed": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "dataWatchHandler"
        }]; }
}
