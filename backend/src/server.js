const express = require("express");
const server = express();

const frontendPath = "/Users/marcoechevestre/Documents/ecoletas/frontend/src";

server.use(express.static(frontendPath));

server.get("/", (req, res) => {
  res.sendFile(frontendPath + "/pages/Main/index.html");
});

server.listen(3000);