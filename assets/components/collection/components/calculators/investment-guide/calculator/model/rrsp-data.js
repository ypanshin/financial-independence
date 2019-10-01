import { CalculatorData } from "./calculator-data";
import { Formula } from "../../../../../formula/formula";
import Big from 'big.js';
export class RRSPData extends CalculatorData {
    constructor(today) {
        super();
        this.today = today;
    }
    generateData(value) {
        if (this.shouldRegenerate(value)) {
            if (value.rrsp &&
                value.investmentRate &&
                value.investmentHorizon &&
                value.amount &&
                value.marginalTaxRate &&
                value.reinvestTaxReturn !== undefined &&
                value.horizonEffectiveTaxRate) {
                const periods = +Big(value.investmentHorizon).times(12);
                const rate = +Big(value.investmentRate).minus(value.inflationRate);
                let rrspAmount = value.amount;
                if (value.reinvestTaxReturn) {
                    rrspAmount = +Big(value.marginalTaxRate).times(value.amount).plus(value.amount);
                }
                const amortization = Formula.gainSchedule(rate, periods, rrspAmount);
                this.futureValue = this.afterTaxes(amortization[amortization.length - 1].value, value.horizonEffectiveTaxRate);
                this.chartData = this.yearlyReduce1(this.today, amortization, (item) => this.afterTaxes(item.value, value.horizonEffectiveTaxRate));
            }
            else {
                this.chartData = undefined;
            }
        }
    }
    afterTaxes(value, horizonEffectiveTaxRate) {
        const bigValue = Big(value);
        return +bigValue.minus(bigValue.times(horizonEffectiveTaxRate));
    }
    copyParams(params) {
        const { investmentRate, investmentHorizon, amount, marginalTaxRate, horizonEffectiveTaxRate, inflationRate, reinvestTaxReturn } = params;
        this.params = { investmentRate, investmentHorizon, amount, marginalTaxRate, horizonEffectiveTaxRate, inflationRate, reinvestTaxReturn };
    }
}
