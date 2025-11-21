from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.api import deps
from app import crud, schemas
from app.core.config import settings
from jose import jwt

router = APIRouter()

@router.post("/login/access-token", response_model=schemas.Token)
async def login_access_token(
    session: AsyncSession = Depends(deps.get_session), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    user = await crud.get_user_by_email(session, email=form_data.username)
    if not user or not crud.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = jwt.encode(
        {"sub": user.email}, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return {"access_token": access_token, "token_type": "bearer"}
