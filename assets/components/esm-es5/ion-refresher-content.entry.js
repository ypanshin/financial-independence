import { r as registerInstance, k as config, e as getIonMode, h, H as Host } from './core-d377b9a5.js';
import { s as sanitizeDOMString } from './index-d6bd1e69.js';
var RefresherContent = /** @class */ (function () {
    function RefresherContent(hostRef) {
        registerInstance(this, hostRef);
    }
    RefresherContent.prototype.componentWillLoad = function () {
        if (this.pullingIcon === undefined) {
            this.pullingIcon = config.get('refreshingIcon', 'arrow-down');
        }
        if (this.refreshingSpinner === undefined) {
            var mode = getIonMode(this);
            this.refreshingSpinner = config.get('refreshingSpinner', config.get('spinner', mode === 'ios' ? 'lines' : 'crescent'));
        }
    };
    RefresherContent.prototype.render = function () {
        return (h(Host, { class: getIonMode(this) }, h("div", { class: "refresher-pulling" }, this.pullingIcon &&
            h("div", { class: "refresher-pulling-icon" }, h("ion-icon", { icon: this.pullingIcon, lazy: false })), this.pullingText &&
            h("div", { class: "refresher-pulling-text", innerHTML: sanitizeDOMString(this.pullingText) })), h("div", { class: "refresher-refreshing" }, this.refreshingSpinner &&
            h("div", { class: "refresher-refreshing-icon" }, h("ion-spinner", { name: this.refreshingSpinner })), this.refreshingText &&
            h("div", { class: "refresher-refreshing-text", innerHTML: sanitizeDOMString(this.refreshingText) }))));
    };
    return RefresherContent;
}());
export { RefresherContent as ion_refresher_content };
