const http = require("http")

const host = 'localhost';
const port = 8080;

function doRequests(req, res) {
  console.log(req.method + ": "+ req.url)

  switch (req.url) {
    case "/hello":
      const page = "<HTML><BODY>Hello, World! from the server</BODY></HTML>"
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200)
      res.end(page)
      break;
  
    default:
      res.writeHead(404)
      res.end()
      break;
  }
}

const server = http.createServer(doRequests);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
