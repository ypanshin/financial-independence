import { CalculatorData } from "./calculator-data";
import { Formula } from "../../../../../formula/formula";
import Big from 'big.js';
import moment from 'moment';
export class MortgageData extends CalculatorData {
    constructor(today) {
        super();
        this.today = today;
    }
    generateData(value) {
        if (this.shouldRegenerate(value)) {
            if (value.mortgage && value.mortgageBalance && value.mortgageRate && value.investmentHorizon && value.amount && value.mortgageAmortization) {
                const semiAnnuallyRate = Formula.semiAnnuallyRate(value.mortgageRate);
                const monthlyInflationRate = Big(value.inflationRate).div(12);
                const periods = +Big(value.mortgageAmortization).times(12);
                const amortizationBefore = Formula.amortizationSchedule(semiAnnuallyRate, periods, value.mortgageBalance);
                const interestsBefore = amortizationBefore.reduce((acc, amor) => acc.plus(amor.interest).minus(monthlyInflationRate.times(amor.interest)), Big(0));
                const amortizationAfter = Formula.amortizationSchedule(semiAnnuallyRate, periods, value.mortgageBalance, value.amount, 1);
                const interestsAfter = amortizationAfter.reduce((acc, amor) => acc.plus(amor.interest).minus(monthlyInflationRate.times(amor.interest)), Big(0));
                this.futureValue = +interestsBefore.minus(interestsAfter).plus(value.amount);
                const dataByYears = amortizationBefore.reduce((acc, itemBefore, i) => {
                    const year = moment(this.today).add(itemBefore.period, 'month').year();
                    acc[year] = acc[year] || [];
                    const interestsBefore = Big(itemBefore.interest).minus(monthlyInflationRate.times(itemBefore.interest));
                    const itemAfter = amortizationAfter[i];
                    const interestsAfter = Big(itemAfter.interest).minus(monthlyInflationRate.times(itemAfter.interest));
                    acc[year].push(interestsBefore.minus(interestsAfter));
                    return acc;
                }, {});
                let sum = Big(0);
                this.chartData = Object.keys(dataByYears).map(key => {
                    sum = dataByYears[key].reduce((acc, num) => acc.plus(num), Big(0)).plus(sum);
                    return +sum.plus(value.amount).round(2);
                });
            }
            else {
                this.chartData = undefined;
            }
        }
    }
    copyParams(params) {
        const { mortgageBalance, mortgageRate, investmentHorizon, amount, mortgageAmortization, inflationRate } = params;
        this.params = { mortgageBalance, mortgageRate, investmentHorizon, amount, mortgageAmortization, inflationRate };
    }
}
