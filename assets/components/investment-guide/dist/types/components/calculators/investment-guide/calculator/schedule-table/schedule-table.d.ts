import '@ionic/core';
import { AccountType } from '../../model/account-type';
export declare class ScheduleTableComponent {
    mortgage: number[];
    tfsa: number[];
    rrsp: number[];
    nonRegistered: number[];
    loading: boolean;
    today: number;
    render(): any;
    renderRows(): any;
    renderRow(index: number): any;
    getDataLength(type: AccountType): number;
}
