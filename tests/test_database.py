from sqlalchemy import inspect, text

from app.database import engine
from app.models import SensorReading


def test_database_connection():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        assert result.scalar_one() == 1


def test_sensor_readings_table_exists():
    inspector = inspect(engine)

    assert inspector.has_table("sensor_readings")


def test_sensor_readings_has_expected_columns():
    inspector = inspect(engine)

    column_names = {
        column["name"]
        for column in inspector.get_columns("sensor_readings")
    }

    expected_columns = {
        "event_id",
        "device_id",
        "field_id",
        "sensor_id",
        "timestamp",
        "soil_moisture_pct",
        "soil_temperature_c",
        "air_temperature_c",
        "humidity_pct",
        "battery_pct",
        "received_at",
    }

    assert expected_columns.issubset(column_names)


def test_event_id_is_the_primary_key():
    inspector = inspect(engine)

    primary_key = inspector.get_pk_constraint(
        "sensor_readings"
    )

    assert primary_key["constrained_columns"] == ["event_id"]