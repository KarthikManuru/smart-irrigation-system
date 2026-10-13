const express = require("express");

const {
  getOpenWeatherMapWeather,
  getTomorrowWeather,
} = require("./weatherService");

const router = express.Router();

function parseCoordinates(query) {
  const parseValue = (value) =>
    typeof value === "string" && value.trim() !== ""
      ? Number(value)
      : Number.NaN;
  const lat = parseValue(query.lat);
  const lon = parseValue(query.lon);

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    lat < -90 ||
    lat > 90 ||
    lon < -180 ||
    lon > 180
  ) {
    return null;
  }

  return { lat, lon };
}

async function handleWeatherRequest(req, res, getWeather) {
  const coordinates = parseCoordinates(req.query);
  if (!coordinates) {
    return res.status(400).json({
      error: "Valid latitude and longitude are required.",
      code: "invalid_coordinates",
    });
  }

  try {
    const weather = await getWeather(coordinates.lat, coordinates.lon);
    return res.json(weather);
  } catch (error) {
    return res.status(error.statusCode || 502).json({
      error: error.publicMessage || "Unable to retrieve weather data.",
      code: error.code || "provider_error",
    });
  }
}

router.get("/", (req, res) =>
  handleWeatherRequest(req, res, getOpenWeatherMapWeather),
);

router.get("/tomorrow", (req, res) =>
  handleWeatherRequest(req, res, getTomorrowWeather),
);

module.exports = router;
