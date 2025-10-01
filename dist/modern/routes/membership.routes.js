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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_membership_handler_1 = require("../domain/membership/use-cases/create-membership/create-membership.handler");
const json_membership_repository_1 = require("../infra/json-membership.repository");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    throw new Error('not implemented');
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createMembershipHandler = new create_membership_handler_1.CreateMembershipHandler(new json_membership_repository_1.JsonMembershipRepository());
    try {
        const membership = yield createMembershipHandler.execute(req.body);
        res.status(201).json({ membership });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
exports.default = router;
