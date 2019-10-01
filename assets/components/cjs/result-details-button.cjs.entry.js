'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-0c2b188e.js');

const ResultDetailsButton = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    componentWillLoad() {
        this.message = this.host.innerHTML;
    }
    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        const modal = document.createElement('ion-modal');
        modal.component = 'result-details';
        modal.componentProps = {
            message: this.message,
        };
        document.body.appendChild(modal);
        modal.present();
    }
    render() {
        return (core.h(core.Host, null, core.h("ion-button", { fill: "clear", size: "default", ref: (btn) => this.btn = btn, onClick: this.handleClick.bind(this) }, core.h("ion-icon", { name: "information-circle-outline", slot: "icon-only" }))));
    }
    get host() { return core.getElement(this); }
    static get style() { return ".padding-horizontal{padding:0 10px}"; }
};

exports.result_details_button = ResultDetailsButton;
