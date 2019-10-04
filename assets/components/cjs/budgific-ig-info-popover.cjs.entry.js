'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-2f872d47.js');

const InfoPopover = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    connectedCallback() {
        const modalElement = document.querySelector('ion-popover');
        this.message = modalElement.componentProps.message;
    }
    render() {
        return core.h("div", { innerHTML: this.message });
    }
    static get style() { return "div{padding:0 10px;font-family:Roboto,Helvetica Neue,sans-serif}"; }
};

exports.budgific_ig_info_popover = InfoPopover;
