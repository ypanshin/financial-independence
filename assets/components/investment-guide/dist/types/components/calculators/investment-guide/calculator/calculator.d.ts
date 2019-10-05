import '@ionic/core';
import { EventEmitter } from '../../../../stencil.core';
import { IInvestmentGuideValue, InvestmentGuideValueKey } from '../model/investment-guide-value';
import { GeneralFormValueKey } from '../general-form/model/general-form-value';
import { MortgageFormValueKey } from '../mortgage-form/model/mortgage-form-value';
import { WebWorkerProxy } from './web-worker/web-worker-proxy';
import { ICalculatorData, CalculatorResult } from 'budgific-web-workers';
declare const ValueKey: {
    mortgageRate: MortgageFormValueKey.mortgageRate;
    mortgageBalance: MortgageFormValueKey.mortgageBalance;
    mortgageAmortization: MortgageFormValueKey.mortgageAmortization;
    mortgage: MortgageFormValueKey.mortgage;
    amount: InvestmentGuideValueKey.amount;
    reinvestTaxReturn: InvestmentGuideValueKey.reinvestTaxReturn;
    marginalTaxRate: GeneralFormValueKey.marginalTaxRate;
    investmentHorizon: GeneralFormValueKey.investmentHorizon;
    horizonMarginalTaxRate: GeneralFormValueKey.horizonMarginalTaxRate;
    horizonEffectiveTaxRate: GeneralFormValueKey.horizonEffectiveTaxRate;
    inflationRate: GeneralFormValueKey.inflationRate;
    investmentRate: GeneralFormValueKey.investmentRate;
};
declare type ValueKey = (typeof ValueKey)[keyof typeof ValueKey];
export declare class Calculator {
    /**
     * The value
     */
    value: IInvestmentGuideValue;
    private publicPath;
    valueChange: EventEmitter;
    configClick: EventEmitter;
    options: {
        [ValueKey.investmentHorizon]: boolean;
        [ValueKey.investmentRate]: boolean;
        [ValueKey.horizonMarginalTaxRate]: boolean;
        [ValueKey.horizonEffectiveTaxRate]: boolean;
        [ValueKey.marginalTaxRate]: boolean;
        [ValueKey.inflationRate]: boolean;
        [ValueKey.mortgageRate]: boolean;
        [ValueKey.reinvestTaxReturn]: boolean;
    };
    rrspFutureValue: number;
    tfsaFutureValue: number;
    mortgageFutureValue: number;
    nonRegisteredFutureValue: number;
    rrspData: ICalculatorData;
    tfsaData: ICalculatorData;
    mortgageData: ICalculatorData;
    nonRegisteredData: ICalculatorData;
    data: IInvestmentGuideValue;
    errors: {
        [key: string]: number;
    };
    loading: boolean;
    today: number;
    workerProxy: WebWorkerProxy;
    dataWatchHandler(newValue: IInvestmentGuideValue): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    processData(data: CalculatorResult): void;
    isValid(value: number, key: ValueKey): boolean;
    handleAmountChange(e: CustomEvent): void;
    handleStepperPercentChange(key: InvestmentGuideValueKey, e: CustomEvent): void;
    handleStepperChange(key: InvestmentGuideValueKey, e: CustomEvent): void;
    handleReinvestTaxReturnChange(e: CustomEvent): void;
    percent(key: ValueKey): number;
    presentAlertCheckbox(): Promise<void>;
    render(): any;
    renderCalculator(): any;
    renderRRSPReinvestTaxReturnItem(): any[];
    renderFutureValue(value: number): any;
    renderMortgageItem(show: boolean): any;
    renderTFSAItem(show: boolean): any;
    renderRRSPItem(show: boolean): any;
    renderNonRegisteredItem(show: boolean): any;
    renderPercentStepper(label: string, key: ValueKey, step: number, min: number, max: number): any;
    renderNumberStepper(label: string, key: ValueKey, step: number, min: number, max: number): any;
    renderError(key: ValueKey): any;
}
export {};
