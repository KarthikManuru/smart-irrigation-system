from sqlalchemy import (
    Boolean,
    Column,
    Date,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    text,
)
from sqlalchemy.orm import relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(15), unique=True)
    email = Column(String(100))
    language = Column(String(10), server_default=text("'hi'"))
    role = Column(String(20), server_default=text("'farmer'"))
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))

    fields = relationship("Field", back_populates="user")


class SoilType(Base):
    __tablename__ = "soil_types"

    soil_type_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False, unique=True)
    field_capacity = Column(Numeric(5, 2))
    wilting_point = Column(Numeric(5, 2))


class Crop(Base):
    __tablename__ = "crops"

    crop_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False, unique=True)
    ideal_moisture_min = Column(Numeric(5, 2))
    ideal_moisture_max = Column(Numeric(5, 2))
    daily_water_need_mm = Column(Numeric(5, 2))

    plantings = relationship("FieldCrop", back_populates="crop")


class Field(Base):
    __tablename__ = "fields"

    field_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
        Integer,
        ForeignKey("users.user_id", ondelete="CASCADE"),
    )
    name = Column(String(100), nullable=False)
    latitude = Column(Numeric(9, 6), nullable=False)
    longitude = Column(Numeric(9, 6), nullable=False)
    area_acres = Column(Numeric(8, 2))
    soil_type_id = Column(Integer, ForeignKey("soil_types.soil_type_id"))
    created_at = Column(DateTime(timezone=True), server_default=text("now()"))

    user = relationship("User", back_populates="fields")
    plantings = relationship("FieldCrop", back_populates="field")
    sensors = relationship("Sensor", back_populates="field")


class FieldCrop(Base):
    __tablename__ = "field_crops"

    field_crop_id = Column(Integer, primary_key=True, index=True)
    field_id = Column(
        Integer,
        ForeignKey("fields.field_id", ondelete="CASCADE"),
    )
    crop_id = Column(Integer, ForeignKey("crops.crop_id"))
    sowing_date = Column(Date)
    growth_stage = Column(String(30))
    is_active = Column(Boolean, server_default=text("true"))

    field = relationship("Field", back_populates="plantings")
    crop = relationship("Crop", back_populates="plantings")


class Sensor(Base):
    __tablename__ = "sensors"

    sensor_id = Column(String(50), primary_key=True)
    field_id = Column(
        Integer,
        ForeignKey("fields.field_id", ondelete="CASCADE"),
    )
    sensor_type = Column(
        String(30),
        server_default=text("'soil_moisture'"),
    )
    status = Column(String(20), server_default=text("'active'"))
    last_seen = Column(DateTime(timezone=True))

    field = relationship("Field", back_populates="sensors")
