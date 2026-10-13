const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const REQUEST_TIMEOUT_MS = 8000;

class WeatherServiceError extends Error {
  constructor(code, publicMessage, statusCode) {
    super(publicMessage);
    this.code = code;
    this.publicMessage = publicMessage;
    this.statusCode = statusCode;
  }
}

function finiteNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function isoTimestamp(value) {
  if (value === null || value === undefined) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

async function requestJson(url, provider) {
  let response;
  try {
    response = await fetch(url, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    if (error.name === "TimeoutError" || error.name === "AbortError") {
      throw new WeatherServiceError(
        "provider_timeout",
        `${provider} request timed out.`,
        504,
      );
    }

    throw new WeatherServiceError(
      "provider_unavailable",
      `${provider} is unavailable.`,
      502,
    );
  }

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new WeatherServiceError(
        "provider_authentication_failed",
        `${provider} rejected the configured credentials.`,
        502,
      );
    }

    if (response.status === 429) {
      throw new WeatherServiceError(
        "provider_rate_limited",
        `${provider} rate limit was reached.`,
        502,
      );
    }

    throw new WeatherServiceError(
      "provider_error",
      `${provider} returned an unsuccessful response.`,
      502,
    );
  }

  try {
    return await response.json();
  } catch {
    throw new WeatherServiceError(
      "provider_invalid_response",
      `${provider} returned invalid weather data.`,
      502,
    );
  }
}

function openWeatherPrecipitation(rain) {
  if (rain && finiteNumber(rain["1h"]) !== null) {
    return {
      value: finiteNumber(rain["1h"]),
      unit: "mm",
      measurement: "accumulation",
      periodHours: 1,
    };
  }

  if (rain && finiteNumber(rain["3h"]) !== null) {
    return {
      value: finiteNumber(rain["3h"]),
      unit: "mm",
      measurement: "accumulation",
      periodHours: 3,
    };
  }

  return {
    value: null,
    unit: "mm",
    measurement: "accumulation",
    periodHours: null,
  };
}

async function getOpenWeatherMapWeather(lat, lon) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!apiKey) {
    throw new WeatherServiceError(
      "missing_api_key",
      "OpenWeatherMap API key is not configured.",
      503,
    );
  }

  const url = new URL(BASE_URL);
  url.search = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    appid: apiKey,
    units: "metric",
  }).toString();

  const data = await requestJson(url, "OpenWeatherMap");
  const condition = data.weather?.[0];

  return {
    provider: "OpenWeatherMap",
    latitude: finiteNumber(data.coord?.lat) ?? lat,
    longitude: finiteNumber(data.coord?.lon) ?? lon,
    temperatureC: finiteNumber(data.main?.temp),
    humidityPercent: finiteNumber(data.main?.humidity),
    precipitation: openWeatherPrecipitation(data.rain),
    condition: typeof condition?.description === "string" ? condition.description : null,
    weatherCode: finiteNumber(condition?.id),
    observedAt: isoTimestamp(
      finiteNumber(data.dt) === null ? null : data.dt * 1000,
    ),
  };
}

async function getTomorrowWeather(lat, lon) {
  const apiKey = process.env.TOMORROW_API_KEY;

  if (!apiKey) {
    throw new WeatherServiceError(
      "missing_api_key",
      "Tomorrow.io API key is not configured.",
      503,
    );
  }

  const url = new URL("https://api.tomorrow.io/v4/weather/realtime");

  url.search = new URLSearchParams({
    location: `${lat},${lon}`,
    units: "metric",
    apikey: apiKey,
  }).toString();

  const data = await requestJson(url, "Tomorrow.io");
  const values = data.data?.values ?? {};
  const rainIntensity = finiteNumber(values.rainIntensity);

  return {
    provider: "Tomorrow.io",
    latitude: finiteNumber(data.location?.lat) ?? lat,
    longitude: finiteNumber(data.location?.lon) ?? lon,
    temperatureC: finiteNumber(values.temperature),
    humidityPercent: finiteNumber(values.humidity),
    precipitation: {
      value: rainIntensity,
      unit: "mm/hour",
      measurement: "intensity",
      periodHours: null,
    },
    condition: null,
    weatherCode: finiteNumber(values.weatherCode),
    observedAt: isoTimestamp(data.data?.time),
  };
}

module.exports = {
  getOpenWeatherMapWeather,
  getTomorrowWeather,
};
