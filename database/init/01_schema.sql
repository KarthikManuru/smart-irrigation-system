CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE,
    email VARCHAR(100),
    language VARCHAR(10) DEFAULT 'hi',   -- hi, kn, en
    role VARCHAR(20) DEFAULT 'farmer',   -- farmer, supervisor
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE soil_types (
    soil_type_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    field_capacity NUMERIC(5,2),
    wilting_point NUMERIC(5,2)
);

CREATE TABLE crops (
    crop_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    ideal_moisture_min NUMERIC(5,2),
    ideal_moisture_max NUMERIC(5,2),
    daily_water_need_mm NUMERIC(5,2)
);

CREATE TABLE fields (
    field_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    latitude NUMERIC(9,6) NOT NULL,
    longitude NUMERIC(9,6) NOT NULL,
    area_acres NUMERIC(8,2),
    soil_type_id INT REFERENCES soil_types(soil_type_id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE field_crops (
    field_crop_id SERIAL PRIMARY KEY,
    field_id INT REFERENCES fields(field_id) ON DELETE CASCADE,
    crop_id INT REFERENCES crops(crop_id),
    sowing_date DATE,
    growth_stage VARCHAR(30),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE sensors (
    sensor_id VARCHAR(50) PRIMARY KEY,
    field_id INT REFERENCES fields(field_id) ON DELETE CASCADE,
    sensor_type VARCHAR(30) DEFAULT 'soil_moisture',
    status VARCHAR(20) DEFAULT 'active',
    last_seen TIMESTAMPTZ
);

CREATE TABLE sensor_readings (
    time TIMESTAMPTZ NOT NULL,
    sensor_id VARCHAR(50) NOT NULL REFERENCES sensors(sensor_id),
    moisture NUMERIC(5,2),
    temperature NUMERIC(5,2),
    is_imputed BOOLEAN DEFAULT FALSE,
    is_outlier BOOLEAN DEFAULT FALSE
);
SELECT create_hypertable('sensor_readings', 'time');
CREATE INDEX ON sensor_readings (sensor_id, time DESC);

CREATE TABLE weather_data (
    time TIMESTAMPTZ NOT NULL,
    field_id INT NOT NULL REFERENCES fields(field_id),
    temperature NUMERIC(5,2),
    humidity NUMERIC(5,2),
    rainfall_mm NUMERIC(6,2),
    is_forecast BOOLEAN DEFAULT FALSE,
    source VARCHAR(30)
);
SELECT create_hypertable('weather_data', 'time');
CREATE INDEX ON weather_data (field_id, time DESC);