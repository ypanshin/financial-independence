export class Utils {
    static currency(amount) {
        return amount ? `$${amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}` : '';
    }
}
