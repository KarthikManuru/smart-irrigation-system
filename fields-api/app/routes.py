from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import models, schemas

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/farmers", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def create_farmer(data: schemas.UserCreate, db: Session = Depends(get_db)):
    if data.phone:
        existing = db.query(models.User).filter(models.User.phone == data.phone).first()
        if existing:
            raise HTTPException(status_code=409, detail="Phone number already exists")

    farmer = models.User(**data.model_dump())
    db.add(farmer)
    db.commit()
    db.refresh(farmer)
    return farmer


@router.get("/farmers/{farmer_id}", response_model=schemas.UserResponse)
def get_farmer(farmer_id: int, db: Session = Depends(get_db)):
    farmer = db.query(models.User).filter(models.User.user_id == farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    return farmer


@router.post("/farmers/{farmer_id}/fields", response_model=schemas.FieldResponse, status_code=status.HTTP_201_CREATED)
def create_field(farmer_id: int, data: schemas.FieldCreate, db: Session = Depends(get_db)):
    farmer = db.query(models.User).filter(models.User.user_id == farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")

    field = models.Field(user_id=farmer_id, **data.model_dump())
    db.add(field)
    db.commit()
    db.refresh(field)
    return field


@router.get("/farmers/{farmer_id}/fields", response_model=list[schemas.FieldResponse])
def list_farmer_fields(farmer_id: int, db: Session = Depends(get_db)):
    farmer = db.query(models.User).filter(models.User.user_id == farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")

    return db.query(models.Field).filter(models.Field.user_id == farmer_id).all()


@router.get("/fields/{field_id}", response_model=schemas.FieldResponse)
def get_field(field_id: int, db: Session = Depends(get_db)):
    field = db.query(models.Field).filter(models.Field.field_id == field_id).first()
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")
    return field


@router.get("/crops", response_model=list[schemas.CropResponse])
def list_crops(db: Session = Depends(get_db)):
    return db.query(models.Crop).order_by(models.Crop.name).all()


@router.post("/crops", response_model=schemas.CropResponse, status_code=status.HTTP_201_CREATED)
def create_crop(data: schemas.CropCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Crop).filter(models.Crop.name == data.name).first()
    if existing:
        raise HTTPException(status_code=409, detail="Crop already exists")

    if (
        data.ideal_moisture_min is not None
        and data.ideal_moisture_max is not None
        and data.ideal_moisture_min > data.ideal_moisture_max
    ):
        raise HTTPException(status_code=422, detail="Minimum moisture cannot exceed maximum moisture")

    crop = models.Crop(**data.model_dump())
    db.add(crop)
    db.commit()
    db.refresh(crop)
    return crop


@router.post("/fields/{field_id}/crops", status_code=status.HTTP_201_CREATED)
def add_crop_to_field(field_id: int, data: schemas.PlantingCreate, db: Session = Depends(get_db)):
    field = db.query(models.Field).filter(models.Field.field_id == field_id).first()
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")

    crop = db.query(models.Crop).filter(models.Crop.crop_id == data.crop_id).first()
    if not crop:
        raise HTTPException(status_code=404, detail="Crop not found")

    planting = models.FieldCrop(field_id=field_id, **data.model_dump())
    db.add(planting)
    db.commit()
    db.refresh(planting)

    return {
        "field_crop_id": planting.field_crop_id,
        "field_id": planting.field_id,
        "crop_id": planting.crop_id,
        "sowing_date": planting.sowing_date,
        "growth_stage": planting.growth_stage,
        "is_active": planting.is_active,
    }


@router.put("/fields/{field_id}/crops/{planting_id}")
def update_planting(field_id: int, planting_id: int, data: schemas.PlantingUpdate, db: Session = Depends(get_db)):
    planting = (
        db.query(models.FieldCrop)
        .filter(
            models.FieldCrop.field_id == field_id,
            models.FieldCrop.field_crop_id == planting_id,
        )
        .first()
    )
    if not planting:
        raise HTTPException(status_code=404, detail="Planting not found")

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(planting, key, value)

    db.commit()
    db.refresh(planting)
    return {
        "field_crop_id": planting.field_crop_id,
        "field_id": planting.field_id,
        "crop_id": planting.crop_id,
        "sowing_date": planting.sowing_date,
        "growth_stage": planting.growth_stage,
        "is_active": planting.is_active,
    }


@router.post("/fields/{field_id}/sensors", status_code=status.HTTP_201_CREATED)
def add_sensor(field_id: int, data: schemas.SensorCreate, db: Session = Depends(get_db)):
    field = db.query(models.Field).filter(models.Field.field_id == field_id).first()
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")

    existing = db.query(models.Sensor).filter(models.Sensor.sensor_id == data.sensor_id).first()
    if existing:
        raise HTTPException(status_code=409, detail="Sensor ID already exists")

    sensor = models.Sensor(field_id=field_id, **data.model_dump())
    db.add(sensor)
    db.commit()
    db.refresh(sensor)
    return {
        "sensor_id": sensor.sensor_id,
        "field_id": sensor.field_id,
        "sensor_type": sensor.sensor_type,
        "status": sensor.status,
        "last_seen": sensor.last_seen,
    }


@router.get("/sensors/{sensor_code}")
def get_sensor(sensor_code: str, db: Session = Depends(get_db)):
    sensor = db.query(models.Sensor).filter(models.Sensor.sensor_id == sensor_code).first()
    if not sensor:
        raise HTTPException(status_code=404, detail="Sensor not found")

    return {
        "sensor_id": sensor.sensor_id,
        "field_id": sensor.field_id,
        "sensor_type": sensor.sensor_type,
        "status": sensor.status,
        "last_seen": sensor.last_seen,
    }


@router.get("/fields/{field_id}/summary")
def field_summary(field_id: int, db: Session = Depends(get_db)):
    field = db.query(models.Field).filter(models.Field.field_id == field_id).first()
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")

    plantings = (
        db.query(models.FieldCrop, models.Crop)
        .join(models.Crop, models.FieldCrop.crop_id == models.Crop.crop_id)
        .filter(models.FieldCrop.field_id == field_id)
        .all()
    )

    sensors = db.query(models.Sensor).filter(models.Sensor.field_id == field_id).all()

    return {
        "field_id": field.field_id,
        "field_name": field.name,
        "area_acres": field.area_acres,
        "soil_type_id": field.soil_type_id,
        "crops": [
            {
                "field_crop_id": planting.field_crop_id,
                "crop_id": crop.crop_id,
                "crop_name": crop.name,
                "sowing_date": planting.sowing_date,
                "growth_stage": planting.growth_stage,
                "is_active": planting.is_active,
            }
            for planting, crop in plantings
        ],
        "sensors": [
            {
                "sensor_id": sensor.sensor_id,
                "sensor_type": sensor.sensor_type,
                "status": sensor.status,
                "last_seen": sensor.last_seen,
            }
            for sensor in sensors
        ],
    }



@router.put("/farmers/{farmer_id}", response_model=schemas.UserResponse)
def update_farmer(farmer_id: int, data: schemas.UserCreate, db: Session = Depends(get_db)):
    farmer = db.query(models.User).filter(models.User.user_id == farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")

    if data.phone:
        existing = db.query(models.User).filter(
            models.User.phone == data.phone,
            models.User.user_id != farmer_id
        ).first()
        if existing:
            raise HTTPException(status_code=409, detail="Phone number already exists")

    for key, value in data.model_dump().items():
        setattr(farmer, key, value)

    db.commit()
    db.refresh(farmer)
    return farmer


@router.delete("/farmers/{farmer_id}")
def delete_farmer(farmer_id: int, db: Session = Depends(get_db)):
    farmer = db.query(models.User).filter(models.User.user_id == farmer_id).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")

    db.delete(farmer)
    db.commit()
    return {"message": "Farmer deleted successfully"}


@router.put("/fields/{field_id}", response_model=schemas.FieldResponse)
def update_field(field_id: int, data: schemas.FieldCreate, db: Session = Depends(get_db)):
    field = db.query(models.Field).filter(models.Field.field_id == field_id).first()
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")

    for key, value in data.model_dump().items():
        setattr(field, key, value)

    db.commit()
    db.refresh(field)
    return field


@router.delete("/fields/{field_id}")
def delete_field(field_id: int, db: Session = Depends(get_db)):
    field = db.query(models.Field).filter(models.Field.field_id == field_id).first()
    if not field:
        raise HTTPException(status_code=404, detail="Field not found")

    db.delete(field)
    db.commit()
    return {"message": "Field deleted successfully"}
