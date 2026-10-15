# smart-irrigation-system

## Data Cleaning and Normalization

### Objective
Implement data cleaning and normalization routines to handle missing sensor readings and API downtime gracefully.

### Data Cleaning
- Validate sensor readings against acceptable ranges.
- Handle invalid values and missing numerical readings using median imputation.
- Replace missing categorical values with `Unknown`.
- Maintain flags to track imputed values.
- Check for duplicate records.

### Data Normalization
Selected numerical features are scaled to the range 0 to 1 using MinMaxScaler.

### API Downtime Handling
- Use simulated API responses to test weather-data retrieval.
- Use cached weather data when the API is unavailable and the cache is fresh.
- Reject cached data older than 30 minutes.
- Return unavailable values when the cache has expired.

### Generated Files
- `data/cleaned_irrigation_data.csv`
- `data/normalized_irrigation_data.csv`
- `data/sensor_missing_values_test.csv`
- `data/api_downtime_test.csv`

### Test Results
- Cleaned dataset: 500 rows and 28 columns.
- Missing values after cleaning: 0.
- Duplicate rows: 0.
- Normalized feature range: 0 to 1.
- Expired-cache test: Passed.

### Limitations
The dataset contains farm-level records, not confirmed continuous sensor time-series data. Missing readings and API downtime were simulated. Live weather API integration has not yet been tested.

### Run the Script
From the project root, run:

`python scripts/clean_irrigation_data.py`
