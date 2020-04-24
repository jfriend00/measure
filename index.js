const { addCommas } = require("../str-utils");

// for measuring in nanoseconds using process.hrtime.bigInt()
class Bench {
    static formatMsToSec(ms, decimals = 2) {
        return addCommas((ms / 1000).toFixed(decimals));
    }
    static formatNsToMs(ns, decimals = 2) {
        return addCommas((Number(ns) / (1000 * 1000)).toFixed(decimals));
    }
    static formatNsToSec(ns, decimals = 2) {
        return addCommas((Number(ns) / (1000 * 1000 * 1000)).toFixed(decimals));
    }
    constructor(startTime) {
        this.cumT = 0n;
        if (startTime) {
            this.startT = startTime;
        }
    }
    setCumTime(t) {
        this.cumT = BitInt(t);
        return this;
    }
    markBegin() {
        this.startT = process.hrtime.bigint();
        return this;
    }
    markEnd() {
        this.cumT += process.hrtime.bigint() - this.startT;
        return this;
    }
    get ns() {
        return this.cumT;
    }
    get nsN() {
        return Number(this.cumT);
    }
    get ms() {
        return Number(this.cumT) / (1000 * 1000);
    }
    get sec() {
        return Number(this.cumT) / (1000 * 1000 * 1000);
    }
    formatNs(decimals = 100) {
        return `${addCommas(this.nsN)} ns`;
    }
    formatMs(decimals = 20) {
        return `${addCommas(this.ms.toFixed(decimals))} ms`;
    }
    formatSec(decimals = 20) {
        return `${addCommas(this.sec.toFixed(decimals))} sec`;
    }
}

module.exports = { Bench };
