export declare enum FormulaType {
    ZERO = 0,
    ONE = 1
}
export interface Schedule {
    period: number;
    value: number;
}
export interface AmortizationSchedule extends Schedule {
    interest: number;
    principal: number;
    payment: number;
    lump?: number;
}
export interface GainSchedule extends Schedule {
    gain: number;
}
export declare class Formula {
    static amortizationSchedule(rate: number, periods: number, value: number, lump?: number, lumpPeriod?: number): AmortizationSchedule[];
    static gainSchedule(rate: number, periods: number, value: number): GainSchedule[];
    static semiAnnuallyRate(rate: number): number;
    /**
     * Calculates the cumulative interest over a range of payment periods for an investment based on constant-amount periodic payments and a constant interest rate.
     * @param rate The interest rate.
     * @param periods The number of payments to be made.
     * @param value The current value of the annuity.
     * @param start The number of the payment period to begin the cumulative calculation.
     * @param end The number of the payment period to end the cumulative calculation.
     * @param type Whether payments are due at the end (0) or beginning (1) of each period.
     */
    static CUMIPMT(rate: number, periods: number, value: number, start: number, end: number, type: FormulaType): number;
    static FV(rate: number, periods: number, payment: number, value?: number, type?: FormulaType): number;
    /**
     * Calculates the periodic payment for an annuity investment based on constant-amount periodic payments and a constant interest rate.
     * @param rate The interest rate.
     * @param periods The number of payments to be made.
     * @param present The current value of the annuity.
     * @param future The future value remaining after the final payment has been made.
     * @param type Whether payments are due at the end (0) or beginning (1) of each period.
     */
    static PMT(rate: number, periods: number, present: number, future?: number, type?: FormulaType): number;
    private static valid;
}
