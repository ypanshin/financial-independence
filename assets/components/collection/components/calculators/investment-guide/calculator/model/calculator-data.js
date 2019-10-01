import Big from 'big.js';
import moment from 'moment';
export class CalculatorData {
    yearlyReduce(today, data, amount, getValue) {
        const dataByYears = data.reduce((acc, item, i) => {
            const year = moment(today).add(item.period, 'month').year();
            acc[year] = acc[year] || [];
            acc[year].push(getValue(item, i));
            return acc;
        }, {});
        let sum = Big(0);
        return Object.keys(dataByYears).map(key => {
            sum = dataByYears[key].reduce((acc, num) => acc.plus(num), Big(0)).plus(sum);
            return +sum.plus(amount).round(2);
        });
    }
    yearlyReduce1(today, data, getValue) {
        const dataByYears = data.reduce((acc, item, i) => {
            const date = moment(today).add(item.period, 'month');
            const year = date.year();
            acc[year] = getValue(item, i);
            return acc;
        }, {});
        return Object.keys(dataByYears).map(key => +Big(dataByYears[key]).round(2));
    }
    shouldRegenerate(params) {
        if (!this.params || !!Object.keys(this.params).find(key => this.params[key] !== params[key])) {
            this.copyParams(params);
            return true;
        }
        else {
            return false;
        }
    }
}
