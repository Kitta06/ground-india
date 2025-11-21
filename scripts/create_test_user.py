import asyncio
import sys
import os

# Add /app to path so we can import app modules
sys.path.append('/app')

from app.db.session import async_session
from app.crud import create_user, get_user_by_email
from app.schemas import UserCreate

async def create_test_user():
    print("Creating test user...")
    async with async_session() as session:
        # Check if user already exists
        existing_user = await get_user_by_email(session, "admin@example.com")
        if existing_user:
            print("Test user already exists!")
            return
        
        # Create test user
        user_data = UserCreate(
            email="admin@example.com",
            password="admin",
            is_active=True,
            is_superuser=True
        )
        
        try:
            await create_user(session, user_data)
            print("Test user created successfully!")
            print("Email: admin@example.com")
            print("Password: admin")
        except Exception as e:
            print(f"Error creating user: {e}")
            await session.rollback()

if __name__ == "__main__":
    asyncio.run(create_test_user())
