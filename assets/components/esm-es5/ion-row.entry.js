import { r as registerInstance, h, e as getIonMode, H as Host } from './core-d377b9a5.js';
var Row = /** @class */ (function () {
    function Row(hostRef) {
        registerInstance(this, hostRef);
    }
    Row.prototype.render = function () {
        return (h(Host, { class: getIonMode(this) }, h("slot", null)));
    };
    Object.defineProperty(Row, "style", {
        get: function () { return ":host{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}"; },
        enumerable: true,
        configurable: true
    });
    return Row;
}());
export { Row as ion_row };
