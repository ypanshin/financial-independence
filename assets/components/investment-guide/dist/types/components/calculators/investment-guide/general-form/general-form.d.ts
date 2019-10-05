import '@ionic/core';
import { EventEmitter } from '../../../../stencil.core';
import { IGeneralFormValue, GeneralFormValueKey } from './model/general-form-value';
export declare class GeneralForm {
    /**
    * The form value
    */
    value: IGeneralFormValue;
    valueChanged: EventEmitter;
    errors: {
        [key: string]: number;
    };
    handlePercentValueChange(key: GeneralFormValueKey, e: CustomEvent): void;
    handleNumberValueChange(key: GeneralFormValueKey, e: CustomEvent): void;
    isValid(value: number, key: GeneralFormValueKey): boolean;
    percent(key: GeneralFormValueKey): string;
    render(): any;
    renderError(key: GeneralFormValueKey): any;
}
