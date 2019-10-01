import { CalculatorData } from "./calculator-data";
import { Formula } from "../../../../../formula/formula";
import Big from 'big.js';
export class NonRegisteredData extends CalculatorData {
    constructor(today) {
        super();
        this.today = today;
    }
    generateData(value) {
        if (this.shouldRegenerate(value)) {
            if (value.nonRegistered && value.investmentRate && value.investmentHorizon && value.amount && value.horizonMarginalTaxRate) {
                const periods = +Big(value.investmentHorizon).times(12);
                const rate = +Big(value.investmentRate).minus(value.inflationRate);
                const amortization = Formula.gainSchedule(rate, periods, value.amount);
                this.futureValue = this.afterTax(amortization[amortization.length - 1].value, value.amount, value.horizonMarginalTaxRate);
                this.chartData = this.yearlyReduce1(this.today, amortization, (item) => this.afterTax(item.value, value.amount, value.horizonMarginalTaxRate));
            }
            else {
                this.chartData = undefined;
            }
        }
    }
    afterTax(value, amount, horizonMarginalTaxRate) {
        const bigValue = Big(value);
        const gain = bigValue.minus(amount);
        const taxes = gain.times(horizonMarginalTaxRate).div(2);
        return +bigValue.minus(taxes);
    }
    copyParams(params) {
        const { investmentRate, investmentHorizon, amount, horizonMarginalTaxRate, inflationRate } = params;
        this.params = { investmentRate, investmentHorizon, amount, horizonMarginalTaxRate, inflationRate };
    }
}
