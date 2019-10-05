import { h } from "@stencil/core";
export class InfoPopover {
    connectedCallback() {
        const modalElement = document.querySelector('ion-popover');
        this.message = modalElement.componentProps.message;
    }
    render() {
        return h("div", { innerHTML: this.message });
    }
    static get is() { return "budgific-ig-info-popover"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["info-popover.css"]
    }; }
    static get styleUrls() { return {
        "$": ["info-popover.css"]
    }; }
    static get states() { return {
        "message": {}
    }; }
}
