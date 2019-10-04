import { r as registerInstance, h, H as Host } from './core-6682cc20.js';

const ResultDetails = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    connectedCallback() {
        const modalElement = document.querySelector('ion-modal');
        this.message = modalElement.componentProps.message;
    }
    render() {
        return (h(Host, null, h("ion-header", null, h("ion-toolbar", null, h("ion-title", null, "Mortgage Results Details"), h("ion-buttons", { slot: "primary" }, h("ion-button", null, h("ion-icon", { slot: "icon-only", name: "close" }))))), h("ion-content", { class: "ion-padding" }, h("div", { class: "formula" }, h("span", null, "Real Rate:"), h("span", { class: "value" }, h("span", null, "0.035"), h("span", { class: "name" }, "Mortgage Rate")), h("span", { class: "sign" }, "+"), h("span", { class: "value" }, h("span", null, "0.02"), h("span", { class: "name" }, "Inflation Rate")), h("span", { class: "sign" }, "="), h("span", null, "0.035")), h("div", { class: "formula" }, h("span", null, "Semi Annual Rate:"), h("span", null, "(1+", h("span", { class: "value" }, h("span", null, "0.035"), h("span", { class: "name" }, "Real Rate")), ")"), h("span", { class: "sign" }, "="), h("span", null, "0.035")), h("div", { class: "formula" }, h("span", null, "Interests Payed Before:"), "SUM(Payed Interest)", h("span", { class: "sign" }, "="), h("span", null, "$43,243.20")), h("div", { class: "formula" }, h("span", null, "Interests Payed After:"), "SUM(Payed Interest)", h("span", { class: "sign" }, "="), h("span", null, "$43,243.20")))));
    }
    static get style() { return ".formula{-ms-flex-pack:space-evenly;justify-content:space-evenly;margin:20px 0;-ms-flex-align:center;align-items:center}.formula,.value{display:-ms-flexbox;display:flex}.value{-ms-flex-direction:column;flex-direction:column;text-align:center}.sign{font-size:160%}.name{font-size:50%}.one-line{line-height:26px}"; }
};

export { ResultDetails as result_details };
