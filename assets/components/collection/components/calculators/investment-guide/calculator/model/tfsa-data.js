import { CalculatorData } from "./calculator-data";
import { Formula } from "../../../../../formula/formula";
import Big from 'big.js';
export class TFSAData extends CalculatorData {
    constructor(today) {
        super();
        this.today = today;
    }
    generateData(value) {
        if (this.shouldRegenerate(value)) {
            if (value.tfsa && value.investmentRate && value.investmentHorizon && value.amount) {
                const periods = +Big(value.investmentHorizon).times(12);
                const rate = +Big(value.investmentRate).minus(value.inflationRate);
                const amortization = Formula.gainSchedule(rate, periods, value.amount);
                this.futureValue = amortization[amortization.length - 1].value;
                this.chartData = this.yearlyReduce1(this.today, amortization, (item) => item.value);
            }
            else {
                this.chartData = undefined;
            }
        }
    }
    copyParams(params) {
        const { investmentRate, investmentHorizon, amount, inflationRate } = params;
        this.params = { investmentRate, investmentHorizon, amount, inflationRate };
    }
}
