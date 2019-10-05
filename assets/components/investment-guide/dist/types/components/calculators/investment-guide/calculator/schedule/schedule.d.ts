import '@ionic/core';
import { ICalculatorData } from 'budgific-web-workers';
declare enum Segment {
    table = "table",
    graph = "graph"
}
export declare class Schedule {
    mortgage: ICalculatorData;
    tfsa: ICalculatorData;
    rrsp: ICalculatorData;
    nonRegistered: ICalculatorData;
    loading: boolean;
    segment: Segment;
    handleSegmentChange(e: CustomEvent): void;
    render(): any;
    renderTable(show: boolean): any;
}
export {};
