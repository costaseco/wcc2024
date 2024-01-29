const http = require("http")
const fs = require('fs').promises

const host = 'localhost';
const port = 8080;

const basedir = "./public"

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
      fs
      .readFile(basedir + req.url)
      .then(function(data) {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200)
        res.end(data)
      })
      .catch(function () {
        res.writeHead(404)
        res.end()
      })
      break;
  }
}

const server = http.createServer(doRequests);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
