import { r as registerInstance, h, e as getElement, H as Host } from './core-6682cc20.js';
import { n as navLink } from './nav-link-utils-8805b760.js';
var NavPush = /** @class */ (function () {
    function NavPush(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.push = function () {
            return navLink(_this.el, 'forward', _this.component, _this.componentProps);
        };
    }
    NavPush.prototype.componentDidLoad = function () {
        console.warn('[DEPRECATED][ion-nav-push] `<ion-nav-push component="MyComponent">` is deprecated. Use `<ion-nav-link component="MyComponent">` instead.');
    };
    NavPush.prototype.render = function () {
        return (h(Host, { onClick: this.push }));
    };
    Object.defineProperty(NavPush.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return NavPush;
}());
export { NavPush as ion_nav_push };
