from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.api import deps
from app import crud, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.ArticleRead])
async def read_articles(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    source_id: Optional[int] = None,
    session: AsyncSession = Depends(deps.get_session)
):
    articles = await crud.get_articles(session, skip=skip, limit=limit, category=category, source_id=source_id)
    return articles

@router.get("/{article_id}", response_model=schemas.ArticleRead)
async def read_article(article_id: int, session: AsyncSession = Depends(deps.get_session)):
    # This is a simplified read, in real app we'd have a get_article_by_id crud
    articles = await crud.get_articles(session, skip=0, limit=1) # Placeholder if no direct get
    # Implementing direct get here for correctness
    from app.models import Article
    from sqlalchemy.future import select
    result = await session.execute(select(Article).where(Article.id == article_id))
    article = result.scalars().first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article
