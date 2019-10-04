import { r as registerInstance, h, f as getIonMode, H as Host, e as getElement } from './core-6682cc20.js';

const SelectOption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.inputId = `ion-selopt-${selectOptionIds++}`;
        /**
         * If `true`, the user cannot interact with the select option.
         */
        this.disabled = false;
        /**
         * If `true`, the element is selected.
         */
        this.selected = false;
    }
    render() {
        return (h(Host, { role: "option", id: this.inputId, class: getIonMode(this) }));
    }
    get el() { return getElement(this); }
    static get style() { return ":host{display:none}"; }
};
let selectOptionIds = 0;

export { SelectOption as ion_select_option };
