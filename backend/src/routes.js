const express = require("express");

const db = require("./database/db");
const apiBattuta = require("./service/api_battuta");

let router = express.Router();

router.get("/", (req, res) => {
  const countries = apiBattuta.getCountries();
  countries.then((countries) => {
    return res.render("main.html", { countries });
  });
});

router.get("/create-point", (req, res) => {
  const countries = apiBattuta.getCountries();
  countries.then((countries) => {
    return res.render("create-point.html", { countries });
  });
});

router.get("/search", (req, res) => {
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    }

    const total = rows.length;
    return res.render("search-point.html", {
      places: rows,
      total,
    });
  });
});

router.get("/location/:countryCode", (req, res) => {
  const regions = apiBattuta.getRegions(req.params.countryCode);
  regions.then((regions) => {
    res.json(regions);
  });
});

router.get("/location/:countryCode/:region", (req, res) => {
  const cities = apiBattuta.getCities(
    req.params.countryCode,
    req.params.region
  );
  cities.then((cities) => {
    res.json(cities);
  });
});

module.exports = router;
