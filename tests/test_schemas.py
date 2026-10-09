import pytest
from pydantic import ValidationError

from app.schemas import SensorEvent


VALID_EVENT = {
    "event_id": "evt-000001",
    "device_id": "DEV-001",
    "field_id": "FIELD-001",
    "sensor_id": "SENSOR-001",
    "timestamp": "2026-10-09T12:30:00Z",
    "readings": {
        "soil_moisture_pct": 28.5,
        "soil_temperature_c": 29.2,
        "air_temperature_c": 32.1,
        "humidity_pct": 61.0,
    },
    "battery_pct": 87.0,
}


def test_valid_sensor_event():
    event = SensorEvent.model_validate(VALID_EVENT)

    assert event.event_id == "evt-000001"
    assert event.readings.soil_moisture_pct == 28.5


def test_reject_invalid_soil_moisture():
    payload = {
        **VALID_EVENT,
        "readings": {
            **VALID_EVENT["readings"],
            "soil_moisture_pct": 150,
        },
    }

    with pytest.raises(ValidationError):
        SensorEvent.model_validate(payload)


def test_reject_missing_device_id():
    payload = VALID_EVENT.copy()
    payload.pop("device_id")

    with pytest.raises(ValidationError):
        SensorEvent.model_validate(payload)


def test_reject_timestamp_without_timezone():
    payload = {
        **VALID_EVENT,
        "timestamp": "2026-10-09T12:30:00",
    }

    with pytest.raises(ValidationError):
        SensorEvent.model_validate(payload)


def test_reject_unexpected_field():
    payload = {
        **VALID_EVENT,
        "unexpected_value": 123,
    }

    with pytest.raises(ValidationError):
        SensorEvent.model_validate(payload)


def test_reject_invalid_battery_percentage():
    payload = {
        **VALID_EVENT,
        "battery_pct": -1,
    }

    with pytest.raises(ValidationError):
        SensorEvent.model_validate(payload)