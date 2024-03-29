import { r as registerInstance, h, f as getIonMode, H as Host } from './core-6682cc20.js';
var Thumbnail = /** @class */ (function () {
    function Thumbnail(hostRef) {
        registerInstance(this, hostRef);
    }
    Thumbnail.prototype.render = function () {
        return (h(Host, { class: getIonMode(this) }, h("slot", null)));
    };
    Object.defineProperty(Thumbnail, "style", {
        get: function () { return ":host{--size:48px;--border-radius:0;border-radius:var(--border-radius);display:block;width:var(--size);height:var(--size)}::slotted(img),::slotted(ion-img){border-radius:var(--border-radius);width:100%;height:100%;-o-object-fit:cover;object-fit:cover;overflow:hidden}"; },
        enumerable: true,
        configurable: true
    });
    return Thumbnail;
}());
export { Thumbnail as ion_thumbnail };
