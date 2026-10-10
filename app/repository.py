from datetime import datetime
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.database import engine
from app.models import SensorReading


class DuplicateEventError(Exception):
    """Raised when a sensor event ID already exists."""


def save_sensor_reading(event: dict) -> dict:
    """Save a validated sensor event to PostgreSQL."""

    readings = event["readings"]

    
    sensor_reading = SensorReading(
        event_id=event["event_id"],
        device_id=event["device_id"],
        field_id=event["field_id"],
        sensor_id=event["sensor_id"],
        timestamp=datetime.fromisoformat(
            event["timestamp"].replace("Z", "+00:00")
        ),
        soil_moisture_pct=readings["soil_moisture_pct"],
        soil_temperature_c=readings["soil_temperature_c"],
        air_temperature_c=readings["air_temperature_c"],
        humidity_pct=readings["humidity_pct"],
        battery_pct=event["battery_pct"],
        received_at=datetime.fromisoformat(
            event["received_at"].replace("Z", "+00:00")
        ),
    )

    with Session(engine) as session:
        try:
            session.add(sensor_reading)
            session.commit()
            session.refresh(sensor_reading)

        except IntegrityError as exc:
            session.rollback()
            raise DuplicateEventError(
                f"Event ID '{event['event_id']}' already exists."
            ) from exc

        return {
            "event_id": sensor_reading.event_id,
            "device_id": sensor_reading.device_id,
            "field_id": sensor_reading.field_id,
            "sensor_id": sensor_reading.sensor_id,
        }