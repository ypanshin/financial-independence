import '@ionic/core';
import { EventEmitter } from '../../../../stencil.core';
import Chart from 'chart.js';
import { TFSAData } from './model/tfsa-data';
import { RRSPData } from './model/rrsp-data';
import { NonRegisteredData } from './model/non-registered-data';
import { MortgageData } from './model/mortgage-data';
import { AccountType } from '../model/account-type';
import { CalculatorData } from './model/calculator-data';
import { IInvestmentGuideValue, InvestmentGuideValueKey } from '../model/investment-guide-value';
import { GeneralFormValueKey } from '../general-form/model/general-form-value';
import { MortgageFormValueKey } from '../mortgage-form/model/mortgage-form-value';
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
    valueChange: EventEmitter;
    configClick: EventEmitter;
    mortgageData: MortgageData;
    tfsaData: TFSAData;
    rrspData: RRSPData;
    nonRegisteredData: NonRegisteredData;
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
    chartOptions: Chart.ChartConfiguration;
    data: IInvestmentGuideValue;
    errors: {
        [key: string]: number;
    };
    graphLabels: string[];
    charts: HTMLCanvasElement;
    barChart: Chart;
    today: number;
    dataWatchHandler(newValue: IInvestmentGuideValue): void;
    componentDidLoad(): void;
    componentDidRender(): void;
    private processData;
    processGraphData(): void;
    createDataset(type: AccountType, data: number[]): {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        fill: boolean;
    };
    isValid(value: number, key: ValueKey): boolean;
    handleAmountChange(e: CustomEvent): void;
    handleStepperPercentChange(key: InvestmentGuideValueKey, e: CustomEvent): void;
    handleStepperChange(key: InvestmentGuideValueKey, e: CustomEvent): void;
    handleReinvestTaxReturnChange(e: CustomEvent): void;
    percent(key: ValueKey): number;
    presentAlertCheckbox(): Promise<void>;
    currency(amount: number): string;
    render(): any;
    renderCalculator(): any;
    renderRRSPReinvestTaxReturnItem(): any[];
    renderFutureValue(data: CalculatorData<any>): any;
    renderMortgageItem(show: boolean): any;
    renderTFSAItem(show: boolean): any;
    renderRRSPItem(show: boolean): any;
    renderNonRegisteredItem(show: boolean): any;
    renderPercentStepper(label: string, key: ValueKey, step: number, min: number, max: number): any;
    renderNumberStepper(label: string, key: ValueKey, step: number, min: number, max: number): any;
    renderError(key: ValueKey): any;
    showChart(): "inherit" | "hidden";
}
export {};
