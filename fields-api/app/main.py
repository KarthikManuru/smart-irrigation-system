from fastapi import FastAPI
from app.routes import router

app = FastAPI(
    title="Smart Irrigation - Field Configuration API",
    description="API for managing farmers, fields, crops, plantings, and sensors.",
    version="1.0.0",
)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "Smart Irrigation Field Configuration API is running"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
