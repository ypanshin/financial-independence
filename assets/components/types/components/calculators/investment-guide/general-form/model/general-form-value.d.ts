export interface IGeneralFormValue {
    /**
     * The current marginal tax rate
     */
    marginalTaxRate?: number;
    /**
     * The investment horizon in years
     */
    investmentHorizon?: number;
    /**
     * The horizon marginal tax rate
     */
    horizonMarginalTaxRate?: number;
    /**
     * The horizon effective tax rate
     */
    horizonEffectiveTaxRate?: number;
    /**
     * The inflation rate
     */
    inflationRate?: number;
    /**
     * The investment rate
     */
    investmentRate?: number;
}
export declare enum GeneralFormValueKey {
    marginalTaxRate = "marginalTaxRate",
    investmentHorizon = "investmentHorizon",
    horizonMarginalTaxRate = "horizonMarginalTaxRate",
    horizonEffectiveTaxRate = "horizonEffectiveTaxRate",
    inflationRate = "inflationRate",
    investmentRate = "investmentRate"
}
