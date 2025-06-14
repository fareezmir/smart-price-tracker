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
const promises_1 = __importDefault(require("fs/promises"));
const PORT = 8000;
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.json({ message: "Hello World" });
});
app.get('/api/scrape', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield promises_1.default.readFile(('../mock-product.json'), 'utf-8');
    const dataObj = JSON.parse(data);
    res.json(dataObj);
}));
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
