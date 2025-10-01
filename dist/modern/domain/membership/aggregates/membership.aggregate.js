"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Membership = void 0;
const uuid_1 = require("uuid");
const billing_vo_1 = require("../value-objects/billing.vo");
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "cash";
    PaymentMethod["CREDIT_CARD"] = "credit card";
})(PaymentMethod || (PaymentMethod = {}));
class Membership {
    constructor(props) {
        this.uuid = (0, uuid_1.v4)();
        this.id = props.id || 0; // will be set by the repository defaulting to 0
        this.name = props.name;
        this.recurringPrice = props.recurringPrice;
        this.paymentMethod = props.paymentMethod;
        this.validFrom = props.validFrom ? new Date(props.validFrom) : new Date();
        this.billingInterval = props.billingInterval;
        this.billingPeriods = props.billingPeriods;
        this.userId = props.userId || 2000;
        // Calculate validUntil based on billingInterval and billingPeriods
        this.validUntil = this.calculateValidUntil();
    }
    static create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            billing_vo_1.Billing.create(props.billingInterval, props.billingPeriods); // w
            const membership = new Membership(props);
            membership.validate();
            return membership;
        });
    }
    validate() {
        if (this.name.length === 0) {
            throw new Error('missingMandatoryFields');
        }
        if (this.recurringPrice < 0) {
            throw new Error('negativeRecurringPrice');
        }
        if (this.paymentMethod === PaymentMethod.CASH && this.recurringPrice > 100) {
            throw new Error('cashPriceBelow100');
        }
    }
    calculateValidUntil() {
        const validUntil = new Date(this.validFrom);
        if (this.billingInterval === 'monthly') {
            validUntil.setMonth(this.validFrom.getMonth() + this.billingPeriods);
        }
        else if (this.billingInterval === 'yearly') {
            validUntil.setMonth(this.validFrom.getMonth() + this.billingPeriods * 12);
        }
        else if (this.billingInterval === 'weekly') {
            validUntil.setDate(this.validFrom.getDate() + this.billingPeriods * 7);
        }
        return validUntil;
    }
}
exports.Membership = Membership;
