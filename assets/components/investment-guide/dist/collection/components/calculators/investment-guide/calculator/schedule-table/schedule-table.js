import { Host, h } from "@stencil/core";
import { AccountType } from '../../model/account-type';
import moment from 'moment';
import { Utils } from '../utils';
export class ScheduleTableComponent {
    constructor() {
        this.today = Date.now();
    }
    render() {
        return (h(Host, null,
            h("ion-grid", null,
                h("ion-row", null,
                    h("ion-col", null,
                        h("h3", null, "Year")),
                    h("ion-col", null,
                        h("h3", null, "Mortgage")),
                    h("ion-col", null,
                        h("h3", null, "TFSA")),
                    h("ion-col", null,
                        h("h3", null, "RRSP")),
                    h("ion-col", null,
                        h("h3", null, "Non Registered"))),
                this.renderRows())));
    }
    renderRows() {
        const maxLength = Math.max(this.getDataLength(AccountType.mortgage), this.getDataLength(AccountType.tfsa), this.getDataLength(AccountType.rrsp), this.getDataLength(AccountType.nonRegistered));
        return maxLength > 0 ? Array.apply(null, Array(maxLength)).map((_x, i) => this.renderRow(i)) : null;
    }
    renderRow(index) {
        const year = moment(this.today).add(index, 'year').year();
        return (h("ion-row", null,
            h("ion-col", null,
                h("div", null, year)),
            h("ion-col", null,
                h("div", null, this.mortgage[index] ? Utils.currency(this.mortgage[index]) : '')),
            h("ion-col", null,
                h("div", null, this.tfsa[index] ? Utils.currency(this.tfsa[index]) : '')),
            h("ion-col", null,
                h("div", null, this.rrsp[index] ? Utils.currency(this.rrsp[index]) : '')),
            h("ion-col", null,
                h("div", null, this.nonRegistered[index] ? Utils.currency(this.nonRegistered[index]) : ''))));
    }
    getDataLength(type) {
        return this[type] ? this[type].length : 0;
    }
    static get is() { return "budgific-ig-schedule-table"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["schedule-table.css"]
    }; }
    static get styleUrls() { return {
        "$": ["schedule-table.css"]
    }; }
    static get properties() { return {
        "mortgage": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "number[]",
                "resolved": "number[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "tfsa": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "number[]",
                "resolved": "number[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "rrsp": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "number[]",
                "resolved": "number[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "nonRegistered": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "number[]",
                "resolved": "number[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "loading": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "loading",
            "reflect": false
        }
    }; }
}
