# Weather API

The weather module is an Express service that retrieves current conditions from OpenWeatherMap or Tomorrow.io using server-side API requests. It validates coordinates, applies an 8-second provider timeout, and normalizes both provider responses. It does not write data to the project's shared database.

## Project Structure

```text
weather/
├── .env                 # Local credentials and port; never commit
├── .gitignore
├── package.json
├── package-lock.json
├── Server.js            # Express application and health endpoint
├── weatherRoutes.js     # Routes and coordinate validation
├── weatherService.js    # Provider requests and response normalization
└── test/
		└── weather.test.js  # Mocked provider tests
```

## Prerequisites and Setup

Use Node.js 18 or newer. From the repository root:

```bash
cd weather
npm install
```

Create `weather/.env` with your own provider credentials:

```dotenv
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
TOMORROW_API_KEY=your_tomorrow_io_api_key
PORT=4001
```

The keys are optional at startup, but the corresponding provider route returns `503` if its key is missing. The default port is `4001`.

## Run

From the `weather/` directory:

```bash
npm start
```

The server starts at `http://localhost:4001` by default. API requests to both weather providers are made by the server; credentials are not sent to clients.

## Endpoints

### Health

```http
GET /health
```

Example: `http://localhost:4001/health`

```json
{
	"status": "ok",
	"service": "weather-api"
}
```

### OpenWeatherMap

```http
GET /api/weather?lat=16.5449&lon=81.5212
```

Example response (provider values are illustrative):

```json
{
	"provider": "OpenWeatherMap",
	"latitude": 16.5449,
	"longitude": 81.5212,
	"temperatureC": 29.4,
	"humidityPercent": 68,
	"precipitation": {
		"value": 1.2,
		"unit": "mm",
		"measurement": "accumulation",
		"periodHours": 1
	},
	"condition": "light rain",
	"weatherCode": 500,
	"observedAt": "2023-11-14T22:13:20.000Z"
}
```

OpenWeatherMap's `rain.1h` or `rain.3h` fields are rainfall accumulation over the indicated period. The response uses `rain.1h` when available, otherwise `rain.3h`; `periodHours` identifies which period was returned. If neither field is available, `value` and `periodHours` are `null`.

### Tomorrow.io

```http
GET /api/weather/tomorrow?lat=16.5449&lon=81.5212
```

Example response (provider values are illustrative):

```json
{
	"provider": "Tomorrow.io",
	"latitude": 16.5449,
	"longitude": 81.5212,
	"temperatureC": 28.1,
	"humidityPercent": 72,
	"precipitation": {
		"value": 0.25,
		"unit": "mm/hour",
		"measurement": "intensity",
		"periodHours": null
	},
	"condition": null,
	"weatherCode": 1000,
	"observedAt": "2024-01-02T03:04:05.000Z"
}
```

Tomorrow.io's `rainIntensity` is a rate in millimeters per hour. It is not the same measurement as OpenWeatherMap's accumulated rainfall in millimeters. Do not compare or combine these values as though they were equivalent.

## Response Fields

Both provider endpoints return `provider`, `latitude`, `longitude`, `temperatureC`, `humidityPercent`, `precipitation`, `condition`, `weatherCode`, and `observedAt`.

| Field | Meaning |
|---|---|
| `provider` | Provider name. |
| `latitude`, `longitude` | Provider location coordinates, falling back to the validated request coordinates when omitted by the provider. |
| `temperatureC` | Temperature in degrees Celsius. |
| `humidityPercent` | Relative humidity in percent. |
| `precipitation.value` | Provider precipitation value, or `null` when unavailable. |
| `precipitation.unit` | `mm` for OpenWeatherMap accumulation, `mm/hour` for Tomorrow.io intensity. |
| `precipitation.measurement` | `accumulation` or `intensity`, respectively. |
| `precipitation.periodHours` | OpenWeatherMap accumulation period (1 or 3), otherwise `null`. |
| `condition` | OpenWeatherMap condition description; `null` when the provider supplies no description. |
| `weatherCode` | Provider weather code when available; otherwise `null`. |
| `observedAt` | Observation timestamp in ISO 8601 UTC format; `null` when unavailable or invalid. |

Unavailable provider measurements are represented as `null`; the service does not substitute estimated weather values.

## Validation and Errors

Latitude and longitude must both be non-empty numeric query parameters. Latitude must be between `-90` and `90`; longitude must be between `-180` and `180`, inclusive.

| HTTP status | Meaning |
|---|---|
| `400` | Missing or invalid coordinates (`invalid_coordinates`). |
| `502` | Provider rejected credentials, rate limited the request, returned an error, invalid data, or could not be reached. The JSON `code` distinguishes these cases. |
| `503` | The selected provider's API key is not configured (`missing_api_key`). |
| `504` | Provider request timed out (`provider_timeout`). |

Errors contain a safe message and machine-readable `code`; provider response bodies, credentials, and raw network errors are not returned.

For example, invalid coordinates return:

```json
{
	"error": "Valid latitude and longitude are required.",
	"code": "invalid_coordinates"
}
```

## Automated Tests

From the `weather/` directory:

```bash
npm test
```

Tests use Node's built-in test runner and mock provider requests; they do not need live API access or real credentials.

## Security

Keep provider keys in `weather/.env`. The weather `.gitignore` excludes both `.env` and `node_modules/`; never commit credentials or copy them into code, logs, documentation, or test fixtures. The API keys are only used in server-side provider requests.
