import random

import httpx
import pytest
from pydantic import ValidationError

from app.schemas import SensorEvent
from simulator.sensor_simulator import (
    SimulatedDevice,
    generate_event,
    send_event,
)


def make_device():
    return SimulatedDevice(
        device_id="DEV-TEST",
        field_id="FIELD-TEST",
        sensor_id="SENSOR-TEST",
        soil_moisture_pct=40.0,
    )


def test_generated_event_matches_schema():
    device = make_device()

    payload = generate_event(
        device,
        rng=random.Random(10),
    )

    event = SensorEvent.model_validate(payload)

    assert event.device_id == "DEV-TEST"
    assert event.field_id == "FIELD-TEST"
    assert event.sensor_id == "SENSOR-TEST"


def test_moisture_stays_within_simulation_limits():
    device = make_device()
    rng = random.Random(20)

    for _ in range(100):
        payload = generate_event(device, rng=rng)

        moisture = payload["readings"]["soil_moisture_pct"]

        assert 5.0 <= moisture <= 90.0


def test_event_ids_are_unique():
    device = make_device()

    first = generate_event(
        device,
        rng=random.Random(1),
    )

    second = generate_event(
        device,
        rng=random.Random(1),
    )

    assert first["event_id"] != second["event_id"]


def test_send_event_accepts_http_202():
    transport = httpx.MockTransport(
        lambda request: httpx.Response(
            202,
            json={
                "status": "accepted",
                "event_id": "evt-test",
                "received_at": "2026-10-09T12:30:00+00:00",
            },
        )
    )

    payload = generate_event(
        make_device(),
        rng=random.Random(30),
    )

    with httpx.Client(transport=transport) as client:
        result = send_event(
            client,
            "http://testserver/api/v1/sensors/readings",
            payload,
        )

    assert result is True


def test_send_event_reports_http_rejection():
    transport = httpx.MockTransport(
        lambda request: httpx.Response(
            422,
            json={"detail": "Invalid sensor data"},
        )
    )

    payload = generate_event(
        make_device(),
        rng=random.Random(40),
    )

    with httpx.Client(transport=transport) as client:
        result = send_event(
            client,
            "http://testserver/api/v1/sensors/readings",
            payload,
        )

    assert result is False


def test_invalid_simulation_interval_is_rejected():
    from simulator.sensor_simulator import run_simulator

    with pytest.raises(ValueError):
        run_simulator(
            api_url="http://testserver/readings",
            interval_seconds=0,
            once=True,
        )


def test_invalid_payload_fails_schema_validation():
    invalid_payload = {
        "event_id": "evt-test",
        "device_id": "DEV-TEST",
        "field_id": "FIELD-TEST",
        "sensor_id": "SENSOR-TEST",
        "timestamp": "2026-10-09T12:30:00Z",
        "readings": {
            "soil_moisture_pct": 150,
            "soil_temperature_c": 29.0,
            "air_temperature_c": 31.0,
            "humidity_pct": 60.0,
        },
        "battery_pct": 90.0,
    }

    with pytest.raises(ValidationError):
        SensorEvent.model_validate(invalid_payload)