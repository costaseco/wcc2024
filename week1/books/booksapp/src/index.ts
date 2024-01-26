import express from 'express';
import { parse } from 'querystring';

const app = express()
const port = process.env.PORT || 8088;

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`express server started at http://localhost:${port}`);
});

app.get('/about', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('About');
})

app.get('/hello', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`
        <h1>Hello, World!</h1>
        <form method='POST'>
            <input type="text" name="name" />
        </form>
        `);
})

app.post('/hello', (req, res) => {
    let body = ''
    req.on('data', (data) => {
        body += data
    })
    req.on('end', () => {
        const name = parse(body).name
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h1>Hello, ${name}!</h1>
                        <form method='POST'>
                            <input type="text" name="name" />
                        </form>
                        `);
    })
})

app.use((req, res) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
})

