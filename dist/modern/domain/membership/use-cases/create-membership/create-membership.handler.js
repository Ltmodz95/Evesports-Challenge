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
exports.CreateMembershipHandler = void 0;
const membership_aggregate_1 = require("../../aggregates/membership.aggregate");
class CreateMembershipHandler {
    constructor(membershipRepo) {
        this.membershipRepo = membershipRepo;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const membership = yield membership_aggregate_1.Membership.create(command);
            yield this.membershipRepo.save(membership);
            return membership;
        });
    }
}
exports.CreateMembershipHandler = CreateMembershipHandler;
