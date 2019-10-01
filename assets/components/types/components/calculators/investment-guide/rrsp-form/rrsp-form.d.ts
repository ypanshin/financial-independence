import '@ionic/core';
import { EventEmitter } from '../../../../stencil.core';
export declare class RRSPForm {
    /**
     * The reinvest tax return
     */
    reinvestTaxReturn: boolean;
    reinvestTaxReturnChange: EventEmitter;
    handleChange(e: CustomEvent): void;
    render(): any;
}
