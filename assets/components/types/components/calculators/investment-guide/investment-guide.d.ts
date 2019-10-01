import '@ionic/core';
import { EventEmitter } from '../../../stencil.core';
import { Mode } from './model/mode';
import { IInvestmentGuideValue } from './model/investment-guide-value';
export declare class InvestmentGuide {
    /**
     * The amount to invest
     */
    value: IInvestmentGuideValue;
    valueChange: EventEmitter;
    data: IInvestmentGuideValue;
    mode: Mode;
    componentWillLoad(): void;
    invalidForm(): boolean;
    handleValueChange(e: CustomEvent): void;
    handleCalculateClick(): void;
    handleConfigClick(): void;
    render(): any;
    renderCalculator(mode: Mode): any;
    renderWizard(mode: Mode): any;
    renderMortgageForm(show: boolean): any;
    renderRRSPForm(show: boolean): any;
}
