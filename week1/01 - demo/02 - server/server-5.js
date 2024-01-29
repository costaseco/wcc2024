const http = require("http")
const fs = require('fs').promises;
const { parse } = require('querystring');


const host = 'localhost';
const port = 8080;

const books = [
  { 
    id: 1,
    title: 'Ubik', 
    authors: ['Philip K. Dick'],
    image: 'https://covers.openlibrary.org/b/id/9251896-L.jpg'
  },
  { 
    id: 2,
    title: 'Do Androids Dream of Electric Sheep?', 
    authors: ['Philip K. Dick'],
    image: 'https://covers.openlibrary.org/b/id/11153217-L.jpg'
  },
  { 
    id: 3,
    title: 'The Man in the High Castle', 
    authors: ['Philip K. Dick'],
    image: 'https://covers.openlibrary.org/b/id/10045188-L.jpg'
  },
  { 
    id: 4,
    title: 'The Minority Report', 
    authors: ['Philip K. Dick'],
    image: 'https://covers.openlibrary.org/b/id/911202-L.jpg'
  }
]

const basedir = "./public"

function fetchBooks() {

}

function fetchOneBook(id) {

}

const requestListener = function (req, res) {

    console.log("URL " + req.url)    
    console.log("Method " + req.method)    

    switch (req.url) {

      case "/hello":
        // Respond to requests on URL /hello
        if (req.method == "GET") {
          const page = `
          <HTML>
            <BODY>Hello, World! from the server</BODY>
          </HTML>
        `
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200)
          res.end(page)
          break;
        } else if (req.method == "POST") {
          let body = ""
          req.on('data', chunk => { body = body + chunk })
          req.on('end', () => {
            let formData = parse(body)
            const page = `
            <HTML>
              <BODY>
                Hello, ${formData["name"]}! through a POST  HTTP request
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
      case "":
        // To read and return the contents of file "index.html" (it's a convention)
        fs
        .readFile(basedir + "/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end("Error, did not find the index file.");
            return;
        });
        break

      case "/books":
        // The URL "/books" is treated differently for GET and POST methods
        if( req.method == "GET" ) {
          // Returns the list of books
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.writeHead(200);
          res.end(JSON.stringify(books));
          break
        } else if (req.method == "POST") {
          // Adds a book to the collection
          let body = ""
          req.on('data', chunk => { body += chunk })
          req.on('end', () => {
            const book = JSON.parse(body)
            if ( book.title && book.authors && book.image ) {
              books.push(book)
              res.writeHead(200)
              res.end()
            } else {
              res.writeHead(400);
              res.end("Bad request.");
            }
          })
        }
        break

      default:
        // Any other file is loaded directly from the filesystem
        fs.readFile(basedir + req.url)
        .then(contents => {
          // If the file is found and read, 
          // the return code is 200 and the content is returned as the body of the request
          res.setHeader("Content-Type", "text/html");
          res.writeHead(200);
          res.end(contents);
        })
        .catch(err => {
          // If the file is not found the return code is 404 (error) 
          console.log("Not Found.")
          res.writeHead(404);
          res.end("Not Found");
          return;
        });
        break
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


