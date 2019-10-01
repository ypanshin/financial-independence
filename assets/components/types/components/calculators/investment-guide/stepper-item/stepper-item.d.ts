import '@ionic/core';
import { EventEmitter } from '../../../../stencil.core';
export declare class StepperItem {
    value: number;
    step: number;
    label: string;
    max: number;
    min: number;
    constraint: any;
    stateValue: string;
    invalid: boolean;
    error: string;
    valueChange: EventEmitter;
    watch(): void;
    componentWillLoad(): void;
    handleDecrease(): void;
    handleIncrease(): void;
    handleChange(e: CustomEvent): void;
    render(): any;
    renderError(error: string): any;
}
