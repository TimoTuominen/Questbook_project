var http = require("http");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function (request, response) {
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello hello... sivu1");
  }

  if (request.url === "/guestbook") {
    fs.readFile(`${__dirname}/questdata.json`, "utf-8", (err, data) => {
      const vieraskirja = JSON.parse(data);
      console.log(vieraskirja);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(data);
    });
  }
  if (request.url === "/newmessage") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello hello... sivu3");
  }
  if (request.url === "/ajaxmessage") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello hello... sivu4");
  }
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log("Server is running at http://localhost:%d", port);
