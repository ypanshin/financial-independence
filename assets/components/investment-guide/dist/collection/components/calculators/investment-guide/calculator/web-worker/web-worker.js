export class WebWorker {
    constructor(publicPath) {
        if (publicPath === '/build/') {
            this.assetsPath = 'assets';
        }
        else {
            this.assetsPath = publicPath + '../collection/assets';
        }
    }
}
