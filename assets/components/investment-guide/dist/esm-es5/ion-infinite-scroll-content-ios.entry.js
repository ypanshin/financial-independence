import { r as registerInstance, f as getIonMode, l as config, h, H as Host } from './core-6682cc20.js';
import { s as sanitizeDOMString } from './index-d6bd1e69.js';
var InfiniteScrollContent = /** @class */ (function () {
    function InfiniteScrollContent(hostRef) {
        registerInstance(this, hostRef);
    }
    InfiniteScrollContent.prototype.componentDidLoad = function () {
        if (this.loadingSpinner === undefined) {
            var mode = getIonMode(this);
            this.loadingSpinner = config.get('infiniteLoadingSpinner', config.get('spinner', mode === 'ios' ? 'lines' : 'crescent'));
        }
    };
    InfiniteScrollContent.prototype.render = function () {
        var _a;
        var mode = getIonMode(this);
        return (h(Host, { class: (_a = {},
                _a[mode] = true,
                // Used internally for styling
                _a["infinite-scroll-content-" + mode] = true,
                _a) }, h("div", { class: "infinite-loading" }, this.loadingSpinner && (h("div", { class: "infinite-loading-spinner" }, h("ion-spinner", { name: this.loadingSpinner }))), this.loadingText && (h("div", { class: "infinite-loading-text", innerHTML: sanitizeDOMString(this.loadingText) })))));
    };
    Object.defineProperty(InfiniteScrollContent, "style", {
        get: function () { return "ion-infinite-scroll-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;min-height:84px;text-align:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.infinite-loading{margin-left:0;margin-right:0;margin-top:0;margin-bottom:32px;display:none;width:100%}.infinite-loading-text{margin-left:32px;margin-right:32px;margin-top:4px;margin-bottom:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.infinite-loading-text{margin-left:unset;margin-right:unset;-webkit-margin-start:32px;margin-inline-start:32px;-webkit-margin-end:32px;margin-inline-end:32px}}.infinite-scroll-loading ion-infinite-scroll-content>.infinite-loading{display:block}.infinite-scroll-content-ios .infinite-loading-text{color:var(--ion-color-step-600,#666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-crescent circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-ios line,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-lines-small-ios line{stroke:var(--ion-color-step-600,#666)}.infinite-scroll-content-ios .infinite-loading-spinner .spinner-bubbles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-circles circle,.infinite-scroll-content-ios .infinite-loading-spinner .spinner-dots circle{fill:var(--ion-color-step-600,#666)}"; },
        enumerable: true,
        configurable: true
    });
    return InfiniteScrollContent;
}());
export { InfiniteScrollContent as ion_infinite_scroll_content };
