import { r as registerInstance, h } from './core-d377b9a5.js';

const InfoPopover = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    connectedCallback() {
        const modalElement = document.querySelector('ion-popover');
        this.message = modalElement.componentProps.message;
    }
    render() {
        return h("div", { innerHTML: this.message });
    }
    static get style() { return "div{padding:0 10px;font-family:Roboto,Helvetica Neue,sans-serif}"; }
};

export { InfoPopover as budgific_ig_info_popover };
