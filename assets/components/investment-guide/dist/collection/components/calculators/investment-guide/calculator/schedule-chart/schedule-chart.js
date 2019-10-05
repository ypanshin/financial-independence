import 'hammerjs';
import 'chartjs-plugin-zoom';
import { Host, h } from "@stencil/core";
import Chart from 'chart.js';
import { AccountLabel, AccountColor, AccountType } from '../../model/account-type';
import moment from 'moment';
import { Utils } from '../utils';
export class ScheduleChartComponent {
    constructor() {
        this.chartOptions = {
            type: 'line',
            data: { labels: [], datasets: [] },
            options: {
                responsive: true,
                legend: { display: false },
                scales: {
                    yAxes: [{
                            ticks: {
                                // beginAtZero: true,
                                callback: (value) => Utils.currency(value).replace('.00', '')
                            }
                        }]
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, chart) {
                            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                            return datasetLabel + ' ' + Utils.currency(tooltipItem.yLabel);
                        }
                    }
                },
                pan: {
                    enabled: true,
                    mode: "xy",
                    speed: 10,
                    threshold: 10
                },
                zoom: {
                    enabled: true,
                    drag: false,
                    mode: "xy",
                    limits: {
                        max: 10,
                        min: 0.5
                    }
                }
            },
        };
        this.today = Date.now();
    }
    componentWillLoad() {
        this.updateData(AccountType.mortgage, this.mortgage);
        this.updateData(AccountType.tfsa, this.tfsa);
        this.updateData(AccountType.rrsp, this.rrsp);
        this.updateData(AccountType.nonRegistered, this.nonRegistered);
    }
    componentDidRender() {
        if (!this.barChart && this.charts) {
            this.barChart = new Chart(this.charts, this.chartOptions);
        }
    }
    handleResize() {
        if (this.barChart) {
            this.barChart.resize();
        }
    }
    updateMortgageData(data, oldData) {
        if (data !== oldData) {
            this.updateData(AccountType.mortgage, data);
        }
    }
    updateTFSAData(data, oldData) {
        if (data !== oldData) {
            this.updateData(AccountType.tfsa, data);
        }
    }
    updateRRSPData(data, oldData) {
        if (data !== oldData) {
            this.updateData(AccountType.rrsp, data);
        }
    }
    updateNonRegisteredData(data, oldData) {
        if (data !== oldData) {
            this.updateData(AccountType.nonRegistered, data);
        }
    }
    updateData(account, data) {
        const dataSets = this.chartOptions.data.datasets;
        if (data) {
            const datasetIdx = dataSets.findIndex(d => d.label === AccountLabel[account]);
            if (datasetIdx > -1) {
                if (dataSets[datasetIdx].data !== data) {
                    dataSets[datasetIdx].data = data;
                }
            }
            else {
                dataSets.push(this.createDataset(account, data));
            }
        }
        this.updateLabels();
        if (this.barChart) {
            this.barChart.update();
        }
    }
    updateLabels() {
        const maxLength = Math.max(...this.chartOptions.data.datasets.map(dataset => dataset.data.length));
        if (this.chartOptions.data.labels.length !== maxLength && maxLength > 0) {
            this.chartOptions.data.labels = Array.apply(null, Array(maxLength)).map((_x, i) => moment(this.today).add(i, 'year').year());
        }
    }
    createDataset(type, data) {
        return {
            label: AccountLabel[type],
            data: data,
            backgroundColor: AccountColor[type],
            borderColor: AccountColor[type],
            fill: false,
        };
    }
    render() {
        return (h(Host, null,
            h("div", { class: "chart-spinner", style: { 'display': this.loading ? 'flex' : 'none' } },
                h("ion-spinner", { name: "lines", color: "primary" })),
            h("canvas", { style: { 'visibility': this.showChart() }, ref: (charts) => this.charts = charts })));
    }
    showChart() {
        return this.chartOptions.data.datasets.length > 0 ? 'inherit' : 'hidden';
    }
    static get is() { return "budgific-ig-schedule-chart"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["schedule-chart.css"]
    }; }
    static get styleUrls() { return {
        "$": ["schedule-chart.css"]
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
    static get watchers() { return [{
            "propName": "mortgage",
            "methodName": "updateMortgageData"
        }, {
            "propName": "tfsa",
            "methodName": "updateTFSAData"
        }, {
            "propName": "rrsp",
            "methodName": "updateRRSPData"
        }, {
            "propName": "nonRegistered",
            "methodName": "updateNonRegisteredData"
        }]; }
    static get listeners() { return [{
            "name": "resize",
            "method": "handleResize",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
