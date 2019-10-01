import { Host, h } from "@stencil/core";
import Chart from 'chart.js';
import Big from 'big.js';
import validate from 'validate.js';
import moment from 'moment';
import { TFSAData } from './model/tfsa-data';
import { RRSPData } from './model/rrsp-data';
import { NonRegisteredData } from './model/non-registered-data';
import { MortgageData } from './model/mortgage-data';
import { AccountLabel, AccountType, AccountColor } from '../model/account-type';
import { InvestmentGuideValueKey, InvestmentGuideValueLabel } from '../model/investment-guide-value';
import { GeneralFormValueKey } from '../general-form/model/general-form-value';
import { MortgageFormValueKey } from '../mortgage-form/model/mortgage-form-value';
import { getInvestmentGuideValueConstraints } from '../model/validate-constraints';
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
        this.chartOptions = {
            type: 'line',
            data: { labels: [], datasets: [] },
            options: {
                responsive: true,
                legend: { display: false },
                scales: {
                    yAxes: [{
                            ticks: { beginAtZero: true }
                        }]
                }
            }
        };
        this.errors = {};
        this.today = Date.now();
    }
    dataWatchHandler(newValue) {
        this.processData(newValue);
    }
    componentDidLoad() {
        this.processData(this.value, 200);
    }
    componentDidRender() {
        if (!this.barChart && this.charts) {
            this.barChart = new Chart(this.charts, this.chartOptions);
        }
    }
    processData(value, delay = 0) {
        this.data = value;
        if (value) {
            setTimeout(() => {
                this.mortgageData = this.mortgageData || new MortgageData(this.today);
                this.mortgageData.generateData(value);
                this.tfsaData = this.tfsaData || new TFSAData(this.today);
                this.tfsaData.generateData(value);
                this.rrspData = this.rrspData || new RRSPData(this.today);
                this.rrspData.generateData(value);
                this.nonRegisteredData = this.nonRegisteredData || new NonRegisteredData(this.today);
                this.nonRegisteredData.generateData(value);
                this.processGraphData();
            }, delay);
        }
    }
    processGraphData() {
        const maxLength = Math.max(this.mortgageData.chartData ? this.mortgageData.chartData.length : 0, this.tfsaData.chartData ? this.tfsaData.chartData.length : 0, this.rrspData.chartData ? this.rrspData.chartData.length : 0, this.nonRegisteredData.chartData ? this.nonRegisteredData.chartData.length : 0);
        if (!this.chartOptions.data.labels || this.chartOptions.data.labels.length !== maxLength) {
            const labels = Array.apply(null, Array(maxLength)).map((_x, i) => moment(this.today).add(i, 'year').year());
            this.chartOptions.data.labels = labels;
        }
        const dataSets = this.chartOptions.data.datasets;
        if (this.mortgageData.chartData) {
            const datasetIdx = dataSets.findIndex(d => d.label === AccountLabel.mortgage);
            if (datasetIdx > -1) {
                if (dataSets[datasetIdx].data !== this.mortgageData.chartData) {
                    dataSets[datasetIdx].data = this.mortgageData.chartData;
                }
            }
            else {
                dataSets.push(this.createDataset(AccountType.mortgage, this.mortgageData.chartData));
            }
        }
        if (this.tfsaData.chartData) {
            const datasetIdx = dataSets.findIndex(d => d.label === AccountLabel.tfsa);
            if (datasetIdx > -1) {
                if (dataSets[datasetIdx].data !== this.tfsaData.chartData) {
                    dataSets[datasetIdx].data = this.tfsaData.chartData;
                }
            }
            else {
                dataSets.push(this.createDataset(AccountType.tfsa, this.tfsaData.chartData));
            }
        }
        if (this.rrspData.chartData) {
            const datasetIdx = dataSets.findIndex(d => d.label === AccountLabel.rrsp);
            if (datasetIdx > -1) {
                if (dataSets[datasetIdx].data !== this.rrspData.chartData) {
                    dataSets[datasetIdx].data = this.rrspData.chartData;
                }
            }
            else {
                dataSets.push(this.createDataset(AccountType.rrsp, this.rrspData.chartData));
            }
        }
        if (this.nonRegisteredData.chartData) {
            const datasetIdx = dataSets.findIndex(d => d.label === AccountLabel.nonRegistered);
            if (datasetIdx > -1) {
                if (dataSets[datasetIdx].data !== this.nonRegisteredData.chartData) {
                    dataSets[datasetIdx].data = this.nonRegisteredData.chartData;
                }
            }
            else {
                dataSets.push(this.createDataset(AccountType.nonRegistered, this.nonRegisteredData.chartData));
            }
        }
        if (this.barChart) {
            this.barChart.update();
        }
    }
    createDataset(type, data) {
        return {
            label: AccountLabel[type],
            data: data,
            backgroundColor: AccountColor[type],
            borderColor: AccountColor[type],
            fill: false,
        };
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
            this.valueChange.emit(data);
        }
    }
    handleStepperPercentChange(key, e) {
        if (this.isValid(e.detail, key)) {
            const value = +Big(e.detail).div(100);
            const data = Object.assign(Object.assign({}, this.data), { [key]: value });
            this.valueChange.emit(data);
        }
    }
    handleStepperChange(key, e) {
        if (this.isValid(e.detail, key)) {
            const data = Object.assign(Object.assign({}, this.data), { [key]: e.detail });
            this.valueChange.emit(data);
        }
    }
    handleReinvestTaxReturnChange(e) {
        const data = Object.assign(Object.assign({}, this.data), { reinvestTaxReturn: e.detail.checked });
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
    currency(amount) {
        return amount ? `$${amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}` : '';
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
                    h("div", { class: "chart-spinner", style: { 'display': this.showChart() == 'hidden' ? 'flex' : 'none' } },
                        h("ion-spinner", { name: "lines", color: "primary" })),
                    h("canvas", { style: { 'visibility': this.showChart() }, ref: (charts) => this.charts = charts })))));
    }
    renderRRSPReinvestTaxReturnItem() {
        return this.options[InvestmentGuideValueKey.reinvestTaxReturn] || this.errors[InvestmentGuideValueKey.reinvestTaxReturn] ? [(h("ion-item", { class: this.errors[InvestmentGuideValueKey.amount] ? 'ion-invalid' : '' },
                h("ion-checkbox", { slot: "start", checked: this.data.reinvestTaxReturn, onIonChange: this.handleReinvestTaxReturnChange.bind(this) }),
                h("ion-label", null, "RRSP Reinvest Tax Return"),
                h("info-button", { slot: "end" },
                    h("p", null, "Reinvest the tax return."))))] : null;
    }
    renderFutureValue(data) {
        return data && data.futureValue ? (h("ion-note", { slot: "end", style: { 'font-size': '15px' } }, this.currency(data.futureValue))) : (h("ion-skeleton-text", { animated: true, style: { height: '17px', width: '72px' } }));
    }
    renderMortgageItem(show) {
        return show ? (h("ion-item", null,
            h("ion-icon", { slot: "start", name: "analytics", style: { color: AccountColor.mortgage } }),
            h("ion-label", null, AccountLabel.mortgage),
            this.renderFutureValue(this.mortgageData))) : null;
    }
    renderTFSAItem(show) {
        return show ? (h("ion-item", null,
            h("ion-icon", { slot: "start", name: "analytics", style: { color: AccountColor.tfsa } }),
            h("ion-label", null, AccountLabel.tfsa),
            this.renderFutureValue(this.tfsaData))) : null;
    }
    renderRRSPItem(show) {
        return show ? (h("ion-item", null,
            h("ion-icon", { slot: "start", name: "analytics", style: { color: AccountColor.rrsp } }),
            h("ion-label", null, AccountLabel.rrsp),
            this.renderFutureValue(this.rrspData))) : null;
    }
    renderNonRegisteredItem(show) {
        return show ? (h("ion-item", null,
            h("ion-icon", { slot: "start", name: "analytics", style: { color: AccountColor.nonRegistered } }),
            h("ion-label", null, AccountLabel.nonRegistered),
            this.renderFutureValue(this.nonRegisteredData))) : null;
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
    showChart() {
        const show = !!((this.mortgageData && this.mortgageData.chartData) || (this.tfsaData && this.tfsaData.chartData) || (this.rrspData && this.rrspData.chartData) || (this.nonRegisteredData && this.nonRegisteredData.chartData));
        return show ? 'inherit' : 'hidden';
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
            "mutable": true,
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
    static get states() { return {
        "mortgageData": {},
        "tfsaData": {},
        "rrspData": {},
        "nonRegisteredData": {},
        "options": {},
        "chartOptions": {},
        "data": {},
        "errors": {}
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
