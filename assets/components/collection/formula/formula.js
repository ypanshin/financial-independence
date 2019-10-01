import Big from 'big.js';
export var FormulaType;
(function (FormulaType) {
    FormulaType[FormulaType["ZERO"] = 0] = "ZERO";
    FormulaType[FormulaType["ONE"] = 1] = "ONE";
})(FormulaType || (FormulaType = {}));
export class Formula {
    static amortizationSchedule(rate, periods, value, lump, lumpPeriod) {
        const payment = Big(-Formula.PMT(rate, periods, value));
        const amortization = [];
        let balance = Big(value);
        for (let period = 1; period <= periods; period++) {
            const interest = balance.times(rate);
            let principal = payment.minus(interest);
            if (lumpPeriod && period === (lumpPeriod + 1) && lump) {
                principal = principal.plus(lump);
            }
            balance = balance.minus(principal);
            amortization.push({
                period,
                payment: +payment,
                interest: +interest,
                principal: +principal,
                value: +balance,
            });
        }
        return amortization;
    }
    static gainSchedule(rate, periods, value) {
        const schedule = [];
        const monthlyRate = Big(rate).div(12);
        let balance = Big(value);
        for (let period = 1; period <= periods; period++) {
            const gain = balance.times(monthlyRate);
            balance = balance.plus(gain);
            schedule.push({
                period,
                gain: +gain,
                value: +balance,
            });
        }
        return schedule;
    }
    static semiAnnuallyRate(rate) {
        return +Big(Math.pow(+Big(rate).div(2).plus(1).pow(2), +Big(1).div(12))).minus(1);
    }
    /**
     * Calculates the cumulative interest over a range of payment periods for an investment based on constant-amount periodic payments and a constant interest rate.
     * @param rate The interest rate.
     * @param periods The number of payments to be made.
     * @param value The current value of the annuity.
     * @param start The number of the payment period to begin the cumulative calculation.
     * @param end The number of the payment period to end the cumulative calculation.
     * @param type Whether payments are due at the end (0) or beginning (1) of each period.
     */
    static CUMIPMT(rate, periods, value, start, end, type) {
        if (!Formula.valid(rate, periods, value, start, end)) {
            throw new Error('Wrong parameter format');
        }
        // Return error if either rate, periods, or value are lower than or equal to zero
        if (rate <= 0 || periods <= 0 || value <= 0) {
            throw Error('Rate, periods, or value are lower than or equal to zero');
        }
        // Return error if start < 1, end < 1, or start > end
        if (start < 1 || end < 1 || start > end) {
            throw Error('start < 1, end < 1, or start > end');
        }
        // Compute cumulative interest
        const payment = Formula.PMT(rate, periods, value, 0, type);
        let interest = Big(0);
        if (start === 1) {
            if (type === FormulaType.ZERO) {
                interest = interest.minus(value);
                start++;
            }
        }
        for (let i = start; i <= end; i++) {
            if (type === FormulaType.ONE) {
                interest = interest.plus(Formula.FV(rate, i - 2, payment, value, 1)).minus(payment);
            }
            else {
                interest = interest.plus(Formula.FV(rate, i - 1, payment, value, 0));
            }
        }
        interest = interest.times(rate);
        // Return cumulative interest
        return +interest;
    }
    static FV(rate, periods, payment, value = 0, type = FormulaType.ZERO) {
        if (!Formula.valid(rate, periods, payment, value, type)) {
            throw Error('Wrong parameter format');
        }
        // Return future value
        let result;
        if (rate === 0) {
            result = Big(payment).times(periods).plus(value);
        }
        else {
            const term = Big(1).plus(rate).pow(periods);
            if (type === FormulaType.ONE) {
                result = term.times(value).plus(Big(payment).times(Big(1).plus(rate)).times(term.minus(1).div(rate)));
            }
            else {
                result = term.times(value).plus(Big(payment).times(term.minus(1)).div(rate));
            }
        }
        return -result;
    }
    /**
     * Calculates the periodic payment for an annuity investment based on constant-amount periodic payments and a constant interest rate.
     * @param rate The interest rate.
     * @param periods The number of payments to be made.
     * @param present The current value of the annuity.
     * @param future The future value remaining after the final payment has been made.
     * @param type Whether payments are due at the end (0) or beginning (1) of each period.
     */
    static PMT(rate, periods, present, future = 0, type = FormulaType.ZERO) {
        if (!Formula.valid(rate, periods, present, future, type)) {
            throw Error('Wrong parameter format');
        }
        // Return payment
        let result;
        if (rate === 0) {
            result = Big(present).plus(future).div(periods);
        }
        else {
            const term = Big(Math.pow(+Big(1).plus(rate), periods));
            if (type === FormulaType.ONE) {
                result = Big(future).times(rate).div(Big(term).minus(1)).plus(Big(present).times(rate).div(Big(1).minus(Big(1).div(term)))).div(Big(1).plus(rate));
            }
            else {
                result = Big(future).times(rate).div(Big(term).minus(1)).plus(Big(present).times(rate).div(Big(1).minus(Big(1).div(term))));
            }
        }
        return -result;
    }
    static valid(...props) {
        for (const num of props) {
            if (typeof num !== 'number') {
                return false;
            }
        }
        return true;
    }
}
