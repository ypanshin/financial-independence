import { Host, h } from "@stencil/core";
import { MortgageFormValueKey } from './model/mortgage-form-value';
import validate from 'validate.js';
import { getInvestmentGuideValueConstraints } from '../model/validate-constraints';
import Big from 'big.js';
export class MortgageForm {
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
                    h("ion-card-title", null, "Mortgage Details")),
                h("ion-item", { class: this.errors[MortgageFormValueKey.mortgageBalance] ? 'ion-invalid' : '' },
                    h("ion-label", { position: "floating" }, "Balance"),
                    h("ion-input", { value: this.value.mortgageBalance.toString(), onIonChange: this.handleNumberValueChange.bind(this, MortgageFormValueKey.mortgageBalance) }),
                    h("budgific-ig-info-button", { slot: "end" },
                        h("p", null, "A mortgage balance is the current amount owed by you."))),
                this.renderError(MortgageFormValueKey.mortgageBalance),
                h("ion-item", { class: this.errors[MortgageFormValueKey.mortgageRate] ? 'ion-invalid' : '' },
                    h("ion-label", { position: "floating" }, "Rate"),
                    h("ion-input", { value: this.percent(MortgageFormValueKey.mortgageRate), onIonChange: this.handlePercentValueChange.bind(this, MortgageFormValueKey.mortgageRate) }),
                    h("budgific-ig-info-button", { slot: "end" },
                        h("p", null, "A mortgage rate is the rate of interest charged on your mortgage."))),
                this.renderError(MortgageFormValueKey.mortgageRate),
                h("ion-item", { class: this.errors[MortgageFormValueKey.mortgageAmortization] ? 'ion-invalid' : '' },
                    h("ion-label", { position: "floating" }, "Amortization"),
                    h("ion-input", { value: this.value.mortgageAmortization.toString(), onIonChange: this.handleNumberValueChange.bind(this, MortgageFormValueKey.mortgageAmortization) }),
                    h("budgific-ig-info-button", { slot: "end" },
                        h("p", null, "The amortization period refers to the length of time, in years, that you chooses to pay off a mortgage."))),
                this.renderError(MortgageFormValueKey.mortgageAmortization))));
    }
    renderError(key) {
        return this.errors[key] ? h("ion-item", { class: "error-item" },
            h("ion-text", null, this.errors[key])) : null;
    }
    static get is() { return "budgific-ig-mortgage-form"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["mortgage-form.css"]
    }; }
    static get styleUrls() { return {
        "$": ["mortgage-form.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "IMortgageFormValue",
                "resolved": "IMortgageFormValue",
                "references": {
                    "IMortgageFormValue": {
                        "location": "import",
                        "path": "./model/mortgage-form-value"
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
