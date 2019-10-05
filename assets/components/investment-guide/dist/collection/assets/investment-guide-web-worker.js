/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/investment-guide/investment-guide.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/formula/formula.ts":
/*!********************************!*\
  !*** ./src/formula/formula.ts ***!
  \********************************/
/*! exports provided: FormulaType, Formula */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormulaType", function() { return FormulaType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Formula", function() { return Formula; });
var FormulaType;
(function (FormulaType) {
    FormulaType[FormulaType["ZERO"] = 0] = "ZERO";
    FormulaType[FormulaType["ONE"] = 1] = "ONE";
})(FormulaType || (FormulaType = {}));
class Formula {
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


/***/ }),

/***/ "./src/investment-guide/investment-guide.ts":
/*!**************************************************!*\
  !*** ./src/investment-guide/investment-guide.ts ***!
  \**************************************************/
/*! exports provided: InvestmentGuideWebWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvestmentGuideWebWorker", function() { return InvestmentGuideWebWorker; });
/* harmony import */ var _model_mortgage_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/mortgage-data */ "./src/investment-guide/model/mortgage-data.ts");
/* harmony import */ var _model_tfsa_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/tfsa-data */ "./src/investment-guide/model/tfsa-data.ts");
/* harmony import */ var _model_rrsp_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model/rrsp-data */ "./src/investment-guide/model/rrsp-data.ts");
/* harmony import */ var _model_non_registered_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model/non-registered-data */ "./src/investment-guide/model/non-registered-data.ts");




importScripts('https://cdn.jsdelivr.net/npm/big-js@3.1.3/big.min.js');
importScripts('https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js');
class InvestmentGuideWebWorker {
    constructor() {
        this.today = Date.now();
        this.mortgageData = new _model_mortgage_data__WEBPACK_IMPORTED_MODULE_0__["MortgageData"](this.today);
        this.tfsaData = new _model_tfsa_data__WEBPACK_IMPORTED_MODULE_1__["TFSAData"](this.today);
        this.rrspData = new _model_rrsp_data__WEBPACK_IMPORTED_MODULE_2__["RRSPData"](this.today);
        this.nonRegisteredData = new _model_non_registered_data__WEBPACK_IMPORTED_MODULE_3__["NonRegisteredData"](this.today);
        onmessage = (ev) => this.processData(ev.data);
    }
    processData(params) {
        this.params = params;
        if (params) {
            this.mortgageData.updateData(params);
            this.tfsaData.updateData(params);
            this.rrspData.updateData(params);
            this.nonRegisteredData.updateData(params);
            postMessage({
                mortgage: this.mortgageData.data,
                tfsa: this.tfsaData.data,
                rrsp: this.rrspData.data,
                nonRegistered: this.nonRegisteredData.data,
            });
        }
    }
}
const webWorker = new InvestmentGuideWebWorker();


/***/ }),

/***/ "./src/investment-guide/model/calculator-data.ts":
/*!*******************************************************!*\
  !*** ./src/investment-guide/model/calculator-data.ts ***!
  \*******************************************************/
/*! exports provided: CalculatorData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalculatorData", function() { return CalculatorData; });
class CalculatorData {
    yearlyReduce(today, data, amount, getValue) {
        const dataByYears = data.reduce((acc, item, i) => {
            const year = moment(today).add(item.period, 'month').year();
            acc[year] = acc[year] || [];
            acc[year].push(getValue(item, i));
            return acc;
        }, {});
        let sum = Big(0);
        return Object.keys(dataByYears).map((key) => {
            sum = dataByYears[+key].reduce((acc, num) => acc.plus(num), Big(0)).plus(sum);
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
        return Object.keys(dataByYears).map(key => +Big(dataByYears[+key]).round(2));
    }
    shouldRegenerate(params) {
        if (!this.params || !!Object.keys(this.params).find((key) => this.params && this.params[key] !== params[key])) {
            this.copyParams(params);
            return true;
        }
        else {
            return false;
        }
    }
    updateData(params) {
        if (this.shouldRegenerate(params)) {
            this.data = this.isValidParams(params) ? this.generateData(params) : undefined;
        }
    }
}


/***/ }),

/***/ "./src/investment-guide/model/mortgage-data.ts":
/*!*****************************************************!*\
  !*** ./src/investment-guide/model/mortgage-data.ts ***!
  \*****************************************************/
