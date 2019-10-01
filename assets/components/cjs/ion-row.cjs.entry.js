'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-0c2b188e.js');

const Row = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return (core.h(core.Host, { class: core.getIonMode(this) }, core.h("slot", null)));
    }
    static get style() { return ":host{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}"; }
};

exports.ion_row = Row;
