import { GeneralFormValueKey } from '../general-form/model/general-form-value';
import { MortgageFormValueKey } from '../mortgage-form/model/mortgage-form-value';
export var InvestmentGuideValueKey;
(function (InvestmentGuideValueKey) {
    InvestmentGuideValueKey["amount"] = "amount";
    InvestmentGuideValueKey["reinvestTaxReturn"] = "reinvestTaxReturn";
})(InvestmentGuideValueKey || (InvestmentGuideValueKey = {}));
export const InvestmentGuideValueLabel = {
    [InvestmentGuideValueKey.amount]: 'Amount',
    [GeneralFormValueKey.investmentHorizon]: 'Investment Horizon',
    [GeneralFormValueKey.marginalTaxRate]: 'Marginal Tax Rate',
    [GeneralFormValueKey.horizonMarginalTaxRate]: 'Horizon Marginal Tax Rate',
    [GeneralFormValueKey.horizonEffectiveTaxRate]: 'Horizon Effective Tax Rate',
    [GeneralFormValueKey.inflationRate]: 'Inflation Rate',
    [MortgageFormValueKey.mortgageRate]: 'Mortgage Rate',
    [MortgageFormValueKey.mortgageBalance]: 'Mortgage Balance',
    [MortgageFormValueKey.mortgageAmortization]: 'Mortgage Amortization',
    [GeneralFormValueKey.investmentRate]: 'Investment Rate',
    [InvestmentGuideValueKey.reinvestTaxReturn]: 'Reinvest Tax Return',
};
