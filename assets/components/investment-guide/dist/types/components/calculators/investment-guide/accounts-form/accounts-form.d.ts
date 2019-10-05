import '@ionic/core';
import { EventEmitter } from '../../../../stencil.core';
import { IAccountsFormValue, AccountsFormValueKey } from './model/accounts-form-value';
export declare class AccountsForm {
    /**
     * Check mortgage account
     */
    value: IAccountsFormValue;
    valueChanged: EventEmitter;
    error: string;
    handleChange(e: CustomEvent): void;
    render(): any;
    renderAccounts(): unknown[];
    renderAccountItem(key: AccountsFormValueKey): any;
    renderError(error: string): any;
}
