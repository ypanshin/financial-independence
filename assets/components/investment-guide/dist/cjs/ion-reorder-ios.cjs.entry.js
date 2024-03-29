'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-2f872d47.js');

const Reorder = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    onClick(ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
    }
    render() {
        return (core.h(core.Host, { class: core.getIonMode(this) }, core.h("slot", null, core.h("ion-icon", { name: "reorder", lazy: false, class: "reorder-icon" }))));
    }
    static get style() { return ":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px;font-size:34px;opacity:.4}"; }
};

exports.ion_reorder = Reorder;
