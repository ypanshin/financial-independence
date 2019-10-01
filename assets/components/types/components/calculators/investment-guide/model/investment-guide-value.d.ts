import { IGeneralFormValue, GeneralFormValueKey } from '../general-form/model/general-form-value';
import { IMortgageFormValue, MortgageFormValueKey } from '../mortgage-form/model/mortgage-form-value';
import { IAccountsFormValue } from '../accounts-form/model/accounts-form-value';
import { IRRSPValue } from './rrsp-value';
export interface IInvestmentGuideValue extends IGeneralFormValue, IMortgageFormValue, IAccountsFormValue, IRRSPValue {
    /**
     * The amount to invest
     */
    amount?: number;
    /**
     * The flag to reinvest tax return when contributing to RRSP.
     */
    reinvestTaxReturn?: boolean;
}
export declare enum InvestmentGuideValueKey {
    amount = "amount",
    reinvestTaxReturn = "reinvestTaxReturn"
}
export declare const InvestmentGuideValueLabel: {
    [InvestmentGuideValueKey.amount]: string;
    [GeneralFormValueKey.investmentHorizon]: string;
    [GeneralFormValueKey.marginalTaxRate]: string;
    [GeneralFormValueKey.horizonMarginalTaxRate]: string;
    [GeneralFormValueKey.horizonEffectiveTaxRate]: string;
    [GeneralFormValueKey.inflationRate]: string;
    [MortgageFormValueKey.mortgageRate]: string;
    [MortgageFormValueKey.mortgageBalance]: string;
    [MortgageFormValueKey.mortgageAmortization]: string;
    [GeneralFormValueKey.investmentRate]: string;
    [InvestmentGuideValueKey.reinvestTaxReturn]: string;
};
