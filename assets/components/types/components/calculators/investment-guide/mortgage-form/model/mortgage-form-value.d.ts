import { IMortgageValue } from "../../model/mortgage-value";
export interface IMortgageFormValue extends IMortgageValue {
    /**
     * The mortgage rate.
     */
    mortgageRate?: number;
    /**
     * The mortgage rate.
     */
    mortgageBalance?: number;
    /**
     * The mortgage amortization in years.
     */
    mortgageAmortization?: number;
    /**
     * The flag enables mortgage account.
     */
    mortgage?: boolean;
}
export declare enum MortgageFormValueKey {
    mortgageRate = "mortgageRate",
    mortgageBalance = "mortgageBalance",
    mortgageAmortization = "mortgageAmortization",
    mortgage = "mortgage"
}
