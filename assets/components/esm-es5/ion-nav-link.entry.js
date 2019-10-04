import { r as registerInstance, h, e as getElement, H as Host } from './core-6682cc20.js';
import { n as navLink } from './nav-link-utils-8805b760.js';
var NavLink = /** @class */ (function () {
    function NavLink(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        /**
         * The transition direction when navigating to another page.
         */
        this.routerDirection = 'forward';
        this.onClick = function () {
            return navLink(_this.el, _this.routerDirection, _this.component, _this.componentProps);
        };
    }
    NavLink.prototype.render = function () {
        return (h(Host, { onClick: this.onClick }));
    };
    Object.defineProperty(NavLink.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return NavLink;
}());
export { NavLink as ion_nav_link };
