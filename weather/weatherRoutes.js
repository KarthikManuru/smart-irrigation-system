const express = require("express");

const {
  getOpenWeatherMapWeather,
  getTomorrowWeather,
} = require("./weatherService");

const router = express.Router();

router.get("/", async (req, res) => {
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);

  if (
    req.query.lat === undefined ||
    req.query.lon === undefined ||
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    lat < -90 ||
    lat > 90 ||
    lon < -180 ||
    lon > 180
  ) {
    return res.status(400).json({
      error: "Valid latitude and longitude are required.",
    });
  }

  try {
    const weather = await getOpenWeatherMapWeather(lat, lon);
    return res.json(weather);
  } catch (error) {
    console.error("Weather API error:", error.message);

    return res.status(502).json({
      error: "Unable to retrieve weather data.",
      details: error.message,
    });
  }
});

router.get("/tomorrow", async (req, res) => {
  const lat = Number(req.query.lat);
  const lon = Number(req.query.lon);

  if (
    req.query.lat === undefined ||
    req.query.lon === undefined ||
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    lat < -90 ||
    lat > 90 ||
    lon < -180 ||
    lon > 180
  ) {
    return res.status(400).json({
      error: "Valid latitude and longitude are required.",
    });
  }

  try {
    const weather = await getTomorrowWeather(lat, lon);
    return res.json(weather);
  } catch (error) {
    console.error("Tomorrow.io error:", error.message);

    return res.status(502).json({
      error: "Unable to retrieve Tomorrow.io weather data.",
      details: error.message,
    });
  }
});

module.exports = router;
