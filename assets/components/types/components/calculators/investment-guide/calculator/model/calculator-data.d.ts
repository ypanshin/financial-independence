import { Schedule } from "../../../../../formula/formula";
export declare abstract class CalculatorData<T> {
    chartData: number[];
    futureValue: number;
    protected params: T;
    protected yearlyReduce<T extends Schedule>(today: number, data: T[], amount: number, getValue: (item: T, i: number) => number): number[];
    protected yearlyReduce1<T extends Schedule>(today: number, data: T[], getValue: (item: T, i: number) => number): number[];
    protected shouldRegenerate(params: T): boolean;
    protected abstract copyParams(params: T): void;
    abstract generateData(params: T): void;
}
