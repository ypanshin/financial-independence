import { r as registerInstance, e as getIonMode, h, H as Host } from './core-d377b9a5.js';
var Slide = /** @class */ (function () {
    function Slide(hostRef) {
        registerInstance(this, hostRef);
    }
    Slide.prototype.render = function () {
        var _a;
        var mode = getIonMode(this);
        return (h(Host, { class: (_a = {},
                _a[mode] = true,
                _a['swiper-slide'] = true,
                _a['swiper-zoom-container'] = true,
                _a) }));
    };
    Object.defineProperty(Slide, "style", {
        get: function () { return "ion-slide{height:100%}.slide-zoom,ion-slide{display:block;width:100%}.slide-zoom,.swiper-slide{text-align:center}.swiper-slide{display:-ms-flexbox;display:flex;position:relative;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;font-size:18px;-webkit-box-sizing:border-box;box-sizing:border-box}.swiper-slide img{width:auto;max-width:100%;height:auto;max-height:100%}"; },
        enumerable: true,
        configurable: true
    });
    return Slide;
}());
export { Slide as ion_slide };
