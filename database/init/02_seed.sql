INSERT INTO soil_types (name, field_capacity, wilting_point) VALUES
('sandy', 15.00, 6.00),
('loam', 28.00, 14.00),
('clay', 40.00, 22.00),
('black_cotton', 45.00, 25.00);

INSERT INTO crops (name, ideal_moisture_min, ideal_moisture_max, daily_water_need_mm) VALUES
('rice', 35.00, 50.00, 8.00),
('wheat', 25.00, 40.00, 4.50),
('maize', 25.00, 40.00, 5.50),
('cotton', 25.00, 40.00, 6.00),
('tomato', 30.00, 45.00, 5.00),
('groundnut', 20.00, 35.00, 5.00),
('sugarcane', 30.00, 45.00, 7.00);

-- Test data so teammates can start immediately
INSERT INTO users (name, phone, language, role) VALUES
('Test Farmer', '9999999999', 'kn', 'farmer');

INSERT INTO fields (user_id, name, latitude, longitude, area_acres, soil_type_id) VALUES
(1, 'Test Field 1', 16.506200, 80.648000, 2.50, 2);

INSERT INTO field_crops (field_id, crop_id, sowing_date, growth_stage) VALUES
(1, 1, CURRENT_DATE - 20, 'vegetative');

INSERT INTO sensors (sensor_id, field_id) VALUES
('SENSOR_001', 1);