'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-2f872d47.js');

const ResultDetails = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    connectedCallback() {
        const modalElement = document.querySelector('ion-modal');
        this.message = modalElement.componentProps.message;
    }
    render() {
        return (core.h(core.Host, null, core.h("ion-header", null, core.h("ion-toolbar", null, core.h("ion-title", null, "Mortgage Results Details"), core.h("ion-buttons", { slot: "primary" }, core.h("ion-button", null, core.h("ion-icon", { slot: "icon-only", name: "close" }))))), core.h("ion-content", { class: "ion-padding" }, core.h("div", { class: "formula" }, core.h("span", null, "Real Rate:"), core.h("span", { class: "value" }, core.h("span", null, "0.035"), core.h("span", { class: "name" }, "Mortgage Rate")), core.h("span", { class: "sign" }, "+"), core.h("span", { class: "value" }, core.h("span", null, "0.02"), core.h("span", { class: "name" }, "Inflation Rate")), core.h("span", { class: "sign" }, "="), core.h("span", null, "0.035")), core.h("div", { class: "formula" }, core.h("span", null, "Semi Annual Rate:"), core.h("span", null, "(1+", core.h("span", { class: "value" }, core.h("span", null, "0.035"), core.h("span", { class: "name" }, "Real Rate")), ")"), core.h("span", { class: "sign" }, "="), core.h("span", null, "0.035")), core.h("div", { class: "formula" }, core.h("span", null, "Interests Payed Before:"), "SUM(Payed Interest)", core.h("span", { class: "sign" }, "="), core.h("span", null, "$43,243.20")), core.h("div", { class: "formula" }, core.h("span", null, "Interests Payed After:"), "SUM(Payed Interest)", core.h("span", { class: "sign" }, "="), core.h("span", null, "$43,243.20")))));
    }
    static get style() { return ".formula{-ms-flex-pack:space-evenly;justify-content:space-evenly;margin:20px 0;-ms-flex-align:center;align-items:center}.formula,.value{display:-ms-flexbox;display:flex}.value{-ms-flex-direction:column;flex-direction:column;text-align:center}.sign{font-size:160%}.name{font-size:50%}.one-line{line-height:26px}"; }
};

exports.result_details = ResultDetails;
