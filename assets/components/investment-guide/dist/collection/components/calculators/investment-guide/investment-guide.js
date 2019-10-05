import { Host, h } from "@stencil/core";
import { Mode } from './model/mode';
import { getInvestmentGuideValueConstraints } from './model/validate-constraints';
import validate from 'validate.js';
export class InvestmentGuide {
    constructor() {
        this.data = {
            amount: 1000,
            investmentHorizon: 25,
            marginalTaxRate: 0.3148,
            horizonMarginalTaxRate: 0.2965,
            horizonEffectiveTaxRate: 0.2388,
            inflationRate: 0.02,
            mortgageRate: 0.02,
            mortgageBalance: 500000,
            mortgageAmortization: 25,
            investmentRate: 0.05,
            reinvestTaxReturn: true,
            mortgage: true,
            rrsp: true,
            tfsa: true,
            nonRegistered: true,
        };
        this.mode = Mode.wizard;
    }
    componentWillLoad() {
        if (this.value) {
            const constrains = getInvestmentGuideValueConstraints(false);
            for (const key of Object.keys(this.value)) {
                if (this.value[key] !== undefined && !validate.single(this.value[key], constrains[key])) {
                    this.data[key] = this.value[key];
                }
            }
        }
    }
    invalidForm() {
        return !!validate(this.data, getInvestmentGuideValueConstraints());
    }
    handleValueChange(e) {
        this.data = Object.assign(Object.assign({}, this.data), e.detail);
        this.valueChange.emit(this.data);
    }
    handleCalculateClick() {
        this.mode = Mode.calculator;
    }
    handleConfigClick() {
        this.mode = Mode.wizard;
    }
    render() {
        return (h(Host, null,
            h("div", { class: "content" },
                this.renderWizard(this.mode),
                this.renderCalculator(this.mode),
                h("p", null,
                    h("ion-text", { color: "medium", class: "copy" },
                        "\u00A9 Budgific ",
                        new Date().getFullYear())))));
    }
    renderCalculator(mode) {
        return mode === Mode.calculator ? (h("budgific-ig-calculator", { value: this.data, onValueChange: this.handleValueChange.bind(this), onConfigClick: this.handleConfigClick.bind(this) })) : null;
    }
    renderWizard(mode) {
        return mode === Mode.wizard ? (h("div", { class: "wizard" },
            h("budgific-ig-accounts-form", { value: this.data, onValueChanged: this.handleValueChange.bind(this) }),
            h("budgific-ig-general-form", { value: this.data, onValueChanged: this.handleValueChange.bind(this) }),
            this.renderMortgageForm(this.data.mortgage),
            this.renderRRSPForm(this.data.rrsp),
            h("ion-button", { disabled: this.invalidForm(), onClick: () => this.handleCalculateClick() }, "Calculate"))) : null;
    }
    renderMortgageForm(show) {
        return show ? h("budgific-ig-mortgage-form", { value: this.data, onValueChanged: this.handleValueChange.bind(this) }) : null;
    }
    renderRRSPForm(show) {
        return show ? h("budgific-ig-rrsp-form", { reinvestTaxReturn: this.data.reinvestTaxReturn, onReinvestTaxReturnChange: this.handleValueChange.bind(this) }) : null;
    }
    static get is() { return "budgific-investment-guide"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["investment-guide.css"]
    }; }
    static get styleUrls() { return {
        "$": ["investment-guide.css"]
    }; }
    static get properties() { return {
        "value": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "IInvestmentGuideValue",
                "resolved": "IInvestmentGuideValue",
                "references": {
                    "IInvestmentGuideValue": {
                        "location": "import",
                        "path": "./model/investment-guide-value"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The amount to invest"
            }
        }
    }; }
    static get states() { return {
        "data": {},
        "mode": {}
    }; }
    static get events() { return [{
            "method": "valueChange",
            "name": "valueChange",
            "bubbles": true,
            "cancelable": true,
            "composed": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
}
