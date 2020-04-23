const { addCommas } = require("../str-utils");

// for measuring in nanoseconds using process.hrtime.bigInt()
class Bench {
    static formatMsToSec(ms, decimals = 2) {
        return addCommas((ms / 1000).toFixed(decimals));
    }
    constructor() {
        this.cumT = 0n;
    }
    markBegin() {
        this.startT = process.hrtime.bigint();
    }
    markEnd() {
        this.cumT += process.hrtime.bigint() - this.startT;
    }
    get ns() {
        return this.cumT;
    }
    get ms() {
        return Number(this.cumT) / (1000 * 1000);
    }
    get sec() {
        return Number(this.cumT) / (1000 * 1000 * 1000);
    }
    formatMs(decimals = 20) {
        return `${addCommas(this.ms.toFixed(decimals))} ms`;
    }
    formatSec(decimals = 20) {
        return `${addCommas(this.sec.toFixed(decimals))} sec`;
    }
}

module.exports = { Bench };
