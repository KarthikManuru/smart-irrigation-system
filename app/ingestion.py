from datetime import datetime, timezone

from app.schemas import SensorEvent
from app.repository import save_sensor_reading


def normalize_event(event: SensorEvent) -> dict:
    """
    Convert a validated sensor event into a
    normalized, JSON-compatible dictionary.
    """

    if (
        event.timestamp.tzinfo is None
        or event.timestamp.utcoffset() is None
    ):
        raise ValueError("Timestamp must include a timezone")

    received_at = datetime.now(timezone.utc)

    normalized = event.model_dump(mode="json")

    normalized["timestamp"] = (
        event.timestamp
        .astimezone(timezone.utc)
        .isoformat()
    )

    normalized["received_at"] = received_at.isoformat()

    return normalized


def process_event(event: SensorEvent) -> dict:
    """
    Validate, normalize, and save a sensor event.
    """

    normalized_event = normalize_event(event)

    saved_event = save_sensor_reading(normalized_event)

    return {
        **saved_event,
        "received_at": normalized_event["received_at"],
    }
