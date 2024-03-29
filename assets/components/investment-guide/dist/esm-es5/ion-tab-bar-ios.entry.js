import { r as registerInstance, c as createEvent, f as getIonMode, h, H as Host, e as getElement } from './core-6682cc20.js';
import { c as createColorClasses } from './theme-215399f6.js';
var TabBar = /** @class */ (function () {
    function TabBar(hostRef) {
        registerInstance(this, hostRef);
        this.keyboardVisible = false;
        /**
         * If `true`, the tab bar will be translucent.
         * Only applies when the mode is `"ios"` and the device supports
         * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
         */
        this.translucent = false;
        this.ionTabBarChanged = createEvent(this, "ionTabBarChanged", 7);
    }
    TabBar.prototype.selectedTabChanged = function () {
        if (this.selectedTab !== undefined) {
            this.ionTabBarChanged.emit({
                tab: this.selectedTab
            });
        }
    };
    TabBar.prototype.onKeyboardWillHide = function () {
        var _this = this;
        setTimeout(function () { return _this.keyboardVisible = false; }, 50);
    };
    TabBar.prototype.onKeyboardWillShow = function () {
        if (this.el.getAttribute('slot') !== 'top') {
            this.keyboardVisible = true;
        }
    };
    TabBar.prototype.componentWillLoad = function () {
        this.selectedTabChanged();
    };
    TabBar.prototype.render = function () {
        var _a;
        var _b = this, color = _b.color, translucent = _b.translucent, keyboardVisible = _b.keyboardVisible;
        var mode = getIonMode(this);
        return (h(Host, { role: "tablist", "aria-hidden": keyboardVisible ? 'true' : null, class: Object.assign({}, createColorClasses(color), (_a = {}, _a[mode] = true, _a['tab-bar-translucent'] = translucent, _a['tab-bar-hidden'] = keyboardVisible, _a)) }, h("slot", null)));
    };
    Object.defineProperty(TabBar.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar, "watchers", {
        get: function () {
            return {
                "selectedTab": ["selectedTabChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabBar, "style", {
        get: function () { return ":host{padding-left:var(--ion-safe-area-left);padding-right:var(--ion-safe-area-right);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:auto;padding-bottom:var(--ion-safe-area-bottom,0);border-top:var(--border);background:var(--background);color:var(--color);text-align:center;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:10;-webkit-box-sizing:content-box!important;box-sizing:content-box!important}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:var(--ion-safe-area-left);padding-inline-start:var(--ion-safe-area-left);-webkit-padding-end:var(--ion-safe-area-right);padding-inline-end:var(--ion-safe-area-right)}}:host(.ion-color) ::slotted(ion-tab-button){--background-focused:var(--ion-color-shade);--color-selected:var(--ion-color-contrast)}:host(.ion-color) ::slotted(.tab-selected){color:var(--ion-color-contrast)}:host(.ion-color),:host(.ion-color) ::slotted(ion-tab-button){color:rgba(var(--ion-color-contrast-rgb),.7);background:var(--ion-color-base)}:host(.ion-color) ::slotted(ion-tab-button.ion-focused),:host(.tab-bar-translucent) ::slotted(ion-tab-button.ion-focused){background:var(--background-focused)}:host(.tab-bar-translucent) ::slotted(ion-tab-button){background:transparent}:host([slot=top]){padding-bottom:0;border-top:0;border-bottom:var(--border)}:host(.tab-bar-hidden){display:none!important}:host{--background:var(--ion-tab-bar-background,var(--ion-background-color,#fff));--background-focused:var(--ion-tab-bar-background-focused,#e0e0e0);--border:0.55px solid var(--ion-tab-bar-border-color,var(--ion-border-color,var(--ion-color-step-150,rgba(0,0,0,0.2))));--color:var(--ion-tab-bar-color,var(--ion-color-step-450,#8c8c8c));--color-selected:var(--ion-tab-bar-color-activated,var(--ion-color-primary,#3880ff));height:50px}\@supports ((-webkit-backdrop-filter:blur(0)) or (backdrop-filter:blur(0))){:host(.tab-bar-translucent){--background:rgba(var(--ion-background-color-rgb,255,255,255),0.8);-webkit-backdrop-filter:saturate(210%) blur(20px);backdrop-filter:saturate(210%) blur(20px)}:host(.ion-color.tab-bar-translucent){background:rgba(var(--ion-color-base-rgb),.8)}:host(.tab-bar-translucent) ::slotted(ion-tab-button.ion-focused){background:rgba(var(--ion-background-color-rgb,255,255,255),.6)}}"; },
        enumerable: true,
        configurable: true
    });
    return TabBar;
}());
export { TabBar as ion_tab_bar };
