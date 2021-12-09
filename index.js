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

const storedData = new DataStorage();
const server = http.createServer(app);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "htmlPages"));
const menuPath = path.join(__dirname, "landingPage.html");

app.get("/", (req, res) => res.sendFile(menuPath));

app.get("/all", (req, res) =>
  storedData.getAll().then((data) => res.render("inventory", { res: data }))
);

server.listen(port, host, () => console.log(`${host}:${port} serving...`));
