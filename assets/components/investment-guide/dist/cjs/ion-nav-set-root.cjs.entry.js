'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-2f872d47.js');
const navLinkUtils = require('./nav-link-utils-fe0888a0.js');

const NavSetRoot = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        this.setRoot = () => {
            return navLinkUtils.navLink(this.el, 'root', this.component, this.componentProps);
        };
    }
    componentDidLoad() {
        console.warn('[DEPRECATED][ion-nav-set-root] `<ion-nav-set-root component="MyComponent">` is deprecated. Use `<ion-nav-link component="MyComponent" routerDirection="root">` instead.');
    }
    render() {
        return (core.h(core.Host, { onClick: this.setRoot }));
    }
    get el() { return core.getElement(this); }
};

exports.ion_nav_set_root = NavSetRoot;
