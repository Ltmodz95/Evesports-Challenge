"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const membership_routes_1 = __importDefault(require("./modern/routes/membership.routes"));
const error_handler_middleware_1 = require("./error-handler.middleware");
// because of the javascript module, we need to use require to import the legacy routes
const legacyMembershipRoutes = require('./legacy/routes/membership.routes');
const app = (0, express_1.default)();
const port = 3099;
app.use(express_1.default.json());
app.use('/memberships', membership_routes_1.default);
app.use('/legacy/memberships', legacyMembershipRoutes);
app.use(error_handler_middleware_1.errorHandler);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
