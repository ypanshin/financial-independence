'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-0c2b188e.js');
const theme = require('./theme-eb1a6de3.js');

const CardSubtitle = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        const mode = core.getIonMode(this);
        return (core.h(core.Host, { role: "heading", "aria-level": "3", class: Object.assign({}, theme.createColorClasses(this.color), { [mode]: true }) }, core.h("slot", null)));
    }
    static get style() { return ":host{display:block;position:relative;color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-color-step-600,#666);margin-left:0;margin-right:0;margin-top:0;margin-bottom:4px;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-size:12px;font-weight:700;letter-spacing:.4px;text-transform:uppercase}"; }
};

exports.ion_card_subtitle = CardSubtitle;
