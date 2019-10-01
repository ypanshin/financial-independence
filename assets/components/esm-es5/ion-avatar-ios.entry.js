import { r as registerInstance, h, e as getIonMode, H as Host } from './core-d377b9a5.js';
var Avatar = /** @class */ (function () {
    function Avatar(hostRef) {
        registerInstance(this, hostRef);
    }
    Avatar.prototype.render = function () {
        return (h(Host, { class: getIonMode(this) }, h("slot", null)));
    };
    Object.defineProperty(Avatar, "style", {
        get: function () { return ":host{border-radius:var(--border-radius);display:block}::slotted(img),::slotted(ion-img){border-radius:var(--border-radius);width:100%;height:100%;-o-object-fit:cover;object-fit:cover;overflow:hidden}:host{--border-radius:50%;width:48px;height:48px}"; },
        enumerable: true,
        configurable: true
    });
    return Avatar;
}());
export { Avatar as ion_avatar };
