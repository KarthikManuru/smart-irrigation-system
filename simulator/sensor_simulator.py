import argparse
import random
import time
import uuid

from dataclasses import dataclass
from datetime import datetime, timezone

import httpx

from app.schemas import SensorEvent


DEFAULT_API_URL = (
    "http://127.0.0.1:8000/api/v1/sensors/readings"
)

DEFAULT_INTERVAL_SECONDS = 10


@dataclass
class SimulatedDevice:
    device_id: str
    field_id: str
    sensor_id: str
    soil_moisture_pct: float
    battery_pct: float = 100.0


DEVICES = [
    SimulatedDevice(
        device_id="DEV-001",
        field_id="FIELD-001",
        sensor_id="SENSOR-001",
        soil_moisture_pct=35.0,
    ),
    SimulatedDevice(
        device_id="DEV-002",
        field_id="FIELD-002",
        sensor_id="SENSOR-002",
        soil_moisture_pct=48.0,
    ),
]


def generate_event(
    device: SimulatedDevice,
    rng: random.Random | None = None,
) -> dict:
    """Generate one schema-validated sensor event."""

    if rng is None:
        rng = random.Random()

    # Simulate gradual soil moisture changes.
    moisture_change = rng.uniform(-2.0, 1.0)

    device.soil_moisture_pct = max(
        5.0,
        min(
            90.0,
            device.soil_moisture_pct + moisture_change,
        ),
    )

    # Simulate slow battery consumption.
    device.battery_pct = max(
        0.0,
        device.battery_pct - rng.uniform(0.0, 0.05),
    )

    payload = {
        "event_id": str(uuid.uuid4()),
        "device_id": device.device_id,
        "field_id": device.field_id,
        "sensor_id": device.sensor_id,
        "timestamp": datetime.now(
            timezone.utc
        ).isoformat(),
        "readings": {
            "soil_moisture_pct": round(
                device.soil_moisture_pct, 2
            ),
            "soil_temperature_c": round(
                rng.uniform(24.0, 34.0), 2
            ),
            "air_temperature_c": round(
                rng.uniform(25.0, 38.0), 2
            ),
            "humidity_pct": round(
                rng.uniform(40.0, 85.0), 2
            ),
        },
        "battery_pct": round(device.battery_pct, 2),
    }

    # Reuse Step 2 validation before sending.
    event = SensorEvent.model_validate(payload)

    # Return a JSON-compatible dictionary.
    return event.model_dump(mode="json")


def send_event(
    client: httpx.Client,
    api_url: str,
    payload: dict,
) -> bool:
    """Send one event and report whether it was accepted."""

    try:
        response = client.post(
            api_url,
            json=payload,
        )

        if response.status_code == 202:
            print(
                f"[ACCEPTED] "
                f"device={payload['device_id']} "
                f"event={payload['event_id']} "
                f"moisture="
                f"{payload['readings']['soil_moisture_pct']}%"
            )
            return True

        print(
            f"[REJECTED] "
            f"device={payload['device_id']} "
            f"HTTP={response.status_code} "
            f"response={response.text}"
        )
        return False

    except httpx.HTTPError as exc:
        print(
            f"[DELIVERY ERROR] "
            f"device={payload['device_id']} "
            f"error={exc}"
        )
        return False


def run_simulator(
    api_url: str,
    interval_seconds: float,
    once: bool = False,
) -> None:
    """Send events once or repeatedly until interrupted."""

    if interval_seconds <= 0:
        raise ValueError("Interval must be greater than zero")

    print("Smart Irrigation Sensor Simulator")
    print(f"API endpoint: {api_url}")
    print(f"Devices: {len(DEVICES)}")
    print(f"Interval: {interval_seconds} seconds")
    print("Mode:", "one-time" if once else "continuous")
    print("Press Ctrl+C to stop.")

    try:
        with httpx.Client(timeout=10.0) as client:
            while True:
                cycle_started = time.monotonic()

                for device in DEVICES:
                    payload = generate_event(device)

                    send_event(
                        client=client,
                        api_url=api_url,
                        payload=payload,
                    )

                if once:
                    break

                # Keep the cycle approximately interval-spaced.
                elapsed = time.monotonic() - cycle_started
                time.sleep(max(0.0, interval_seconds - elapsed))

    except KeyboardInterrupt:
        print("\nSimulator stopped.")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Mock soil moisture sensor simulator"
    )

    parser.add_argument(
        "--api-url",
        default=DEFAULT_API_URL,
        help="FastAPI sensor ingestion endpoint",
    )

    parser.add_argument(
        "--interval",
        type=float,
        default=DEFAULT_INTERVAL_SECONDS,
        help="Seconds between transmission cycles",
    )

    parser.add_argument(
        "--once",
        action="store_true",
        help="Send one event from each device and exit",
    )

    args = parser.parse_args()

    run_simulator(
        api_url=args.api_url,
        interval_seconds=args.interval,
        once=args.once,
    )


if __name__ == "__main__":
    main()