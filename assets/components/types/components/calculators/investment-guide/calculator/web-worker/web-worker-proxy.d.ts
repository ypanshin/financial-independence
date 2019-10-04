import { WebWorker } from "./web-worker";
export declare class WebWorkerProxy extends WebWorker {
    private worker;
    onMessage: (data: any) => void;
    constructor(publicPath: string);
    postMessage(message: any): void;
}
