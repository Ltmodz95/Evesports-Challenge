"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Billing = exports.BillingInterval = void 0;
var BillingInterval;
(function (BillingInterval) {
    BillingInterval["WEEKLY"] = "weekly";
    BillingInterval["MONTHLY"] = "monthly";
    BillingInterval["YEARLY"] = "yearly";
})(BillingInterval || (exports.BillingInterval = BillingInterval = {}));
class Billing {
    constructor(interval, periods) {
        this.interval = interval;
        this.periods = periods;
    }
    static create(interval, periods) {
        if (!Object.values(BillingInterval).includes(interval)) {
            throw new Error('Invalid billing interval provided.');
        }
        if (interval === BillingInterval.MONTHLY) {
            if (periods < 6 || periods > 12) {
                throw new Error(`billingPeriods${periods > 12 ? 'MoreThan12Months' : 'LessThan6Months'}`);
            }
        }
        else if (interval === BillingInterval.YEARLY) {
            if (periods < 3 || periods > 10) {
                throw new Error(`billingPeriods${periods > 10 ? 'MoreThan10Years' : 'LessThan3Years'}`);
            }
        }
        return new Billing(interval, periods);
    }
}
exports.Billing = Billing;
