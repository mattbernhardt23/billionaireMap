const axios = require("axios");
const rateLimit = require("axios-rate-limit");
const { response } = require("express");
const dotenv = require("dotenv").config();
const utf8 = require("utf8");
const apiKey = process.env.GOOGLE_API_KEY;

const rateLimitFunction = rateLimit(axios.create(), {
  maxRequests: 4,
  perMilliseconds: 1000,
  maxRPS: 4,
});

async function getLocation(city, country) {
  let cit = city.replace(" ", "+");
  cit = utf8.encode(cit);
  let count = country.replace(" ", "+");
  count = utf8.encode(count);
  const address = `${cit},+${count}`;

  console.log("address", address);
  try {
    const data = await rateLimitFunction
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
      )
      .then(function (response) {
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        return {
          lat: lat,
          lng: lng,
        };
      });

    return data;
  } catch (e) {
    console.log(e);
  }
}

async function getLocationForAll(allData) {
  const mappedData = await Promise.all(
    allData.map(async (data) => {
      try {
        if (data.hasOwnProperty("city") === true) {
          const geoLocation = await getLocation(data.city, data.country);
          console.log("geoLocation", geoLocation);
          data.geoLocation = geoLocation;
          return data;
        } else {
          const geoLocation = await getLocation("", data.country);
          console.log(geoLocation);
          data.geoLocation = geoLocation;
          return data;
        }
      } catch (e) {
        console.log(e, data);
      }
    })
  );

  return mappedData;
}

module.exports = { getLocation, getLocationForAll };
