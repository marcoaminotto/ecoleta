const express = require("express");
const cors = require("cors");
const nunjucks = require("nunjucks");

const routes = require("./routes");
const frontendPath = "/Users/marcoechevestre/Documents/ecoletas/frontend/src";
const server = express();

nunjucks.configure(frontendPath + "/pages", {
  express: server,
  noCache: true,
});

server.use(cors());
server.use(express.static(frontendPath));
server.use(routes);

server.listen(3100);
