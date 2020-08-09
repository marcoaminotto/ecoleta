const fetch = require("node-fetch");
require("dotenv").config();

const getCountries = async function () {
  return await fetch(
    `http://battuta.medunes.net/api/country/all/?key=${process.env.BATTUTA_KEY}`,
    { method: "get" }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};

const getRegions = async function (country) {
  return await fetch(
    `http://battuta.medunes.net/api/region/${country}/all/?key=${process.env.BATTUTA_KEY}`,
    { method: "get" }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};

const getCities = async function (country, region) {
  return await fetch(
    `http://battuta.medunes.net/api/city/${country}/search/?region=${region}&key=${process.env.BATTUTA_KEY}`,
    { method: "get" }
  )
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  getCountries: getCountries,
  getRegions: getRegions,
  getCities: getCities,
};
