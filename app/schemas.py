from datetime import datetime
from typing import Annotated

from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
    field_validator,
)


# Percentage values must be finite numbers from 0 to 100.
Percentage = Annotated[
    float,
    Field(ge=0, le=100, allow_inf_nan=False),
]


class SensorReadings(BaseModel):
    model_config = ConfigDict(
        extra="forbid",
        str_strip_whitespace=True,
    )

    soil_moisture_pct: Percentage
    soil_temperature_c: float = Field(
        allow_inf_nan=False
    )
    air_temperature_c: float = Field(
        allow_inf_nan=False
    )
    humidity_pct: Percentage


class SensorEvent(BaseModel):
    model_config = ConfigDict(
        extra="forbid",
        str_strip_whitespace=True,
    )

    event_id: str = Field(min_length=1, max_length=100)
    device_id: str = Field(min_length=1, max_length=100)
    field_id: str = Field(min_length=1, max_length=100)
    sensor_id: str = Field(min_length=1, max_length=100)

    timestamp: datetime

    readings: SensorReadings

    battery_pct: Percentage

    @field_validator("timestamp")
    @classmethod
    def timestamp_must_include_timezone(
        cls,
        value: datetime,
    ) -> datetime:
        if value.tzinfo is None or value.utcoffset() is None:
            raise ValueError(
                "Timestamp must include a timezone, "
                "such as Z or +05:30"
            )

        return value