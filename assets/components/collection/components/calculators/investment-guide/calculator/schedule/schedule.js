import { Host, h } from "@stencil/core";
var Segment;
(function (Segment) {
    Segment["table"] = "table";
    Segment["graph"] = "graph";
})(Segment || (Segment = {}));
;
export class Schedule {
    constructor() {
        this.segment = Segment.graph;
    }
    handleSegmentChange(e) {
        this.segment = e.detail.value;
    }
    render() {
        return (h(Host, null,
            h("ion-segment", { value: Segment.graph, onIonChange: this.handleSegmentChange.bind(this) },
                h("ion-segment-button", { value: Segment.graph },
                    h("ion-label", null, "Graph")),
                h("ion-segment-button", { value: Segment.table },
                    h("ion-label", null, "Table"))),
            h("budgific-ig-schedule-chart", { loading: this.loading, mortgage: this.mortgage ? this.mortgage.chartData : null, tfsa: this.tfsa ? this.tfsa.chartData : null, rrsp: this.rrsp ? this.rrsp.chartData : null, nonRegistered: this.nonRegistered ? this.nonRegistered.chartData : null, style: { display: this.segment === Segment.table ? 'none' : '' } }),
            this.renderTable(this.segment === Segment.table)));
    }
    renderTable(show) {
        return show ? (h("budgific-ig-schedule-table", { loading: this.loading, mortgage: this.mortgage ? this.mortgage.chartData : null, tfsa: this.tfsa ? this.tfsa.chartData : null, rrsp: this.rrsp ? this.rrsp.chartData : null, nonRegistered: this.nonRegistered ? this.nonRegistered.chartData : null })) : null;
    }
    static get is() { return "budgific-ig-schedule"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["schedule.css"]
    }; }
    static get styleUrls() { return {
        "$": ["schedule.css"]
    }; }
    static get properties() { return {
        "mortgage": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "ICalculatorData",
                "resolved": "ICalculatorData",
                "references": {
                    "ICalculatorData": {
                        "location": "import",
                        "path": "budgific-web-workers"
                    }
                }
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
                "original": "ICalculatorData",
                "resolved": "ICalculatorData",
                "references": {
                    "ICalculatorData": {
                        "location": "import",
                        "path": "budgific-web-workers"
                    }
                }
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
                "original": "ICalculatorData",
                "resolved": "ICalculatorData",
                "references": {
                    "ICalculatorData": {
                        "location": "import",
                        "path": "budgific-web-workers"
                    }
                }
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
                "original": "ICalculatorData",
                "resolved": "ICalculatorData",
                "references": {
                    "ICalculatorData": {
                        "location": "import",
                        "path": "budgific-web-workers"
                    }
                }
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
    static get states() { return {
        "segment": {}
    }; }
}
