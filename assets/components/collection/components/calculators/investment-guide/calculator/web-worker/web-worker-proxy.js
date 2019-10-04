import { WebWorker } from "./web-worker";
export class WebWorkerProxy extends WebWorker {
    constructor(publicPath) {
        super(publicPath);
        // this.worker = new Worker(`${this.assetsPath}/calculator.web-worker.js`);
        this.worker = new Worker(`${this.assetsPath}/investment-guide-web-worker.js`);
        this.worker.onmessage = (event) => this.onMessage(event.data);
    }
    postMessage(message) {
        this.worker.postMessage(message);
    }
}
