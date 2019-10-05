import { h, Host } from "@stencil/core";
export class ResultDetailsButton {
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
        return (h(Host, null,
            h("ion-button", { fill: "clear", size: "default", ref: (btn) => this.btn = btn, onClick: this.handleClick.bind(this) },
                h("ion-icon", { name: "information-circle-outline", slot: "icon-only" }))));
    }
    static get is() { return "result-details-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["result-details-button.css"]
    }; }
    static get styleUrls() { return {
        "$": ["result-details-button.css"]
    }; }
    static get states() { return {
        "message": {}
    }; }
    static get elementRef() { return "host"; }
}
