import { r as registerInstance, h, H as Host, e as getElement } from './core-6682cc20.js';
import { a as attachComponent } from './framework-delegate-edc3d751.js';

const Tab = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
                return attachComponent(this.delegate, this.el, this.component, ['ion-page']);
            }
            catch (e) {
                console.error(e);
            }
        }
        return undefined;
    }
    render() {
        const { tab, active, component } = this;
        return (h(Host, { role: "tabpanel", "aria-hidden": !active ? 'true' : null, "aria-labelledby": `tab-button-${tab}`, class: {
                'ion-page': component === undefined,
                'tab-hidden': !active
            } }, h("slot", null)));
    }
    get el() { return getElement(this); }
    static get style() { return ":host(.tab-hidden){display:none!important}"; }
};

export { Tab as ion_tab };
