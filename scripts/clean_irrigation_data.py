
import pandas as pd
import numpy as np
from pathlib import Path
from datetime import datetime, timedelta

# -------------------------------
# 1. Load the original dataset
# -------------------------------
INPUT = Path.home() / "Downloads" / "Smart_Farming_Crop_Yield_2024.csv"
OUTPUT = Path.home() / "Documents" / "irrigation_cleaning_output"
OUTPUT.mkdir(parents=True, exist_ok=True)

df = pd.read_csv(INPUT)
print("Original dataset shape:", df.shape)
print("\nMissing values before cleaning:\n", df.isnull().sum())

# Keep original data unchanged
original = df.copy()

# -------------------------------
# 2. Convert date columns
# -------------------------------
for col in ["timestamp", "sowing_date", "harvest_date"]:
    df[col] = pd.to_datetime(df[col], errors="coerce")

# -------------------------------
# 3. Validate sensor readings
# -------------------------------
valid_ranges = {
    "soil_moisture_%": (0, 100),
    "soil_pH": (0, 14),
    "temperature_C": (-50, 60),
    "rainfall_mm": (0, None),
    "humidity_%": (0, 100),
    "sunlight_hours": (0, 24),
    "NDVI_index": (-1, 1),
    "latitude": (-90, 90),
    "longitude": (-180, 180),
}

invalid_flags = {}

for col, (low, high) in valid_ranges.items():
    values = pd.to_numeric(df[col], errors="coerce")
    invalid = values.isna() | (values < low)

    if high is not None:
        invalid |= values > high

    invalid_flags[col + "_invalid"] = invalid
    df[col] = values.mask(invalid)

# Record invalid readings before imputing
for col, flag in invalid_flags.items():
    df[flag] = flag_values = invalid_flags[col].astype(int)

# -------------------------------
# 4. Handle missing sensor values
# -------------------------------
sensor_cols = [
    "soil_moisture_%",
    "temperature_C",
    "humidity_%",
    "rainfall_mm",
    "soil_pH",
    "sunlight_hours",
]

for col in sensor_cols:
    # Median is a simple fallback for this
    # non-time-series dataset.
    median = df[col].median()
    df[col + "_imputed"] = df[col].isna().astype(int)

    if pd.notna(median):
        df[col] = df[col].fillna(median)

# Preserve unknown categories instead of guessing
# an irrigation method or disease status.
for col in ["irrigation_type", "crop_disease_status"]:
    df[col] = df[col].fillna("Unknown")

# -------------------------------
# 5. Simulate missing sensor readings
# -------------------------------
# Test a COPY, not the production-cleaned data.
test_df = df.copy()
rng = np.random.default_rng(42)

for col in ["soil_moisture_%", "temperature_C", "humidity_%"]:
    mask = rng.random(len(test_df)) < 0.05
    test_df.loc[mask, col] = np.nan
    test_df[col + "_simulated_missing"] = mask.astype(int)

print("\nSimulated missing sensor values:")
for col in ["soil_moisture_%", "temperature_C", "humidity_%"]:
    print(col, "=", test_df[col].isna().sum())

# Apply the same median fallback to the test copy.
for col in ["soil_moisture_%", "temperature_C", "humidity_%"]:
    median = df[col].median()
    test_df[col + "_test_imputed"] = test_df[col].isna().astype(int)
    test_df[col] = test_df[col].fillna(median)

test_df.to_csv(OUTPUT / "sensor_missing_values_test.csv", index=False)

# -------------------------------
# 6. Simulate weather API downtime
# -------------------------------
# Demonstration only: use a cached weather record
# if the API fails and the cache is still fresh.
# A real system should cache weather by location.

weather_cols = ["temperature_C", "humidity_%", "rainfall_mm"]

cache = {
    "values": df[weather_cols].iloc[0].to_dict(),
    "saved_at": datetime.now() - timedelta(minutes=5),
}

def get_weather(api_available, cached, now=None, max_age_minutes=30):
    now = now or datetime.now()

    if api_available:
        # Mock successful API response for demonstration.
        return {
            "temperature_C": 27.0,
            "humidity_%": 65.0,
            "rainfall_mm": 2.0,
            "source": "simulated_api",
        }

    age = (now - cached["saved_at"]).total_seconds() / 60

    if age <= max_age_minutes:
        return {
            **cached["values"],
            "source": "cache_fallback",
        }

    return {
        "temperature_C": np.nan,
        "humidity_%": np.nan,
        "rainfall_mm": np.nan,
        "source": "unavailable_stale_cache",
    }

api_tests = pd.DataFrame([
    get_weather(True, cache),
    get_weather(False, cache),
])

api_tests.to_csv(OUTPUT / "api_downtime_test.csv", index=False)
print("\nAPI downtime test:\n", api_tests)

# -------------------------------
# 7. Normalize numerical features
# -------------------------------
# Scale only selected sensor/weather features.
# Keep the cleaned values and original units in
# the separate cleaned CSV.
scale_cols = [
    "soil_moisture_%",
    "soil_pH",
    "temperature_C",
    "rainfall_mm",
    "humidity_%",
    "sunlight_hours",
    "NDVI_index",
]

normalized = df.copy()

for col in scale_cols:
    minimum = normalized[col].min()
    maximum = normalized[col].max()

    if pd.notna(minimum) and maximum > minimum:
        normalized[col] = (
            (normalized[col] - minimum) / (maximum - minimum)
        )
    else:
        normalized[col] = 0.0

# -------------------------------
# 8. Save outputs and summary
# -------------------------------
df.to_csv(OUTPUT / "cleaned_irrigation_data.csv", index=False)
normalized.to_csv(OUTPUT / "normalized_irrigation_data.csv", index=False)

print("\nMissing values after cleaning:\n", df.isnull().sum())
print("\nDuplicate rows after cleaning:", df.duplicated().sum())
print("\nOutput folder:", OUTPUT)
print("Files created:")
print("- cleaned_irrigation_data.csv")
print("- normalized_irrigation_data.csv")
print("- sensor_missing_values_test.csv")
print("- api_downtime_test.csv")

# Test expired cache when API is unavailable
stale_cache = {
    "values": cache["values"],
    "saved_at": datetime.now() - timedelta(hours=2),
}

stale_result = get_weather(
    api_available=False,
    cached=stale_cache,
    max_age_minutes=30
)

print("\nSTALE CACHE TEST:")
print(stale_result)

assert stale_result["source"] == "unavailable_stale_cache"
assert pd.isna(stale_result["temperature_C"])

print("Stale cache test passed!")
