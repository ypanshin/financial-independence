import { r as registerInstance, f as getIonMode, h, H as Host } from './core-6682cc20.js';
import { o as openURL, c as createColorClasses } from './theme-215399f6.js';
var Anchor = /** @class */ (function () {
    function Anchor(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */
        this.routerDirection = 'forward';
        this.onClick = function (ev) {
            openURL(_this.href, ev, _this.routerDirection);
        };
    }
    Anchor.prototype.componentDidLoad = function () {
        console.warn('[DEPRECATED][ion-anchor] The <ion-anchor> component has been deprecated. Please use an <ion-router-link> if you are using a vanilla JS or Stencil project or an <a> with the Angular router.');
    };
    Anchor.prototype.render = function () {
        var _a;
        var mode = getIonMode(this);
        var attrs = {
            href: this.href,
            rel: this.rel
        };
        return (h(Host, { onClick: this.onClick, class: Object.assign({}, createColorClasses(this.color), (_a = {}, _a[mode] = true, _a['ion-activatable'] = true, _a)) }, h("a", Object.assign({}, attrs), h("slot", null))));
    };
    Object.defineProperty(Anchor, "style", {
        get: function () { return ":host{--background:transparent;--color:var(--ion-color-primary,#3880ff);background:var(--background);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}a{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}"; },
        enumerable: true,
        configurable: true
    });
    return Anchor;
}());
export { Anchor as ion_anchor };
