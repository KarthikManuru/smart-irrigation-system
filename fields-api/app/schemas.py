from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator


class UserCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    phone: Optional[str] = Field(default=None, max_length=15)
    email: Optional[str] = Field(default=None, max_length=100)
    language: str = "hi"

    @field_validator("language")
    @classmethod
    def validate_language(cls, value):
        if value not in {"en", "hi", "kn"}:
            raise ValueError("Language must be en, hi, or kn")
        return value


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    user_id: int
    name: str
    phone: Optional[str] = None
    email: Optional[str] = None
    language: Optional[str] = None
    role: Optional[str] = None


class FieldCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)
    area_acres: Optional[float] = Field(default=None, gt=0)
    soil_type_id: Optional[int] = Field(default=None, gt=0)


class FieldResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    field_id: int
    user_id: Optional[int] = None
    name: str
    latitude: float
    longitude: float
    area_acres: Optional[float] = None
    soil_type_id: Optional[int] = None


class CropCreate(BaseModel):
    name: str = Field(min_length=1, max_length=50)
    ideal_moisture_min: Optional[float] = Field(default=None, ge=0, le=100)
    ideal_moisture_max: Optional[float] = Field(default=None, ge=0, le=100)
    daily_water_need_mm: Optional[float] = Field(default=None, ge=0)


class CropResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    crop_id: int
    name: str
    ideal_moisture_min: Optional[float] = None
    ideal_moisture_max: Optional[float] = None
    daily_water_need_mm: Optional[float] = None


class PlantingCreate(BaseModel):
    crop_id: int = Field(gt=0)
    sowing_date: Optional[date] = None
    growth_stage: Optional[str] = Field(default=None, max_length=30)


class PlantingUpdate(BaseModel):
    sowing_date: Optional[date] = None
    growth_stage: Optional[str] = Field(default=None, max_length=30)
    is_active: Optional[bool] = None


class SensorCreate(BaseModel):
    sensor_id: str = Field(min_length=1, max_length=50)
    sensor_type: str = Field(default="soil_moisture", max_length=30)
    status: str = Field(default="active", max_length=20)
