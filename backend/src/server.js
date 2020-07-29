const express = require("express");
const cors = require("cors");
const nunjucks = require("nunjucks");
const db = require("./database/db");
const apiBattuta = require("./service/api_battuta");

const server = express();
server.use(cors());

const frontendPath = "/Users/marcoechevestre/Documents/ecoletas/frontend/src";

nunjucks.configure(frontendPath + "/pages", {
  express: server,
  noCache: true,
});

server.use(express.static(frontendPath));

server.get("/", (req, res) => {
  const countries = apiBattuta.getCountries();
  countries.then((countries) => {
    //const totalContries = countries.length;
    return res.render("main.html", { countries });
  });
});

server.get("/create-point", (req, res) => {
  const countries = apiBattuta.getCountries();
  countries.then((countries) => {
    //const totalContries = countries.length;
    return res.render("create-point.html", { countries });
  });
});

server.get("/create-point/:countryCode", (req, res) => {
  const regions = apiBattuta.getRegions(req.params.countryCode);
  regions.then((regions) => {
    res.json(regions);
  });
});

server.get("/create-point/:countryCode/:region", (req, res) => {
  const cities = apiBattuta.getCities(
    req.params.countryCode,
    req.params.region
  );
  cities.then((cities) => {
    res.json(cities);
  });
});

server.get("/search", (req, res) => {
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    }

    const total = rows.length;
    return res.render("search-point.html", { places: rows, total });
  });
});

server.listen(3100);
