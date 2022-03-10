var http = require("http");
var server = http.createServer(function (request, response) {
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello hello... sivu1");
  }

  if (request.url === "/own2") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello hello... sivu2");
  }
});

var port = process.env.PORT || 3000;
server.listen(port);
console.log("Server is running at http://localhost:%d", port);