/*! exports provided: MortgageData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MortgageData", function() { return MortgageData; });
/* harmony import */ var _calculator_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculator-data */ "./src/investment-guide/model/calculator-data.ts");
/* harmony import */ var _formula_formula__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../formula/formula */ "./src/formula/formula.ts");


class MortgageData extends _calculator_data__WEBPACK_IMPORTED_MODULE_0__["CalculatorData"] {
    constructor(today) {
        super();
        this.today = today;
    }
    generateData(params) {
        const semiAnnuallyRate = _formula_formula__WEBPACK_IMPORTED_MODULE_1__["Formula"].semiAnnuallyRate(params.mortgageRate);
        const monthlyInflationRate = Big(params.inflationRate).div(12);
        const periods = +Big(params.mortgageAmortization).times(12);
        const amortizationBefore = _formula_formula__WEBPACK_IMPORTED_MODULE_1__["Formula"].amortizationSchedule(semiAnnuallyRate, periods, params.mortgageBalance);
        const interestsBefore = amortizationBefore.reduce((acc, amor) => acc.plus(amor.interest).minus(monthlyInflationRate.times(amor.interest)), Big(0));
        const amortizationAfter = _formula_formula__WEBPACK_IMPORTED_MODULE_1__["Formula"].amortizationSchedule(semiAnnuallyRate, periods, params.mortgageBalance, params.amount, 1);
        const interestsAfter = amortizationAfter.reduce((acc, amor) => acc.plus(amor.interest).minus(monthlyInflationRate.times(amor.interest)), Big(0));
        const futureValue = +interestsBefore.minus(interestsAfter).plus(params.amount);
        const dataByYears = amortizationBefore.reduce((acc, itemBefore, i) => {
            const year = moment(this.today).add(itemBefore.period, 'month').year();
            acc[year] = acc[year] || [];
            const interestsBefore = Big(itemBefore.interest).minus(monthlyInflationRate.times(itemBefore.interest));
            const itemAfter = amortizationAfter[i];
            const interestsAfter = Big(itemAfter.interest).minus(monthlyInflationRate.times(itemAfter.interest));
            acc[year].push(+interestsBefore.minus(interestsAfter));
            return acc;
        }, {});
        let sum = Big(0);
        const chartData = Object.keys(dataByYears).map(key => {
            sum = dataByYears[+key].reduce((acc, num) => acc.plus(num), Big(0)).plus(sum);
            return +sum.plus(params.amount).round(2);
        });
        return {
            futureValue,
            chartData,
        };
    }
    isValidParams(params) {
        return !!params.mortgageBalance &&
            !!params.mortgageRate &&
            !!params.investmentHorizon &&
            !!params.amount &&
            !!params.mortgageAmortization;
    }
    copyParams(params) {
        const { mortgageBalance, mortgageRate, investmentHorizon, amount, mortgageAmortization, inflationRate } = params;
        this.params = {
            mortgageBalance,
            mortgageRate,
            investmentHorizon,
            amount,
            mortgageAmortization,
            inflationRate
        };
    }
}


/***/ }),

/***/ "./src/investment-guide/model/non-registered-data.ts":
/*!***********************************************************!*\
  !*** ./src/investment-guide/model/non-registered-data.ts ***!
  \***********************************************************/
/*! exports provided: NonRegisteredData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NonRegisteredData", function() { return NonRegisteredData; });
/* harmony import */ var _calculator_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculator-data */ "./src/investment-guide/model/calculator-data.ts");
/* harmony import */ var _formula_formula__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../formula/formula */ "./src/formula/formula.ts");


class NonRegisteredData extends _calculator_data__WEBPACK_IMPORTED_MODULE_0__["CalculatorData"] {
    constructor(today) {
        super();
        this.today = today;
    }
    generateData(params) {
        const periods = +Big(params.investmentHorizon).times(12);
        const rate = +Big(params.investmentRate).minus(params.inflationRate);
        const amortization = _formula_formula__WEBPACK_IMPORTED_MODULE_1__["Formula"].gainSchedule(rate, periods, params.amount);
        const futureValue = this.afterTax(amortization[amortization.length - 1].value, params.amount, params.horizonMarginalTaxRate);
        const chartData = this.yearlyReduce1(this.today, amortization, (item) => this.afterTax(item.value, params.amount, params.horizonMarginalTaxRate));
        return {
            futureValue,
            chartData,
        };
    }
    afterTax(value, amount, horizonMarginalTaxRate) {
        const bigValue = Big(value);
        const gain = bigValue.minus(amount);
        const taxes = gain.times(horizonMarginalTaxRate).div(2);
        return +bigValue.minus(taxes);
    }
    isValidParams(params) {
        return !!params.investmentRate &&
            !!params.investmentHorizon &&
            !!params.amount &&
            !!params.horizonMarginalTaxRate;
    }
    copyParams(params) {
        const { investmentRate, investmentHorizon, amount, horizonMarginalTaxRate, inflationRate } = params;
        this.params = { investmentRate, investmentHorizon, amount, horizonMarginalTaxRate, inflationRate };
    }
}


