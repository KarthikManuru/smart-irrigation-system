from datetime import datetime

from sqlalchemy import (
    DateTime,
    Float,
    Index,
    String,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class SensorReading(Base):
    __tablename__ = "sensor_readings"

    event_id: Mapped[str] = mapped_column(
        String(100),
        primary_key=True,
    )

    device_id: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    field_id: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    sensor_id: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    timestamp: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        index=True,
    )

    soil_moisture_pct: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    soil_temperature_c: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    air_temperature_c: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    humidity_pct: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    battery_pct: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    received_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )


Index(
    "ix_sensor_readings_device_timestamp",
    SensorReading.device_id,
    SensorReading.timestamp,
)