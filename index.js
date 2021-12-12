"use strict";

const http = require("http");
const path = require("path");
const express = require("express");
const app = express();

const { port, host, storage } = require("./serverConfig.json");

const DataStorage = require(path.join(
  __dirname,
  storage.storageFolder,
  storage.dataLayer
));
const menuPath = path.join(__dirname, "landingPage.html");

const storedData = new DataStorage();
const server = http.createServer(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "htmlPages"));

app.get("/", (req, res) => res.sendFile(menuPath));

app.get("/all", (req, res) =>
  storedData.getAll().then((data) => res.render("inventory", { res: data }))
);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/getComputer", (req, res) =>
  res.render("getOneItem", {
    title: "Get one item",
    header: "Get one item",
    action: "/getComputer",
  })
);
app.post("/getComputer", (req, res) => {
  if (!req.body) res.sendStatus(500);
  const itemId = req.body.id;
  storedData
    .getOne(itemId)
    .then((item) => res.render("itemDisplay", { res: item }))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/addAnItem",(req,res)=>res.render("form",{
  title:"Add an item",
  header:"Add a new item",
  action:"/insert",
  id:{value:"",readonly:""},
  name:{value:"",readonly:""},
  type:{value:"",readonly:""},
  amount:{value:"",readonly:""},
  processor:{value:"",readonly:""},

}));
app.post("/insert",(req,res)=>{
  if(!req.body) res.sendStatus(500);
  storedData.insert(req.body).then(status=>sendStatusPage(res,status)).catch((error)=>sendErrorPage(res,error));
});
app.get("/removeAnItem", (req, res) =>
  res.render("getOneItem", {
    title: "Remove Item",
    header: "Remove this item",
    action: "/removeAnItem",
  })
);
app.post("/removeAnItem", (req, res) => {
  if (!req.body) res.sendStatus(500);
  const itemId = req.body.id;
  storedData
    .remove(itemId)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendStatusPage(res, error));
});
// Status Pages
function sendErrorPage(res, error, title = "Error", header = "Error") {
  sendStatusPage(res, error, title, header);
}
function sendStatusPage(res, status, title = "status", header = "status") {
  return res.render("statusPage", { title, header, status });
}
server.listen(port, host, () => console.log(`${host}:${port} serving...`));
