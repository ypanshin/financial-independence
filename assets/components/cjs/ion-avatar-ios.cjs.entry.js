'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-0c2b188e.js');

const Avatar = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return (core.h(core.Host, { class: core.getIonMode(this) }, core.h("slot", null)));
    }
    static get style() { return ":host{border-radius:var(--border-radius);display:block}::slotted(img),::slotted(ion-img){border-radius:var(--border-radius);width:100%;height:100%;-o-object-fit:cover;object-fit:cover;overflow:hidden}:host{--border-radius:50%;width:48px;height:48px}"; }
};

exports.ion_avatar = Avatar;
