from app.database import Base, engine
from app import models


def initialize_database() -> None:
    Base.metadata.create_all(bind=engine)
    print("Database tables initialized successfully.")


if __name__ == "__main__":
    initialize_database()