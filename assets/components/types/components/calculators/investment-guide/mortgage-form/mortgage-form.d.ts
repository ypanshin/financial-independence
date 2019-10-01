import '@ionic/core';
import { EventEmitter } from '../../../../stencil.core';
import { IMortgageFormValue, MortgageFormValueKey } from './model/mortgage-form-value';
export declare class MortgageForm {
    /**
    * The form value
    */
    value: IMortgageFormValue;
    valueChanged: EventEmitter;
    errors: {
        [key: string]: number;
    };
    handlePercentValueChange(key: MortgageFormValueKey, e: CustomEvent): void;
    handleNumberValueChange(key: MortgageFormValueKey, e: CustomEvent): void;
    isValid(value: number, key: MortgageFormValueKey): boolean;
    percent(key: MortgageFormValueKey): string;
    render(): any;
    renderError(key: MortgageFormValueKey): any;
}
