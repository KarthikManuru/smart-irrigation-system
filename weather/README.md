# Weather API Integration

## Overview
This module integrates OpenWeatherMap and Tomorrow.io to retrieve current weather data for the Smart Irrigation System. It provides weather information based on latitude and longitude through REST API endpoints.

## Features
- Fetch current weather data from OpenWeatherMap.
- Fetch real-time weather data from Tomorrow.io.
- Retrieve temperature, humidity, and precipitation information.
- Validate latitude and longitude.
- Handle API errors and request timeouts.
- Keep API keys in environment variables.

## Technology Stack
- Node.js
- Express.js
- OpenWeatherMap API
- Tomorrow.io API
- dotenv

## Project Structure
```text
weather/
├── .env                 # Private API keys (not committed)
├── .gitignore
├── package.json
├── server.js
├── weatherRoutes.js
├── weatherService.js
└── README.md
```

## Setup Instructions

### 1. Install dependencies
Open a terminal in the `weather` directory and run:

```bash
npm install
```

### 2. Configure environment variables
Create a `.env` file in the `weather` directory:

```dotenv
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
TOMORROW_API_KEY=your_tomorrow_io_api_key
PORT=4001
```

Replace the placeholders with your API keys. Never commit the `.env` file to GitHub.

### 3. Start the server

```bash
npm start
```

The server runs at:

`http://localhost:4001`

## API Endpoints

### Health Check
```http
GET /health
```

Example URL:

`http://localhost:4001/health`

### OpenWeatherMap
```http
GET /api/weather?lat=16.5449&lon=81.5212
```

### Tomorrow.io
```http
GET /api/weather/tomorrow?lat=16.5449&lon=81.5212
```

Replace the latitude and longitude with the coordinates of the required location.

## Response Fields
Both weather endpoints provide normalized fields where supported:

| Field | Description |
|---|---|
| `provider` | Weather data provider |
| `latitude` | Location latitude |
| `longitude` | Location longitude |
| `temperatureC` | Temperature in Celsius |
| `humidityPercent` | Relative humidity percentage |
| `precipitationMm` | Provider-specific precipitation measurement |
| `condition` or `weatherCode` | Weather condition information |
| `observedAt` | Observation timestamp |

**Note:** OpenWeatherMap's available rainfall field may represent accumulated rainfall, while Tomorrow.io's `rainIntensity` represents a rate in millimeters per hour. These measurements are not interchangeable.

## Error Handling
- HTTP 400: Invalid latitude or longitude.
- HTTP 502: Weather provider request failed.
- API key errors are reported when a required key is missing or rejected.
- Requests use a timeout to avoid waiting indefinitely.

## Security
- Store API keys in `.env`.
- Keep `.env` and `node_modules/` excluded using `.gitignore`.
- Never hard-code or publish API keys.

## Testing
1. Start the server using `npm start`.
2. Verify the health endpoint.
3. Test both weather endpoints with valid coordinates.
4. Test invalid coordinates and confirm an HTTP 400 response.
5. Verify error handling for provider failures.

## Status
OpenWeatherMap and Tomorrow.io integrations have been tested successfully with sample live API responses. Additional error-handling and integration tests should be completed before declaring the module fully tested.