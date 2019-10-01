'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-0c2b188e.js');
require('./animation-a07c3c86.js');
const index = require('./index-bf27bf2f.js');
const menuToggleUtil = require('./menu-toggle-util-f9cedb72.js');

const MenuToggle = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        this.visible = false;
        /**
         * Automatically hides the content when the corresponding menu is not active.
         *
         * By default, it's `true`. Change it to `false` in order to
         * keep `ion-menu-toggle` always visible regardless the state of the menu.
         */
        this.autoHide = true;
        this.onClick = () => {
            return index.menuController.toggle(this.menu);
        };
    }
    connectedCallback() {
        this.visibilityChanged();
    }
    async visibilityChanged() {
        this.visible = await menuToggleUtil.updateVisibility(this.menu);
    }
    render() {
        const mode = core.getIonMode(this);
        const hidden = this.autoHide && !this.visible;
        return (core.h(core.Host, { onClick: this.onClick, "aria-hidden": hidden ? 'true' : null, class: {
                [mode]: true,
                'menu-toggle-hidden': hidden,
            } }, core.h("slot", null)));
    }
    static get style() { return ":host(.menu-toggle-hidden){display:none}"; }
};

exports.ion_menu_toggle = MenuToggle;
