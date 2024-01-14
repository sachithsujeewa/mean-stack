"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const employee_routes_1 = require("./employee.routes");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
dotenv.config();
const { ATLAS_URI } = process.env;
(0, database_1.connectToDatabase)(ATLAS_URI || "mongodb://localhost:27017").then(() => {
    app.use((0, cors_1.default)({
        origin: "https://mean-frontend-g5w2db6nj-sachithsujeewa.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }));
    app.use("/employees", employee_routes_1.employeeRouter);
    app.get('/', (_req, res) => {
        return res.send('Express Typescript on Vercel');
    });
    app.get('/ping', (_req, res) => {
        return res.send('pong 🏓');
    });
    app.listen(port, () => {
        return console.log(`Server is listening on ${port}`);
    });
});
//# sourceMappingURL=index.js.map