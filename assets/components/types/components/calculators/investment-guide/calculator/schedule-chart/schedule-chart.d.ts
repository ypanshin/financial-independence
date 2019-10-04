import '@ionic/core';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import Chart from 'chart.js';
import { AccountType } from '../../model/account-type';
export declare class ScheduleChartComponent {
    mortgage: number[];
    tfsa: number[];
    rrsp: number[];
    nonRegistered: number[];
    loading: boolean;
    chartOptions: any;
    charts: HTMLCanvasElement;
    barChart: Chart;
    today: number;
    componentWillLoad(): void;
    componentDidRender(): void;
    updateMortgageData(data: number[], oldData: number[]): void;
    updateTFSAData(data: number[], oldData: number[]): void;
    updateRRSPData(data: number[], oldData: number[]): void;
    updateNonRegisteredData(data: number[], oldData: number[]): void;
    updateData(account: AccountType, data: number[]): void;
    updateLabels(): void;
    createDataset(type: AccountType, data: number[]): {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        fill: boolean;
    };
    render(): any;
    private showChart;
}
