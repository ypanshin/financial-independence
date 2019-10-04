import { r as registerInstance, f as getIonMode, h, l as config, H as Host, e as getElement, m as isPlatform } from './core-6682cc20.js';
import { a as rIC } from './helpers-45f2b621.js';
var App = /** @class */ (function () {
    function App(hostRef) {
        registerInstance(this, hostRef);
    }
    App.prototype.componentDidLoad = function () {
        {
            rIC(function () {
                var isHybrid = isPlatform(window, 'hybrid');
                if (!config.getBoolean('_testing')) {
                    import('./tap-click-1609d88e.js').then(function (module) { return module.startTapClick(config); });
                }
                if (config.getBoolean('statusTap', isHybrid)) {
                    import('./status-tap-7a135278.js').then(function (module) { return module.startStatusTap(); });
                }
                if (config.getBoolean('inputShims', needInputShims())) {
                    import('./input-shims-3631b400.js').then(function (module) { return module.startInputShims(config); });
                }
                if (config.getBoolean('hardwareBackButton', isHybrid)) {
                    import('./hardware-back-button-dbf97d0e.js').then(function (module) { return module.startHardwareBackButton(); });
                }
                import('./focus-visible-f5bcca71.js').then(function (module) { return module.startFocusVisible(); });
            });
        }
    };
    App.prototype.render = function () {
        var _a;
        var mode = getIonMode(this);
        return (h(Host, { class: (_a = {},
                _a[mode] = true,
                _a['ion-page'] = true,
                _a['force-statusbar-padding'] = config.getBoolean('_forceStatusbarPadding'),
                _a) }));
    };
    Object.defineProperty(App.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "style", {
        get: function () { return "html.plt-mobile ion-app{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ion-app.force-statusbar-padding{--ion-safe-area-top:20px}"; },
        enumerable: true,
        configurable: true
    });
    return App;
}());
var needInputShims = function () {
    return isPlatform(window, 'ios') && isPlatform(window, 'mobile');
};
export { App as ion_app };
