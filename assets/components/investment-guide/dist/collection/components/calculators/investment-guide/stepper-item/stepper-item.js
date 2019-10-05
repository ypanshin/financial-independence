import { h, Host } from "@stencil/core";
import Big from 'big.js';
import validate from 'validate.js';
export class StepperItem {
    constructor() {
        this.value = 0;
        this.stateValue = '';
        this.invalid = false;
    }
    watch() {
        this.stateValue = this.value.toString();
    }
    componentWillLoad() {
        this.stateValue = this.value.toString();
    }
    handleDecrease() {
        let nextValue = +Big(this.stateValue).minus(this.step);
        if (this.min) {
            nextValue = nextValue >= this.min ? nextValue : this.min;
        }
        this.invalid = false;
        this.stateValue = nextValue.toString();
        this.valueChange.emit(nextValue);
    }
    handleIncrease() {
        let nextValue = +Big(this.stateValue).plus(this.step);
        if (this.max) {
            nextValue = nextValue <= this.max ? nextValue : this.max;
        }
        this.invalid = false;
        this.stateValue = nextValue.toString();
        this.valueChange.emit(nextValue);
    }
    handleChange(e) {
        const value = e.detail.value;
        const invalid = validate.single(value, this.constraint);
        if (!invalid) {
            if (+value !== this.value) {
                this.valueChange.emit(+value);
                this.stateValue = value.toString();
            }
        }
        else {
            this.error = invalid[0];
        }
    }
    render() {
        const itemClass = this.error ? 'ion-invalid' : '';
        return (h(Host, null,
            h("ion-item", { class: itemClass },
                h("ion-label", { position: "floating" }, this.label),
                h("ion-input", { value: this.stateValue.toString(), onIonChange: (e) => this.handleChange(e), required: true }),
                h("ion-button", { slot: "end", fill: "clear", size: "default", onClick: this.handleDecrease.bind(this) },
                    h("ion-icon", { name: "arrow-dropleft-circle", slot: "icon-only" })),
                h("ion-button", { class: "no-margin", slot: "end", fill: "clear", size: "default", onClick: this.handleIncrease.bind(this) },
                    h("ion-icon", { name: "arrow-dropright-circle", slot: "icon-only" }))),
            this.renderError(this.error)));
    }
    renderError(error) {
        return error ? h("ion-item", { class: "error-item" },
            h("ion-text", null, error)) : null;
    }
    static get is() { return "budgific-ig-stepper-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["stepper-item.css"]
    }; }
    static get styleUrls() { return {
        "$": ["stepper-item.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "0"
        },
        "step": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "step",
            "reflect": false
        },
        "label": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "label",
            "reflect": false
        },
        "max": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "max",
            "reflect": false
        },
        "min": {
            "type": "number",
            "mutable": true,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "min",
            "reflect": false
        },
        "constraint": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "constraint",
            "reflect": false
        }
    }; }
    static get states() { return {
        "stateValue": {},
        "invalid": {},
        "error": {}
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
        }]; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "watch"
        }]; }
}
