const express = require("express");
const fs = require("fs");
const app = express();
//var path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("static"));

const replaceTemplate = (temp, guestdata) => {
  let output = temp.replace("{%Id%}", guestdata.id);
  output = output.replace("{%User%}", guestdata.username);
  output = output.replace("{%Country%}", guestdata.country);
  output = output.replace("{%Date%}", guestdata.date);
  output = output.replace("{%Message%}", guestdata.message);
  return output;
};

//let d = new Date(year, month, day);

var utc = new Date().toJSON().slice(0, 10).replace(/-/g, "/");

const guestinfo = fs.readFileSync(`${__dirname}/guestinfo.html`, "utf8");
const guestbook = fs.readFileSync(`${__dirname}/guestbook.html`, "utf8");

const data = fs.readFileSync(`${__dirname}/questdata.json`, "utf8");
let guestdata = JSON.parse(data);
let guesthtml = guestdata.map((el) => replaceTemplate(guestinfo, el)).join("");
const output = guestbook.replace("%guesttemplate%", guesthtml);
let guestlenght = guestdata.length;

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

app.get("/guestbook", (req, res) => {
  res.end(output);
});

app.get("/newmessage", (req, res) => {
  res.status(200).sendFile(__dirname + "/newmessage.html");
});

app.post("/newmessage", (req, res) => {
  let guestdata2 = {
    id: guestlenght + 1,
    username: req.body.name,
    country: req.body.country,
    date: utc,
    message: req.body.message
  };
  console.log(guestdata2);
  //let data1 = JSON.parse(guestdata2);
  //console.log(data1);
  guestdata.push(guestdata2);
  let newData = JSON.stringify(guestdata, null, 2);
  fs.writeFile("questdata.json", newData, (err) => {
    // error checking
    if (err) throw err;

    console.log("New data added");
  });

  //res.status(200).sendFile(__dirname + "/newmessage.html");
});

app.get("/ajaxmessage", (req, res) => {
  res.status(200).sendFile(__dirname + "/ajaxmessage.html");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is running!");
});
