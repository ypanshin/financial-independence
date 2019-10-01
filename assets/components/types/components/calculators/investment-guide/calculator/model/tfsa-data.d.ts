import { CalculatorData } from "./calculator-data";
import { ITFSAValue } from "../../model/tfsa-value";
export declare class TFSAData extends CalculatorData<ITFSAValue> {
    private today;
    constructor(today: number);
    generateData(value: ITFSAValue): void;
    protected copyParams(params: ITFSAValue): void;
}
