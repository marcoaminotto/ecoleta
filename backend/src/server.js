const express = require("express");
const nunjucks = require("nunjucks");
const server = express();

const frontendPath = "/Users/marcoechevestre/Documents/ecoletas/frontend/src";

nunjucks.configure(frontendPath + "/pages", {
  express: server, 
  noCache: true
});

server.use(express.static(frontendPath));


server.get("/", (req, res) => {
  return res.render("main.html");
});
 
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

server.get("/search", (req, res) => {
  return res.render("search-point.html");
});

server.listen(3100);