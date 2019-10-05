import { Host, h } from "@stencil/core";
import { AccountLabel } from '../model/account-type';
import { AccountsFormValueKey } from './model/accounts-form-value';
import validate from 'validate.js';
import { getInvestmentGuideValueConstraints } from '../model/validate-constraints';
export class AccountsForm {
    handleChange(e) {
        const { checked, value } = e.detail;
        let data = Object.assign(Object.assign({}, this.value), { [value]: checked });
        const validation = validate(data, getInvestmentGuideValueConstraints());
        if (validation && validation[value]) {
            this.error = 'At least one account should be selected.';
        }
        else {
            this.error = undefined;
        }
        this.valueChanged.emit(data);
    }
    render() {
        return (h(Host, null,
            h("ion-card", null,
                h("ion-card-header", null,
                    h("ion-card-title", null, "Select Accounts")),
                this.renderAccounts(),
                this.renderError(this.error))));
    }
    renderAccounts() {
        return Object.keys(AccountsFormValueKey).map(this.renderAccountItem.bind(this));
    }
    renderAccountItem(key) {
        return (h("ion-item", { class: this.error ? 'ion-invalid' : '' },
            h("ion-checkbox", { slot: "start", value: key, checked: this.value[key], onIonChange: this.handleChange.bind(this) }),
            h("ion-label", null, AccountLabel[key])));
    }
    renderError(error) {
        return error ? h("ion-card-content", null,
            h("ion-text", { color: "danger" }, error)) : null;
    }
    static get is() { return "budgific-ig-accounts-form"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["accounts-form.css"]
    }; }
    static get styleUrls() { return {
        "$": ["accounts-form.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "IAccountsFormValue",
                "resolved": "IAccountsFormValue",
                "references": {
                    "IAccountsFormValue": {
                        "location": "import",
                        "path": "./model/accounts-form-value"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Check mortgage account"
            }
        }
    }; }
    static get states() { return {
        "error": {}
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
