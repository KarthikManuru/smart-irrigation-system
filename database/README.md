# Database Setup

## Run
```bash
docker compose up -d
```

## Connection
- Host: localhost
- Port: 5432
- Database: irrigation_db
- User: irrigation_user
- Password: irrigation_pass
- URL: `postgresql://irrigation_user:irrigation_pass@localhost:5432/irrigation_db`

## Reset database (deletes all data)
```bash
docker compose down -v && docker compose up -d
```

## Tables
- users, soil_types, crops, fields, field_crops, sensors (relational)
- sensor_readings, weather_data (TimescaleDB hypertables)

## Test data
Sensor `SENSOR_001` belongs to Test Field 1 (field_id = 1).
