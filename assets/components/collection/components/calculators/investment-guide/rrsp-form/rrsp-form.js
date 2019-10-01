import { Host, h } from "@stencil/core";
export class RRSPForm {
    handleChange(e) {
        this.reinvestTaxReturnChange.emit(e.detail.checked);
    }
    render() {
        return (h(Host, null,
            h("ion-card", null,
                h("ion-card-header", null,
                    h("ion-card-title", null, "RRSP Details")),
                h("ion-item", null,
                    h("ion-checkbox", { slot: "start", checked: this.reinvestTaxReturn, onIonChange: this.handleChange.bind(this) }),
                    h("ion-label", null, "Reinvest Tax Return"),
                    h("budgific-ig-info-button", { slot: "end" },
                        h("p", null, "Reinvest the tax return."))))));
    }
    static get is() { return "budgific-ig-rrsp-form"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rrsp-form.css"]
    }; }
    static get styleUrls() { return {
        "$": ["rrsp-form.css"]
    }; }
    static get properties() { return {
        "reinvestTaxReturn": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The reinvest tax return"
            },
            "attribute": "reinvest-tax-return",
            "reflect": false
        }
    }; }
    static get events() { return [{
            "method": "reinvestTaxReturnChange",
            "name": "reinvestTaxReturnChange",
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