/***/ }),

/***/ "./src/investment-guide/model/rrsp-data.ts":
/*!*************************************************!*\
  !*** ./src/investment-guide/model/rrsp-data.ts ***!
  \*************************************************/
/*! exports provided: RRSPData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RRSPData", function() { return RRSPData; });
/* harmony import */ var _calculator_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculator-data */ "./src/investment-guide/model/calculator-data.ts");
/* harmony import */ var _formula_formula__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../formula/formula */ "./src/formula/formula.ts");


class RRSPData extends _calculator_data__WEBPACK_IMPORTED_MODULE_0__["CalculatorData"] {
    constructor(today) {
        super();
        this.today = today;
    }
    generateData(value) {
        const periods = +Big(value.investmentHorizon).times(12);
        const rate = +Big(value.investmentRate).minus(value.inflationRate);
        let rrspAmount = value.amount;
        if (value.reinvestTaxReturn) {
            rrspAmount = +Big(value.marginalTaxRate).times(value.amount).plus(value.amount);
        }
        const amortization = _formula_formula__WEBPACK_IMPORTED_MODULE_1__["Formula"].gainSchedule(rate, periods, rrspAmount);
        const futureValue = this.afterTaxes(amortization[amortization.length - 1].value, value.horizonEffectiveTaxRate);
        const chartData = this.yearlyReduce1(this.today, amortization, (item) => this.afterTaxes(item.value, value.horizonEffectiveTaxRate));
        return {
            futureValue,
            chartData,
        };
    }
    afterTaxes(value, horizonEffectiveTaxRate) {
        const bigValue = Big(value);
        return +bigValue.minus(bigValue.times(horizonEffectiveTaxRate));
    }
    isValidParams(params) {
        return !!params.investmentRate &&
            !!params.investmentHorizon &&
            !!params.amount &&
            !!params.marginalTaxRate &&
            !!params.reinvestTaxReturn &&
            !!params.horizonEffectiveTaxRate;
    }
    copyParams(params) {
        const { investmentRate, investmentHorizon, amount, marginalTaxRate, horizonEffectiveTaxRate, inflationRate, reinvestTaxReturn } = params;
        this.params = { investmentRate, investmentHorizon, amount, marginalTaxRate, horizonEffectiveTaxRate, inflationRate, reinvestTaxReturn };
    }
}


/***/ }),

/***/ "./src/investment-guide/model/tfsa-data.ts":
/*!*************************************************!*\
  !*** ./src/investment-guide/model/tfsa-data.ts ***!
  \*************************************************/
/*! exports provided: TFSAData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TFSAData", function() { return TFSAData; });
/* harmony import */ var _calculator_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculator-data */ "./src/investment-guide/model/calculator-data.ts");
/* harmony import */ var _formula_formula__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../formula/formula */ "./src/formula/formula.ts");

// import Big from 'big.js';

class TFSAData extends _calculator_data__WEBPACK_IMPORTED_MODULE_0__["CalculatorData"] {
    constructor(today) {
        super();
        this.today = today;
    }
    generateData(value) {
        const periods = +Big(value.investmentHorizon).times(12);
        const rate = +Big(value.investmentRate).minus(value.inflationRate);
        const amortization = _formula_formula__WEBPACK_IMPORTED_MODULE_1__["Formula"].gainSchedule(rate, periods, value.amount);
        const futureValue = amortization[amortization.length - 1].value;
        const chartData = this.yearlyReduce1(this.today, amortization, (item) => item.value);
        return {
            futureValue,
            chartData,
        };
    }
    isValidParams(params) {
        return !!params.investmentRate &&
            !!params.investmentHorizon &&
            !!params.amount;
    }
    copyParams(params) {
        const { investmentRate, investmentHorizon, amount, inflationRate } = params;
        this.params = { investmentRate, investmentHorizon, amount, inflationRate };
    }
}


/***/ })

/******/ });
//# sourceMappingURL=investment-guide-web-worker.js.map