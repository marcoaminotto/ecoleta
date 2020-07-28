const fetch = require("node-fetch");
const key = require("./key");

const getCountries = async function () {
  return await fetch(`http://battuta.medunes.net/api/country/all/?key=${key}`, {
    method: "get",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw err;
    });
};

const getRegions = async function (country) {
  return await fetch(
    `http://battuta.medunes.net/api/region/${country}/all/?key=${key}`,
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
    `http://battuta.medunes.net/api/city/${country}/search/?region=${region}&key=${key}
  `,
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
