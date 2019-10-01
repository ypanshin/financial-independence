import { r as registerInstance, h, e as getIonMode, H as Host } from './core-d377b9a5.js';
var Reorder = /** @class */ (function () {
    function Reorder(hostRef) {
        registerInstance(this, hostRef);
    }
    Reorder.prototype.onClick = function (ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
    };
    Reorder.prototype.render = function () {
        return (h(Host, { class: getIonMode(this) }, h("slot", null, h("ion-icon", { name: "reorder", lazy: false, class: "reorder-icon" }))));
    };
    Object.defineProperty(Reorder, "style", {
        get: function () { return ":host([slot]){display:none;line-height:0;z-index:100}.reorder-icon{display:block;font-size:22px;font-size:31px;opacity:.3}"; },
        enumerable: true,
        configurable: true
    });
    return Reorder;
}());
export { Reorder as ion_reorder };
