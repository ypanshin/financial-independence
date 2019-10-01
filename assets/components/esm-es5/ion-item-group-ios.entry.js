import { r as registerInstance, e as getIonMode, h, H as Host } from './core-d377b9a5.js';
var ItemGroup = /** @class */ (function () {
    function ItemGroup(hostRef) {
        registerInstance(this, hostRef);
    }
    ItemGroup.prototype.render = function () {
        var _a;
        var mode = getIonMode(this);
        return (h(Host, { role: "group", class: (_a = {},
                _a[mode] = true,
                // Used internally for styling
                _a["item-group-" + mode] = true,
                _a['item'] = true,
                _a) }));
    };
    Object.defineProperty(ItemGroup, "style", {
        get: function () { return "ion-item-group{display:block}.item-group-ios ion-item-sliding:last-child .item,.item-group-ios ion-item:last-child{--border-width:0}"; },
        enumerable: true,
        configurable: true
    });
    return ItemGroup;
}());
export { ItemGroup as ion_item_group };
