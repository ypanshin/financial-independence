import { r as registerInstance, c as createEvent, l as config, f as getIonMode, h, H as Host, e as getElement } from './core-6682cc20.js';

const TabButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * If `true`, the user cannot interact with the tab button.
         */
        this.disabled = false;
        /**
         * The selected tab component
         */
        this.selected = false;
        this.onKeyUp = (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                this.selectTab(ev);
            }
        };
        this.onClick = (ev) => {
            this.selectTab(ev);
        };
        this.ionTabButtonClick = createEvent(this, "ionTabButtonClick", 7);
    }
    onTabBarChanged(ev) {
        this.selected = this.tab === ev.detail.tab;
    }
    componentWillLoad() {
        if (this.layout === undefined) {
            this.layout = config.get('tabButtonLayout', 'icon-top');
        }
    }
    selectTab(ev) {
        if (this.tab !== undefined) {
            if (!this.disabled) {
                this.ionTabButtonClick.emit({
                    tab: this.tab,
                    href: this.href,
                    selected: this.selected
                });
            }
            ev.preventDefault();
        }
    }
    get hasLabel() {
        return !!this.el.querySelector('ion-label');
    }
    get hasIcon() {
        return !!this.el.querySelector('ion-icon');
    }
    get tabIndex() {
        if (this.disabled) {
            return -1;
        }
        const hasTabIndex = this.el.hasAttribute('tabindex');
        if (hasTabIndex) {
            return this.el.getAttribute('tabindex');
        }
        return 0;
    }
    render() {
        const { disabled, hasIcon, hasLabel, tabIndex, href, rel, target, layout, selected, tab } = this;
        const mode = getIonMode(this);
        const attrs = {
            download: this.download,
            href,
            rel,
            target
        };
        return (h(Host, { onClick: this.onClick, onKeyup: this.onKeyUp, role: "tab", tabindex: tabIndex, "aria-selected": selected ? 'true' : null, id: tab !== undefined ? `tab-button-${tab}` : null, class: {
                [mode]: true,
                'tab-selected': selected,
                'tab-disabled': disabled,
                'tab-has-label': hasLabel,
                'tab-has-icon': hasIcon,
                'tab-has-label-only': hasLabel && !hasIcon,
                'tab-has-icon-only': hasIcon && !hasLabel,
                [`tab-layout-${layout}`]: true,
                'ion-activatable': true,
                'ion-selectable': true,
                'ion-focusable': true
            } }, h("a", Object.assign({}, attrs, { tabIndex: -1 }), h("slot", null), mode === 'md' && h("ion-ripple-effect", { type: "unbounded" }))));
    }
    get el() { return getElement(this); }
    static get style() { return ":host{--ripple-color:var(--color-selected);-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background:var(--background);color:var(--color)}:host,a{height:100%;outline:none}a{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:var(--padding-start);padding-right:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:inherit;flex-direction:inherit;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:100%;border:0;background:transparent;text-decoration:none;cursor:pointer;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-drag:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){a{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end)}}:host(.ion-focused){background:var(--background-focused)}\@media (any-hover:hover){a:hover{color:var(--color-selected)}}:host(.tab-selected){color:var(--color-selected)}:host(.tab-hidden){display:none!important}:host(.tab-disabled){pointer-events:none;opacity:.4}::slotted(ion-icon),::slotted(ion-label){display:block;-ms-flex-item-align:center;align-self:center;max-width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}::slotted(ion-label){-ms-flex-order:0;order:0}::slotted(ion-icon){-ms-flex-order:-1;order:-1;height:1em}:host(.tab-has-label-only) ::slotted(ion-label){white-space:normal}::slotted(ion-badge){-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;z-index:1}:host(.tab-layout-icon-start){-ms-flex-direction:row;flex-direction:row}:host(.tab-layout-icon-end){-ms-flex-direction:row-reverse;flex-direction:row-reverse}:host(.tab-layout-icon-bottom){-ms-flex-direction:column-reverse;flex-direction:column-reverse}:host(.tab-layout-icon-hide) ::slotted(ion-icon),:host(.tab-layout-label-hide) ::slotted(ion-label){display:none}ion-ripple-effect{color:var(--ripple-color)}:host{--padding-top:0;--padding-end:12px;--padding-bottom:0;--padding-start:12px;max-width:168px;font-size:12px;font-weight:400;letter-spacing:.03em}::slotted(ion-label){margin-left:0;margin-right:0;margin-top:2px;margin-bottom:2px;text-transform:none}::slotted(ion-icon){margin-left:0;margin-right:0;margin-top:16px;margin-bottom:16px;-webkit-transform-origin:center center;transform-origin:center center;font-size:22px}:host-context([dir=rtl]) ::slotted(ion-icon),[dir=rtl] ::slotted(ion-icon){-webkit-transform-origin:calc(100% - center) center;transform-origin:calc(100% - center) center}::slotted(ion-badge){border-radius:8px;padding-left:2px;padding-right:2px;padding-top:3px;padding-bottom:2px;left:calc(50% + 6px);top:8px;min-width:12px;font-size:8px;font-weight:400}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted(ion-badge){padding-left:unset;padding-right:unset;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-padding-end:2px;padding-inline-end:2px}}:host-context([dir=rtl]) ::slotted(ion-badge),[dir=rtl] ::slotted(ion-badge){left:unset;right:unset;right:calc(50% + 6px)}::slotted(ion-badge:empty){display:block;min-width:8px;height:8px}:host(.tab-layout-icon-top) ::slotted(ion-icon){margin-top:6px;margin-bottom:2px}:host(.tab-layout-icon-top) ::slotted(ion-label){margin-top:0;margin-bottom:6px}:host(.tab-layout-icon-bottom) ::slotted(ion-badge){left:70%;top:8px}:host-context([dir=rtl]).tab-layout-icon-bottom ::slotted(ion-badge),:host-context([dir=rtl]):host(.tab-layout-icon-bottom) ::slotted(ion-badge){left:unset;right:unset;right:70%}:host(.tab-layout-icon-bottom) ::slotted(ion-icon){margin-top:0;margin-bottom:6px}:host(.tab-layout-icon-bottom) ::slotted(ion-label){margin-top:6px;margin-bottom:0}:host(.tab-layout-icon-end) ::slotted(ion-badge),:host(.tab-layout-icon-start) ::slotted(ion-badge){left:80%;top:16px}:host-context([dir=rtl]).tab-layout-icon-end ::slotted(ion-badge),:host-context([dir=rtl]).tab-layout-icon-start ::slotted(ion-badge),:host-context([dir=rtl]):host(.tab-layout-icon-end) ::slotted(ion-badge),:host-context([dir=rtl]):host(.tab-layout-icon-start) ::slotted(ion-badge){left:unset;right:unset;right:80%}:host(.tab-layout-icon-start) ::slotted(ion-icon){margin-right:6px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.tab-layout-icon-start) ::slotted(ion-icon){margin-right:unset;-webkit-margin-end:6px;margin-inline-end:6px}}:host(.tab-layout-icon-end) ::slotted(ion-icon){margin-left:6px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.tab-layout-icon-end) ::slotted(ion-icon){margin-left:unset;-webkit-margin-start:6px;margin-inline-start:6px}}:host(.tab-has-label-only) ::slotted(ion-badge),:host(.tab-layout-icon-hide) ::slotted(ion-badge){left:70%;top:16px}:host-context([dir=rtl]).tab-has-label-only ::slotted(ion-badge),:host-context([dir=rtl]).tab-layout-icon-hide ::slotted(ion-badge),:host-context([dir=rtl]):host(.tab-has-label-only) ::slotted(ion-badge),:host-context([dir=rtl]):host(.tab-layout-icon-hide) ::slotted(ion-badge){left:unset;right:unset;right:70%}:host(.tab-has-label-only) ::slotted(ion-label),:host(.tab-layout-icon-hide) ::slotted(ion-label){margin-top:0;margin-bottom:0}:host(.tab-has-icon-only) ::slotted(ion-badge),:host(.tab-layout-label-hide) ::slotted(ion-badge){top:16px}:host(.tab-has-icon-only) ::slotted(ion-icon),:host(.tab-layout-label-hide) ::slotted(ion-icon){margin-top:0;margin-bottom:0;font-size:24px}"; }
};

export { TabButton as ion_tab_button };
