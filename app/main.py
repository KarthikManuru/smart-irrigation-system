
from datetime import datetime

from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.exc import SQLAlchemyError

from app.schemas import SensorEvent
from app.ingestion import process_event
from app.repository import DuplicateEventError


app = FastAPI(
    title="AI Smart Irrigation - Sensor Ingestion API",
    description=(
        "Receives, validates, and stores simulated "
        "soil moisture sensor readings."
    ),
    version="1.0.0",
)


class IngestionResponse(BaseModel):
    status: str
    event_id: str
    received_at: datetime


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "sensor-ingestion",
    }


@app.post(
    "/api/v1/sensors/readings",
    response_model=IngestionResponse,
    status_code=status.HTTP_202_ACCEPTED,
)
def receive_sensor_reading(event: SensorEvent):
    try:
        processed_event = process_event(event)

    except DuplicateEventError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc

    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Sensor storage is temporarily unavailable",
        ) from exc

    return IngestionResponse(
        status="accepted",
        event_id=processed_event["event_id"],
        received_at=processed_event["received_at"],
    )