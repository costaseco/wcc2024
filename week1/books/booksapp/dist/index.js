"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const querystring_1 = require("querystring");
const app = (0, express_1.default)();
const port = process.env.PORT || 8088;
app.use(express_1.default.static('public'));
app.listen(port, () => {
    console.log(`express server started at http://localhost:${port}`);
});
app.get('/about', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('About');
});
app.get('/hello', (req, res) => {
    console.log(req.query);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
        <h1>Hello, World!</h1>
        <form method='POST'>
            <input type="text" name="name" />
        </form>
        `);
});
app.post('/hello', (req, res) => {
    console.log(req.body.name);
    let body = '';
    req.on('data', (data) => {
        body += data;
    });
    req.on('end', () => {
        const name = (0, querystring_1.parse)(body).name;
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h1>Hello, ${name}!</h1>
                        <form method='POST'>
                            <input type="text" name="name" />
                        </form>
                        `);
    });
});
app.use((req, res) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
});
//# sourceMappingURL=index.js.map