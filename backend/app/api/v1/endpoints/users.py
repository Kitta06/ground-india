from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_session
from app import crud, schemas

router = APIRouter()

@router.post("/signup", response_model=schemas.UserRead)
async def signup(
    user_in: schemas.UserCreate,
    session: AsyncSession = Depends(get_session)
):
    """
    Create new user account.
    """
    # Check if user already exists
    existing_user = await crud.get_user_by_email(session, email=user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="A user with this email already exists"
        )
    
    # Create new user
    user = await crud.create_user(session, user=user_in)
    return user
