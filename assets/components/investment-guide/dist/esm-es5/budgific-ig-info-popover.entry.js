import { r as registerInstance, h } from './core-6682cc20.js';
var InfoPopover = /** @class */ (function () {
    function InfoPopover(hostRef) {
        registerInstance(this, hostRef);
    }
    InfoPopover.prototype.connectedCallback = function () {
        var modalElement = document.querySelector('ion-popover');
        this.message = modalElement.componentProps.message;
    };
    InfoPopover.prototype.render = function () {
        return h("div", { innerHTML: this.message });
    };
    Object.defineProperty(InfoPopover, "style", {
        get: function () { return "div{padding:0 10px;font-family:Roboto,Helvetica Neue,sans-serif}"; },
        enumerable: true,
        configurable: true
    });
    return InfoPopover;
}());
export { InfoPopover as budgific_ig_info_popover };
