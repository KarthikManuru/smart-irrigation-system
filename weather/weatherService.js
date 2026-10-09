const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

async function getOpenWeatherMapWeather(lat, lon) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!apiKey) {
    throw new Error("OpenWeatherMap API key is missing in .env");
  }

  const url = new URL(BASE_URL);
  url.search = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    appid: apiKey,
    units: "metric",
  }).toString();

  const response = await fetch(url, {
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`OpenWeatherMap returned HTTP ${response.status}`);
  }

  const data = await response.json();

  return {
    provider: "OpenWeatherMap",
    latitude: data.coord?.lat ?? lat,
    longitude: data.coord?.lon ?? lon,
    temperatureC: data.main?.temp ?? null,
    humidityPercent: data.main?.humidity ?? null,
    precipitationMm: data.rain?.["1h"] ?? null,
    condition: data.weather?.[0]?.description ?? null,
    observedAt: data.dt
      ? new Date(data.dt * 1000).toISOString()
      : null,
  };
}

async function getTomorrowWeather(lat, lon) {
  const apiKey = process.env.TOMORROW_API_KEY;

  if (!apiKey) {
    throw new Error("Tomorrow.io API key is missing in .env");
  }

  const url = new URL("https://api.tomorrow.io/v4/weather/realtime");

  url.search = new URLSearchParams({
    location: `${lat},${lon}`,
    units: "metric",
    apikey: apiKey,
  }).toString();

  const response = await fetch(url, {
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Tomorrow.io returned HTTP ${response.status}`);
  }

  const data = await response.json();
  const values = data.data?.values ?? {};

  return {
    provider: "Tomorrow.io",
    latitude: data.location?.lat ?? lat,
    longitude: data.location?.lon ?? lon,
    temperatureC: values.temperature ?? null,
    humidityPercent: values.humidity ?? null,
    precipitationMm: values.rainIntensity ?? null,
    precipitationType: "rain intensity, mm/hour",
    weatherCode: values.weatherCode ?? null,
    observedAt: data.data?.time ?? null,
  };
}

module.exports = {
  getOpenWeatherMapWeather,
  getTomorrowWeather,
};

