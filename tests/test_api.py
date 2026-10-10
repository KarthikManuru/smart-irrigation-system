import json
from datetime import datetime, timezone
from pathlib import Path

import app.main as main
from fastapi.testclient import TestClient
from sqlalchemy.exc import SQLAlchemyError

from app.repository import DuplicateEventError


client = TestClient(main.app)

SAMPLE_PATH = Path(__file__).with_name(
    "sample_sensor_event.json"
)


def load_sample_event() -> dict:
    return json.loads(
        SAMPLE_PATH.read_text(encoding="utf-8")
    )


def fake_process_event(event):
    return {
        "event_id": event.event_id,
        "device_id": event.device_id,
        "received_at": datetime.now(
            timezone.utc
        ).isoformat(),
    }


def test_health_endpoint():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_valid_sensor_event_is_accepted(monkeypatch):
    monkeypatch.setattr(
        main,
        "process_event",
        fake_process_event,
    )

    response = client.post(
        "/api/v1/sensors/readings",
        json=load_sample_event(),
    )

    assert response.status_code == 202
    assert response.json()["status"] == "accepted"
    assert response.json()["event_id"] == "evt-000001"


def test_invalid_moisture_is_rejected():
    payload = load_sample_event()
    payload["readings"]["soil_moisture_pct"] = 150

    response = client.post(
        "/api/v1/sensors/readings",
        json=payload,
    )

    assert response.status_code == 422


def test_missing_device_id_is_rejected():
    payload = load_sample_event()
    del payload["device_id"]

    response = client.post(
        "/api/v1/sensors/readings",
        json=payload,
    )

    assert response.status_code == 422


def test_timestamp_without_timezone_is_rejected():
    payload = load_sample_event()
    payload["timestamp"] = "2026-10-09T12:30:00"

    response = client.post(
        "/api/v1/sensors/readings",
        json=payload,
    )

    assert response.status_code == 422


def test_unexpected_field_is_rejected():
    payload = load_sample_event()
    payload["unexpected_field"] = "not allowed"

    response = client.post(
        "/api/v1/sensors/readings",
        json=payload,
    )

    assert response.status_code == 422


def test_duplicate_event_returns_409(monkeypatch):
    def duplicate_event(event):
        raise DuplicateEventError(
            f"Event {event.event_id} already exists"
        )

    monkeypatch.setattr(
        main,
        "process_event",
        duplicate_event,
    )

    response = client.post(
        "/api/v1/sensors/readings",
        json=load_sample_event(),
    )

    assert response.status_code == 409


def test_database_failure_returns_503(monkeypatch):
    def failed_event(event):
        raise SQLAlchemyError("Simulated database failure")

    monkeypatch.setattr(
        main,
        "process_event",
        failed_event,
    )

    response = client.post(
        "/api/v1/sensors/readings",
        json=load_sample_event(),
    )

    assert response.status_code == 503
    assert response.json()["detail"] == (
        "Sensor storage is temporarily unavailable"
    )