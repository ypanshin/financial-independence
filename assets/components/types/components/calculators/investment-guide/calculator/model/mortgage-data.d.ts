import { CalculatorData } from "./calculator-data";
import { IMortgageValue } from "../../model/mortgage-value";
export declare class MortgageData extends CalculatorData<IMortgageValue> {
    private today;
    constructor(today: number);
    generateData(value: IMortgageValue): void;
    protected copyParams(params: IMortgageValue): void;
}
