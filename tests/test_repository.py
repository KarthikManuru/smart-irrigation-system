from datetime import datetime, timezone
from uuid import uuid4

import pytest
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import engine
from app.models import SensorReading
from app.repository import (
    DuplicateEventError,
    save_sensor_reading,
)


def make_event(event_id: str) -> dict:
    now = datetime.now(timezone.utc).isoformat()

    return {
        "event_id": event_id,
        "device_id": "DEV-TEST",
        "field_id": "FIELD-TEST",
        "sensor_id": "SENSOR-TEST",
        "timestamp": now,
        "readings": {
            "soil_moisture_pct": 35.5,
            "soil_temperature_c": 28.2,
            "air_temperature_c": 31.7,
            "humidity_pct": 64.0,
        },
        "battery_pct": 90.0,
        "received_at": now,
    }


def delete_test_event(event_id: str) -> None:
    with Session(engine) as session:
        reading = session.get(SensorReading, event_id)

        if reading is not None:
            session.delete(reading)
            session.commit()


def test_sensor_event_is_saved_to_postgresql():
    event_id = f"test-{uuid4()}"

    try:
        result = save_sensor_reading(make_event(event_id))

        assert result["event_id"] == event_id
        assert result["device_id"] == "DEV-TEST"

        with Session(engine) as session:
            saved = session.get(SensorReading, event_id)

            assert saved is not None
            assert saved.soil_moisture_pct == 35.5
            assert saved.humidity_pct == 64.0
    finally:
        delete_test_event(event_id)


def test_duplicate_event_id_is_rejected():
    event_id = f"test-{uuid4()}"

    try:
        save_sensor_reading(make_event(event_id))

        with pytest.raises(DuplicateEventError):
            save_sensor_reading(make_event(event_id))
    finally:
        delete_test_event(event_id)