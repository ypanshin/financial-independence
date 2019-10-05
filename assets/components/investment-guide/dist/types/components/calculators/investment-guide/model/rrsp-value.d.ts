export interface IRRSPValue {
    investmentRate?: number;
    investmentHorizon?: number;
    amount?: number;
    inflationRate?: number;
    marginalTaxRate?: number;
    horizonEffectiveTaxRate?: number;
    reinvestTaxReturn?: boolean;
    rrsp?: boolean;
}
