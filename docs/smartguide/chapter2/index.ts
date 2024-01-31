import http, {IncomingMessage, ServerResponse} from 'http'
const host = 'localhost';
const port = 8080;

function doRequests(req:IncomingMessage, res:ServerResponse) {
    const page = `
        <HTML><BODY>Hello, World! from the server</BODY></HTML>
        `
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200)
    res.end(page)
}

const server = http.createServer(doRequests);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
