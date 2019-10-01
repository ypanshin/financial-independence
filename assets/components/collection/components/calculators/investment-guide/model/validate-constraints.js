import { InvestmentGuideValueKey } from "./investment-guide-value";
import { GeneralFormValueKey } from "../general-form/model/general-form-value";
import { MortgageFormValueKey } from "../mortgage-form/model/mortgage-form-value";
import { AccountsFormValueKey } from "../accounts-form/model/accounts-form-value";
import validate from "validate.js";
validate.validators.accounts = (_value, _options, _key, attributes) => {
    const mortgageUnChecked = attributes && attributes.mortgage !== undefined && !attributes.mortgage;
    const nonRegisteredUnChecked = attributes && attributes.nonRegistered !== undefined && !attributes.nonRegistered;
    const rrspUnChecked = attributes && attributes.rrsp !== undefined && !attributes.rrsp;
    const tfsaUnChecked = attributes && attributes.tfsa !== undefined && !attributes.tfsa;
    return mortgageUnChecked &&
        nonRegisteredUnChecked &&
        rrspUnChecked &&
        tfsaUnChecked ? 'At least one account should be selected.' : undefined;
};
export const getInvestmentGuideValueConstraints = (presence = true) => ({
    [InvestmentGuideValueKey.amount]: {
        presence: presence ? { allowEmpty: false } : undefined,
        numericality: {
            greaterThan: 0,
        },
    },
    [GeneralFormValueKey.investmentHorizon]: {
        presence: presence ? { allowEmpty: false } : undefined,
        numericality: {
            onlyInteger: true,
            greaterThan: 0,
            lessThan: 100,
        },
    },
    [GeneralFormValueKey.marginalTaxRate]: {
        presence: presence ? { allowEmpty: false } : undefined,
        numericality: {
            greaterThan: 0,
            lessThan: 60,
        },
    },
    [GeneralFormValueKey.horizonMarginalTaxRate]: {
        presence: presence ? { allowEmpty: false } : undefined,
        numericality: {
            greaterThan: 0,
            lessThan: 60,
        },
    },
    [GeneralFormValueKey.horizonEffectiveTaxRate]: {
        presence: presence ? { allowEmpty: false } : undefined,
        numericality: {
            greaterThan: 0,
            lessThan: 60,
        },
    },
    [GeneralFormValueKey.inflationRate]: {
        presence: presence ? { allowEmpty: false } : undefined,
        numericality: {
            greaterThan: 0,
            lessThan: 60,
        },
    },
    [MortgageFormValueKey.mortgageRate]: {
        presence: presence ? { allowEmpty: false } : undefined,
        numericality: {
            greaterThan: 0,
            lessThan: 50,
        },
    },
    [MortgageFormValueKey.mortgageBalance]: {
        presence: presence ? { allowEmpty: false } : undefined,
        numericality: {
            greaterThan: 0,
        },
    },
    [MortgageFormValueKey.mortgageAmortization]: {
        presence: presence ? { allowEmpty: false } : undefined,
        numericality: {
            onlyInteger: true,
            greaterThan: 0,
            lessThan: 35,
        },
    },
    [GeneralFormValueKey.investmentRate]: {
        presence: presence ? { allowEmpty: false } : undefined,
        numericality: {
            greaterThan: 0,
            lessThan: 50,
        },
    },
    [AccountsFormValueKey.mortgage]: {
        accounts: {}
    },
    [AccountsFormValueKey.nonRegistered]: {
        accounts: {}
    },
    [AccountsFormValueKey.rrsp]: {
        accounts: {}
    },
    [AccountsFormValueKey.tfsa]: {
        accounts: {}
    },
});
