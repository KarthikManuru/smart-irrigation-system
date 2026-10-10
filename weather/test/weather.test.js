const assert = require("node:assert/strict");
const http = require("node:http");
const test = require("node:test");

const app = require("../Server");

async function withEnvironment(values, callback) {
  const previous = new Map();
  for (const [key, value] of Object.entries(values)) {
    previous.set(key, process.env[key]);
    if (value === null) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  try {
    await callback();
  } finally {
    for (const [key, value] of previous) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

async function request(path, providerFetch) {
  const originalFetch = global.fetch;
  global.fetch = providerFetch || (() => {
    throw new Error("Unexpected provider request");
  });

  const server = app.listen(0);
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });

  try {
    const { port } = server.address();
    return await new Promise((resolve, reject) => {
      http
        .get({ host: "127.0.0.1", port, path }, (response) => {
          let body = "";
          response.setEncoding("utf8");
          response.on("data", (chunk) => {
            body += chunk;
          });
          response.on("end", () => {
            resolve({ status: response.statusCode, body: JSON.parse(body) });
          });
        })
        .on("error", reject);
    });
  } finally {
    global.fetch = originalFetch;
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

function jsonResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

test("rejects missing, malformed, empty, and out-of-range coordinates", async () => {
  for (const path of [
    "/api/weather",
    "/api/weather?lat=16.5",
    "/api/weather/tomorrow?lon=81.5",
    "/api/weather?lat=&lon=81",
    "/api/weather?lat=north&lon=81",
    "/api/weather?lat=90.01&lon=81",
    "/api/weather?lat=-90.01&lon=81",
    "/api/weather?lat=16&lon=180.01",
    "/api/weather/tomorrow?lat=16&lon=-180.01",
  ]) {
    const response = await request(path);
    assert.equal(response.status, 400, path);
    assert.equal(response.body.code, "invalid_coordinates");
  }
});

test("normalizes a successful OpenWeatherMap response", async () => {
  await withEnvironment({ OPENWEATHERMAP_API_KEY: "test-openweather-key" }, async () => {
    let requestedUrl;
    const response = await request(
      "/api/weather?lat=16.5449&lon=81.5212",
      async (url, options) => {
        requestedUrl = new URL(url);
        assert.ok(options.signal);
        return jsonResponse({
          coord: { lat: 16.5449, lon: 81.5212 },
          main: { temp: 29.4, humidity: 68 },
          rain: { "1h": 1.2 },
          weather: [{ id: 500, description: "light rain" }],
          dt: 1700000000,
        });
      },
    );

    assert.equal(response.status, 200);
    assert.equal(requestedUrl.searchParams.get("appid"), "test-openweather-key");
    assert.deepEqual(response.body, {
      provider: "OpenWeatherMap",
      latitude: 16.5449,
      longitude: 81.5212,
      temperatureC: 29.4,
      humidityPercent: 68,
      precipitation: {
        value: 1.2,
        unit: "mm",
        measurement: "accumulation",
        periodHours: 1,
      },
      condition: "light rain",
      weatherCode: 500,
      observedAt: "2023-11-14T22:13:20.000Z",
    });
  });
});

test("normalizes a successful Tomorrow.io response", async () => {
  await withEnvironment({ TOMORROW_API_KEY: "test-tomorrow-key" }, async () => {
    const response = await request(
      "/api/weather/tomorrow?lat=16.5449&lon=81.5212",
      async (url) => {
        const requestedUrl = new URL(url);
        assert.equal(requestedUrl.searchParams.get("apikey"), "test-tomorrow-key");
        assert.equal(requestedUrl.searchParams.get("location"), "16.5449,81.5212");
        return jsonResponse({
          data: {
            time: "2024-01-02T03:04:05Z",
            values: {
              temperature: 28.1,
              humidity: 72,
              rainIntensity: 0.25,
              weatherCode: 1000,
            },
          },
          location: { lat: 16.5449, lon: 81.5212 },
        });
      },
    );

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
      provider: "Tomorrow.io",
      latitude: 16.5449,
      longitude: 81.5212,
      temperatureC: 28.1,
      humidityPercent: 72,
      precipitation: {
        value: 0.25,
        unit: "mm/hour",
        measurement: "intensity",
        periodHours: null,
      },
      condition: null,
      weatherCode: 1000,
      observedAt: "2024-01-02T03:04:05.000Z",
    });
  });
});

test("reports missing provider keys without making a request", async () => {
  await withEnvironment(
    { OPENWEATHERMAP_API_KEY: null, TOMORROW_API_KEY: null },
    async () => {
      for (const path of [
        "/api/weather?lat=16&lon=81",
        "/api/weather/tomorrow?lat=16&lon=81",
      ]) {
        const response = await request(path);
        assert.equal(response.status, 503);
        assert.equal(response.body.code, "missing_api_key");
      }
    },
  );
});

test("classifies unauthorized and rate-limited provider responses", async () => {
  await withEnvironment(
    { OPENWEATHERMAP_API_KEY: "test-key", TOMORROW_API_KEY: "test-key" },
    async () => {
      for (const [path, status, code] of [
        ["/api/weather?lat=16&lon=81", 401, "provider_authentication_failed"],
        ["/api/weather/tomorrow?lat=16&lon=81", 429, "provider_rate_limited"],
      ]) {
        const response = await request(path, async () => jsonResponse({}, status));
        assert.equal(response.status, 502);
        assert.equal(response.body.code, code);
        assert.equal(JSON.stringify(response.body).includes("test-key"), false);
      }
    },
  );
});

test("maps timeouts and network failures to sanitized errors", async () => {
  await withEnvironment({ OPENWEATHERMAP_API_KEY: "test-key" }, async () => {
    const timeout = await request(
      "/api/weather?lat=16&lon=81",
      async () => {
        throw Object.assign(new Error("request contained test-key"), {
          name: "TimeoutError",
        });
      },
    );
    assert.equal(timeout.status, 504);
    assert.equal(timeout.body.code, "provider_timeout");
    assert.equal(JSON.stringify(timeout.body).includes("test-key"), false);

    const networkFailure = await request(
      "/api/weather?lat=16&lon=81",
      async () => {
        throw new Error("network failure with test-key");
      },
    );
    assert.equal(networkFailure.status, 502);
    assert.equal(networkFailure.body.code, "provider_unavailable");
    assert.equal(JSON.stringify(networkFailure.body).includes("test-key"), false);
  });
});

test("uses null for unavailable provider values", async () => {
  await withEnvironment(
    { OPENWEATHERMAP_API_KEY: "test-key", TOMORROW_API_KEY: "test-key" },
    async () => {
      const openWeather = await request(
        "/api/weather?lat=16&lon=81",
        async () => jsonResponse({}),
      );
      assert.equal(openWeather.status, 200);
      assert.equal(openWeather.body.temperatureC, null);
      assert.equal(openWeather.body.humidityPercent, null);
      assert.equal(openWeather.body.precipitation.value, null);
      assert.equal(openWeather.body.condition, null);
      assert.equal(openWeather.body.weatherCode, null);
      assert.equal(openWeather.body.observedAt, null);

      const tomorrow = await request(
        "/api/weather/tomorrow?lat=16&lon=81",
        async () => jsonResponse({ data: { values: {} } }),
      );
      assert.equal(tomorrow.status, 200);
      assert.equal(tomorrow.body.temperatureC, null);
      assert.equal(tomorrow.body.humidityPercent, null);
      assert.equal(tomorrow.body.precipitation.value, null);
      assert.equal(tomorrow.body.weatherCode, null);
      assert.equal(tomorrow.body.observedAt, null);
    },
  );
});