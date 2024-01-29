const http = require("http")
const fs = require('fs').promises
const { parse } = require('querystring');

const host = 'localhost';
const port = 8000;

const basedir = "./public"

function doRequests(req, res) {
  console.log(req.method + ": "+ req.url)

  switch (req.url) {
    case "/hello":
      if( req.method == "GET" ) {
        const page = `
          <HTML>
            <BODY>Hello, World! from the server</BODY>
          </HTML>
        `
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200)
        res.end(page)
        break;
      } else if( req.method == "POST") {
        let body = ""
        req.on('data', chunk => { body = body + chunk })
        req.on('end', () => {
          let formData = parse(body)
          const page = `
            <HTML>
              <BODY>
                Hello, ${formData["name"]}! through a POST HTTP request
              </BODY>
            </HTML>
          `
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200)
          res.end(page)
        })
        break;
      }
  
    case "/":
      fs.readFile(basedir + "/index.html")
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

    default:
      fs.readFile(basedir + req.url)
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
