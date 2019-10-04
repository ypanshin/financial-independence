import { r as registerInstance, h, H as Host, e as getElement } from './core-6682cc20.js';
var ResultDetailsButton = /** @class */ (function () {
    function ResultDetailsButton(hostRef) {
        registerInstance(this, hostRef);
    }
    ResultDetailsButton.prototype.componentWillLoad = function () {
        this.message = this.host.innerHTML;
    };
    ResultDetailsButton.prototype.handleClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var modal = document.createElement('ion-modal');
        modal.component = 'result-details';
        modal.componentProps = {
            message: this.message,
        };
        document.body.appendChild(modal);
        modal.present();
    };
    ResultDetailsButton.prototype.render = function () {
        var _this = this;
        return (h(Host, null, h("ion-button", { fill: "clear", size: "default", ref: function (btn) { return _this.btn = btn; }, onClick: this.handleClick.bind(this) }, h("ion-icon", { name: "information-circle-outline", slot: "icon-only" }))));
    };
    Object.defineProperty(ResultDetailsButton.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResultDetailsButton, "style", {
        get: function () { return ".padding-horizontal{padding:0 10px}"; },
        enumerable: true,
        configurable: true
    });
    return ResultDetailsButton;
}());
export { ResultDetailsButton as result_details_button };
