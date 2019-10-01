import { Host, h } from "@stencil/core";
import { GeneralFormValueKey } from './model/general-form-value';
import Big from 'big.js';
import validate from 'validate.js';
import { getInvestmentGuideValueConstraints } from '../model/validate-constraints';
export class GeneralForm {
    constructor() {
        this.errors = {};
    }
    handlePercentValueChange(key, e) {
        const { value } = e.detail;
        if (this.isValid(value, key)) {
            this.valueChanged.emit(Object.assign(Object.assign({}, this.value), { [key]: +Big(value).div(100) }));
        }
    }
    handleNumberValueChange(key, e) {
        const { value } = e.detail;
        if (this.isValid(value, key)) {
            this.valueChanged.emit(Object.assign(Object.assign({}, this.value), { [key]: value }));
        }
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
    percent(key) {
        const value = this.value[key];
        return value ? Big(value).times(100).toString() : '';
    }
    render() {
        return (h(Host, null,
            h("ion-card", null,
                h("ion-card-header", null,
                    h("ion-card-title", null, "Details")),
                h("ion-item", { class: this.errors[GeneralFormValueKey.marginalTaxRate] ? 'ion-invalid' : '' },
                    h("ion-label", { position: "floating" }, "Current Marginal Tax Rate"),
                    h("ion-input", { value: this.percent(GeneralFormValueKey.marginalTaxRate), onIonChange: this.handlePercentValueChange.bind(this, GeneralFormValueKey.marginalTaxRate) }),
                    h("budgific-ig-info-button", { slot: "end" },
                        h("p", null,
                            "A marginal tax rate is the tax rate incurred on each additional dollar of income. ",
                            h("br", null),
                            "You can get the number from ",
                            h("a", { href: "https://simpletax.ca/calculator", target: "_blank" }, "Simple Tax Calculator"),
                            "."))),
                this.renderError(GeneralFormValueKey.marginalTaxRate),
                h("ion-item", { class: this.errors[GeneralFormValueKey.inflationRate] ? 'ion-invalid' : '' },
                    h("ion-label", { position: "floating" }, "Inflation Rate"),
                    h("ion-input", { value: this.percent(GeneralFormValueKey.inflationRate), onIonChange: this.handlePercentValueChange.bind(this, GeneralFormValueKey.inflationRate) }),
                    h("budgific-ig-info-button", { slot: "end" },
                        h("p", null, "Inflation is the increase in the prices of goods and services over time. In July 2019 Canadian inflation rate was 2%"))),
                this.renderError(GeneralFormValueKey.inflationRate),
                h("ion-item", { class: this.errors[GeneralFormValueKey.investmentRate] ? 'ion-invalid' : '' },
                    h("ion-label", { position: "floating" }, "Yearly Investment Rate of Return"),
                    h("ion-input", { value: this.percent(GeneralFormValueKey.investmentRate), onIonChange: this.handlePercentValueChange.bind(this, GeneralFormValueKey.investmentRate) }),
                    h("budgific-ig-info-button", { slot: "end" },
                        h("p", null, "A rate of return (RoR) is the net gain or loss on an investment over a year."))),
                this.renderError(GeneralFormValueKey.investmentRate),
                h("ion-item", { class: this.errors[GeneralFormValueKey.investmentHorizon] ? 'ion-invalid' : '' },
                    h("ion-label", { position: "floating" }, "Investment Horizon"),
                    h("ion-input", { value: this.value.investmentHorizon.toString(), onIonChange: this.handleNumberValueChange.bind(this, GeneralFormValueKey.investmentHorizon) }),
                    h("budgific-ig-info-button", { slot: "end" },
                        h("p", null, "Investment horizon is the total length of time that you expect to hold a security or a portfolio."))),
                this.renderError(GeneralFormValueKey.investmentHorizon),
                h("ion-item", { class: this.errors[GeneralFormValueKey.horizonMarginalTaxRate] ? 'ion-invalid' : '' },
                    h("ion-label", { position: "floating" }, "Horizon Marginal Tax Rate"),
                    h("ion-input", { value: this.percent(GeneralFormValueKey.horizonMarginalTaxRate), onIonChange: this.handlePercentValueChange.bind(this, GeneralFormValueKey.horizonMarginalTaxRate) }),
                    h("budgific-ig-info-button", { slot: "end" },
                        h("p", null,
                            "A horizon marginal tax rate is the tax rate incurred on each additional dollar of income when you will withdraw a security or a portfolio. ",
                            h("br", null),
                            "You can get the number from ",
                            h("a", { href: "https://simpletax.ca/calculator", target: "_blank" }, "Simple Tax Calculator"),
                            "."))),
                this.renderError(GeneralFormValueKey.horizonMarginalTaxRate),
                h("ion-item", { class: this.errors[GeneralFormValueKey.horizonEffectiveTaxRate] ? 'ion-invalid' : '' },
                    h("ion-label", { position: "floating" }, "Horizon Actual Tax Rate"),
                    h("ion-input", { value: this.percent(GeneralFormValueKey.horizonEffectiveTaxRate), onIonChange: this.handlePercentValueChange.bind(this, GeneralFormValueKey.horizonEffectiveTaxRate) }),
                    h("budgific-ig-info-button", { slot: "end" },
                        h("p", null,
                            "A horizon marginal tax rate is the tax rate incurred on each additional dollar of income when you will withdraw a security or a portfolio. ",
                            h("br", null),
                            "You can get the number from ",
                            h("a", { href: "https://simpletax.ca/calculator", target: "_blank" }, "Simple Tax Calculator"),
                            "."))),
                this.renderError(GeneralFormValueKey.horizonEffectiveTaxRate))));
    }
    renderError(key) {
        return this.errors[key] ? h("ion-item", { class: "error-item" },
            h("ion-text", null, this.errors[key])) : null;
    }
    static get is() { return "budgific-ig-general-form"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["general-form.css"]
    }; }
    static get styleUrls() { return {
        "$": ["general-form.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "IGeneralFormValue",
                "resolved": "IGeneralFormValue",
                "references": {
                    "IGeneralFormValue": {
                        "location": "import",
                        "path": "./model/general-form-value"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The form value"
            }
        }
    }; }
    static get states() { return {
        "errors": {}
    }; }
    static get events() { return [{
            "method": "valueChanged",
            "name": "valueChanged",
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
}
