import { Host, h } from "@stencil/core";
export class ResultDetails {
    connectedCallback() {
        const modalElement = document.querySelector('ion-modal');
        this.message = modalElement.componentProps.message;
    }
    render() {
        return (h(Host, null,
            h("ion-header", null,
                h("ion-toolbar", null,
                    h("ion-title", null, "Mortgage Results Details"),
                    h("ion-buttons", { slot: "primary" },
                        h("ion-button", null,
                            h("ion-icon", { slot: "icon-only", name: "close" }))))),
            h("ion-content", { class: "ion-padding" },
                h("div", { class: "formula" },
                    h("span", null, "Real Rate:"),
                    h("span", { class: "value" },
                        h("span", null, "0.035"),
                        h("span", { class: "name" }, "Mortgage Rate")),
                    h("span", { class: "sign" }, "+"),
                    h("span", { class: "value" },
                        h("span", null, "0.02"),
                        h("span", { class: "name" }, "Inflation Rate")),
                    h("span", { class: "sign" }, "="),
                    h("span", null, "0.035")),
                h("div", { class: "formula" },
                    h("span", null, "Semi Annual Rate:"),
                    h("span", null,
                        "(1+",
                        h("span", { class: "value" },
                            h("span", null, "0.035"),
                            h("span", { class: "name" }, "Real Rate")),
                        ")"),
                    h("span", { class: "sign" }, "="),
                    h("span", null, "0.035")),
                h("div", { class: "formula" },
                    h("span", null, "Interests Payed Before:"),
                    "SUM(Payed Interest)",
                    h("span", { class: "sign" }, "="),
                    h("span", null, "$43,243.20")),
                h("div", { class: "formula" },
                    h("span", null, "Interests Payed After:"),
                    "SUM(Payed Interest)",
                    h("span", { class: "sign" }, "="),
                    h("span", null, "$43,243.20")))));
    }
    static get is() { return "result-details"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["result-details.css"]
    }; }
    static get styleUrls() { return {
        "$": ["result-details.css"]
    }; }
    static get states() { return {
        "message": {}
    }; }
}
//  innerHTML={this.message}
