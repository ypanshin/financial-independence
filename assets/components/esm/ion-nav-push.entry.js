import { r as registerInstance, h, e as getElement, H as Host } from './core-6682cc20.js';
import { n as navLink } from './nav-link-utils-8805b760.js';

const NavPush = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.push = () => {
            return navLink(this.el, 'forward', this.component, this.componentProps);
        };
    }
    componentDidLoad() {
        console.warn('[DEPRECATED][ion-nav-push] `<ion-nav-push component="MyComponent">` is deprecated. Use `<ion-nav-link component="MyComponent">` instead.');
    }
    render() {
        return (h(Host, { onClick: this.push }));
    }
    get el() { return getElement(this); }
};

export { NavPush as ion_nav_push };
