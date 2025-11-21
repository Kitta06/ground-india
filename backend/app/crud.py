from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from app.models import Article, Source, User
from app.schemas import ArticleCreate, SourceCreate, UserCreate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

from sqlalchemy.orm import selectinload

async def get_articles(session: AsyncSession, skip: int = 0, limit: int = 100, category: Optional[str] = None, source_id: Optional[int] = None) -> List[Article]:
    query = select(Article).options(selectinload(Article.source)).offset(skip).limit(limit).order_by(Article.published_at.desc())
    if category:
        query = query.where(Article.category == category)
    if source_id:
        query = query.where(Article.source_id == source_id)
    result = await session.execute(query)
    return result.scalars().all()

async def create_article(session: AsyncSession, article: ArticleCreate) -> Article:
    db_article = Article.model_validate(article)
    session.add(db_article)
    await session.commit()
    await session.refresh(db_article)
    return db_article

async def get_sources(session: AsyncSession, skip: int = 0, limit: int = 100) -> List[Source]:
    result = await session.execute(select(Source).offset(skip).limit(limit))
    return result.scalars().all()

async def create_source(session: AsyncSession, source: SourceCreate) -> Source:
    db_source = Source.model_validate(source)
    session.add(db_source)
    await session.commit()
    await session.refresh(db_source)
    return db_source

async def get_user_by_email(session: AsyncSession, email: str) -> Optional[User]:
    result = await session.execute(select(User).where(User.email == email))
    return result.scalars().first()

async def create_user(session: AsyncSession, user: UserCreate) -> User:
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password, is_active=user.is_active, is_superuser=user.is_superuser)
    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    return db_user
