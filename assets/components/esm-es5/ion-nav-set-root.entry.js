import { r as registerInstance, h, e as getElement, H as Host } from './core-6682cc20.js';
import { n as navLink } from './nav-link-utils-8805b760.js';
var NavSetRoot = /** @class */ (function () {
    function NavSetRoot(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.setRoot = function () {
            return navLink(_this.el, 'root', _this.component, _this.componentProps);
        };
    }
    NavSetRoot.prototype.componentDidLoad = function () {
        console.warn('[DEPRECATED][ion-nav-set-root] `<ion-nav-set-root component="MyComponent">` is deprecated. Use `<ion-nav-link component="MyComponent" routerDirection="root">` instead.');
    };
    NavSetRoot.prototype.render = function () {
        return (h(Host, { onClick: this.setRoot }));
    };
    Object.defineProperty(NavSetRoot.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return NavSetRoot;
}());
export { NavSetRoot as ion_nav_set_root };
