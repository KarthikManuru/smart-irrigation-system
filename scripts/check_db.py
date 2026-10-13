from sqlalchemy import text

from app.database import engine


def check_database_connection() -> None:
    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT current_database(), current_user")
        )
        database_name, username = result.one()

        print("Database connection successful.")
        print(f"Database: {database_name}")
        print(f"User: {username}")


if __name__ == "__main__":
    check_database_connection()