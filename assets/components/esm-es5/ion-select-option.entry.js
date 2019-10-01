import { r as registerInstance, h, e as getIonMode, H as Host, d as getElement } from './core-d377b9a5.js';
var SelectOption = /** @class */ (function () {
    function SelectOption(hostRef) {
        registerInstance(this, hostRef);
        this.inputId = "ion-selopt-" + selectOptionIds++;
        /**
         * If `true`, the user cannot interact with the select option.
         */
        this.disabled = false;
        /**
         * If `true`, the element is selected.
         */
        this.selected = false;
    }
    SelectOption.prototype.render = function () {
        return (h(Host, { role: "option", id: this.inputId, class: getIonMode(this) }));
    };
    Object.defineProperty(SelectOption.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectOption, "style", {
        get: function () { return ":host{display:none}"; },
        enumerable: true,
        configurable: true
    });
    return SelectOption;
}());
var selectOptionIds = 0;
export { SelectOption as ion_select_option };
