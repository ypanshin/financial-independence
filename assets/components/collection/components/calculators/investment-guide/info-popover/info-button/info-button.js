import { h, Host } from "@stencil/core";
export class InfoButton {
    componentWillLoad() {
        this.message = this.host.innerHTML;
    }
    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        const popover = document.createElement('ion-popover');
        popover.component = 'budgific-ig-info-popover';
        popover.showBackdrop = false;
        popover.componentProps = {
            message: this.message,
        };
        popover.event = Object.assign(Object.assign({}, event), {
            target: this.btn
        });
        document.body.appendChild(popover);
        popover.present();
    }
    render() {
        return (h(Host, null,
            h("ion-button", { fill: "clear", size: "default", ref: (btn) => this.btn = btn, onClick: this.handleClick.bind(this) },
                h("ion-icon", { name: "information-circle-outline", slot: "icon-only" }))));
    }
    static get is() { return "budgific-ig-info-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["info-button.css"]
    }; }
    static get styleUrls() { return {
        "$": ["info-button.css"]
    }; }
    static get states() { return {
        "message": {}
    }; }
    static get elementRef() { return "host"; }
}
