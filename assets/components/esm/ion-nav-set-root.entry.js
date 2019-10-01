import { r as registerInstance, h, d as getElement, H as Host } from './core-d377b9a5.js';
import { n as navLink } from './nav-link-utils-8805b760.js';

const NavSetRoot = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.setRoot = () => {
            return navLink(this.el, 'root', this.component, this.componentProps);
        };
    }
    componentDidLoad() {
        console.warn('[DEPRECATED][ion-nav-set-root] `<ion-nav-set-root component="MyComponent">` is deprecated. Use `<ion-nav-link component="MyComponent" routerDirection="root">` instead.');
    }
    render() {
        return (h(Host, { onClick: this.setRoot }));
    }
    get el() { return getElement(this); }
};

export { NavSetRoot as ion_nav_set_root };
