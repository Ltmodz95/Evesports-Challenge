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
exports.JsonMembershipRepository = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const memberships = require('../../data/memberships.json');
const DB_PATH = path_1.default.join(__dirname, '../../data/memberships.json');
class JsonMembershipRepository {
    constructor() {
        this.memberships = {};
        this.readData();
    }
    save(membership) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readData();
            const id = Object.keys(this.memberships).length + 1;
            // Set the ID on the membership object using type assertion
            // This is necessary because id is readonly, but we need to set it during persistence
            membership.id = id;
            this.memberships[id] = membership;
            this.writeData();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readData();
            return this.memberships[id] || null;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readData();
            return Object.values(this.memberships);
        });
    }
    writeData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield promises_1.default.mkdir(path_1.default.dirname(DB_PATH), { recursive: true });
            yield promises_1.default.writeFile(DB_PATH, JSON.stringify(this.memberships, null, 2));
        });
    }
    readData() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield promises_1.default.readFile(DB_PATH, 'utf8');
            for (const membership of JSON.parse(data)) {
                this.memberships[membership.id] = membership;
            }
        });
    }
}
exports.JsonMembershipRepository = JsonMembershipRepository;
