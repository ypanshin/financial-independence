import { r as registerInstance, f as getIonMode, h, H as Host } from './core-6682cc20.js';
import { c as createColorClasses } from './theme-215399f6.js';
var CardSubtitle = /** @class */ (function () {
    function CardSubtitle(hostRef) {
        registerInstance(this, hostRef);
    }
    CardSubtitle.prototype.render = function () {
        var _a;
        var mode = getIonMode(this);
        return (h(Host, { role: "heading", "aria-level": "3", class: Object.assign({}, createColorClasses(this.color), (_a = {}, _a[mode] = true, _a)) }, h("slot", null)));
    };
    Object.defineProperty(CardSubtitle, "style", {
        get: function () { return ":host{display:block;position:relative;color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}:host{--color:var(--ion-color-step-600,#666);margin-left:0;margin-right:0;margin-top:0;margin-bottom:4px;padding-left:0;padding-right:0;padding-top:0;padding-bottom:0;font-size:12px;font-weight:700;letter-spacing:.4px;text-transform:uppercase}"; },
        enumerable: true,
        configurable: true
    });
    return CardSubtitle;
}());
export { CardSubtitle as ion_card_subtitle };
