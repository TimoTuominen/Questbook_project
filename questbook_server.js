const express = require("express");
const fs = require("fs");
const app = express();
var path = require("path");
app.use("/static", express.static("static"));

try {
  const data = fs.readFileSync(`${__dirname}/questdata.json`, "utf8");
  const guestdata = JSON.parse(data);
  console.log(data);
} catch (err) {
  console.error(err);
}

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

app.get("/guestbook", (req, res) => {
  res.status(200).sendFile(__dirname + "/guestbook.html");
});

app.get("/newmessage", (req, res) => {
  res.status(200).sendFile(__dirname + "/newmessage.html");
});

app.get("/ajaxmessage", (req, res) => {
  res.status(200).sendFile(__dirname + "/ajaxmessage.html");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is running!");
});
