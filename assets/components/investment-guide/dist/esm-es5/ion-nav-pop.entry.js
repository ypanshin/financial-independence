import { r as registerInstance, h, e as getElement, H as Host } from './core-6682cc20.js';
import { n as navLink } from './nav-link-utils-8805b760.js';
var NavPop = /** @class */ (function () {
    function NavPop(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.pop = function () {
            return navLink(_this.el, 'back');
        };
    }
    NavPop.prototype.componentDidLoad = function () {
        console.warn('[DEPRECATED][ion-nav-pop] <ion-nav-pop> is deprecated. Use `<ion-nav-link routerDirection="back">` instead.');
    };
    NavPop.prototype.render = function () {
        return (h(Host, { onClick: this.pop }));
    };
    Object.defineProperty(NavPop.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return NavPop;
}());
export { NavPop as ion_nav_pop };
