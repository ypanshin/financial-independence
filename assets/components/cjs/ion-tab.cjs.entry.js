'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-0c2b188e.js');
const frameworkDelegate = require('./framework-delegate-3ab849d3.js');

const Tab = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        this.loaded = false;
        /** @internal */
        this.active = false;
    }
    componentWillLoad() {
    }
    /** Set the active component for the tab */
    async setActive() {
        await this.prepareLazyLoaded();
        this.active = true;
    }
    async prepareLazyLoaded() {
        if (!this.loaded && this.component != null) {
            this.loaded = true;
            try {
                return frameworkDelegate.attachComponent(this.delegate, this.el, this.component, ['ion-page']);
            }
            catch (e) {
                console.error(e);
            }
        }
        return undefined;
    }
    render() {
        const { tab, active, component } = this;
        return (core.h(core.Host, { role: "tabpanel", "aria-hidden": !active ? 'true' : null, "aria-labelledby": `tab-button-${tab}`, class: {
                'ion-page': component === undefined,
                'tab-hidden': !active
            } }, core.h("slot", null)));
    }
    get el() { return core.getElement(this); }
    static get style() { return ":host(.tab-hidden){display:none!important}"; }
};

exports.ion_tab = Tab;
