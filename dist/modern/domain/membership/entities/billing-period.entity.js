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
exports.BillingPeriod = void 0;
const uuid_1 = require("uuid");
var BillingPeriodState;
(function (BillingPeriodState) {
    BillingPeriodState["PLANNED"] = "planned";
    BillingPeriodState["ISSUED"] = "issued";
})(BillingPeriodState || (BillingPeriodState = {}));
class BillingPeriod {
    constructor(props) {
        this.id = 1;
        this.uuid = (0, uuid_1.v4)();
        this.membershipId = props.membershipId;
        this.start = props.start;
        this.end = props.end;
        this.state = BillingPeriodState.PLANNED;
    }
    static create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            return new BillingPeriod(props);
        });
    }
}
exports.BillingPeriod = BillingPeriod;
