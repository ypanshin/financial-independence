import { CalculatorData } from "./calculator-data";
import { IRRSPValue } from "../../model/rrsp-value";
export declare class RRSPData extends CalculatorData<IRRSPValue> {
    private today;
    constructor(today: number);
    generateData(value: IRRSPValue): void;
    afterTaxes(value: number, horizonEffectiveTaxRate: number): number;
    protected copyParams(params: IRRSPValue): void;
}
