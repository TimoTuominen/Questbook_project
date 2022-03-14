const express = require("express");
const fs = require("fs");
const app = express();
var path = require("path");
app.use("/static", express.static("static"));

const replaceTemplate = (temp, guestdata) => {
  let output = temp.replace("{%Id%}", guestdata.id);
  output = output.replace("{%User%}", guestdata.username);
  output = output.replace("{%Country%}", guestdata.country);
  output = output.replace("{%Date%}", guestdata.date);
  output = output.replace("{%Message%}", guestdata.message);
  return output;
};

const guestinfo = fs.readFileSync(`${__dirname}/guestinfo.html`, "utf8");
const guestbook = fs.readFileSync(`${__dirname}/guestbook.html`, "utf8");

const data = fs.readFileSync(`${__dirname}/questdata.json`, "utf8");
let guestdata = JSON.parse(data);
let guesthtml = guestdata.map((el) => replaceTemplate(guestinfo, el)).join("");
const output = guestbook.replace("%guesttemplate%", guesthtml);

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

app.get("/guestbook", (req, res) => {
  res.end(output);
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
