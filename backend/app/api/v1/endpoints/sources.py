from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.api import deps
from app import crud, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.SourceRead])
async def read_sources(
    skip: int = 0,
    limit: int = 100,
    session: AsyncSession = Depends(deps.get_session)
):
    sources = await crud.get_sources(session, skip=skip, limit=limit)
    return sources

@router.post("/", response_model=schemas.SourceRead)
async def create_source(
    source: schemas.SourceCreate,
    session: AsyncSession = Depends(deps.get_session),
    current_user = Depends(deps.get_current_user)
):
    if not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="Not enough privileges")
    return await crud.create_source(session, source=source)
