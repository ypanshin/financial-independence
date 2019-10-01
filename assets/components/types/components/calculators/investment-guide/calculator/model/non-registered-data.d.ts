import { CalculatorData } from "./calculator-data";
export interface INonRegisteredValue {
    investmentRate?: number;
    investmentHorizon?: number;
    amount?: number;
    inflationRate?: number;
    horizonMarginalTaxRate?: number;
    nonRegistered?: boolean;
}
export declare class NonRegisteredData extends CalculatorData<INonRegisteredValue> {
    private today;
    constructor(today: number);
    generateData(value: INonRegisteredValue): void;
    afterTax(value: number, amount: number, horizonMarginalTaxRate: number): number;
    protected copyParams(params: INonRegisteredValue): void;
}
