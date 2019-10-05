import { r as registerInstance, h, H as Host, e as getElement } from './core-6682cc20.js';

const ResultDetailsButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h(Host, null, h("ion-button", { fill: "clear", size: "default", ref: (btn) => this.btn = btn, onClick: this.handleClick.bind(this) }, h("ion-icon", { name: "information-circle-outline", slot: "icon-only" }))));
    }
    get host() { return getElement(this); }
    static get style() { return ".padding-horizontal{padding:0 10px}"; }
};

export { ResultDetailsButton as result_details_button };
