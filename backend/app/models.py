from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship

class SourceBase(SQLModel):
    name: str = Field(index=True)
    url: str
    feed_url: Optional[str] = None
    logo_url: Optional[str] = None
    bias_rating: Optional[int] = 0 # -10 to 10 (Left to Right)
    reliability_rating: Optional[int] = 5 # 0 to 10
    is_active: bool = True

class Source(SourceBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    articles: List["Article"] = Relationship(back_populates="source")

class ArticleBase(SQLModel):
    title: str = Field(index=True)
    summary: Optional[str] = None
    url: str = Field(unique=True)
    published_at: datetime = Field(default_factory=datetime.utcnow)
    image_url: Optional[str] = None
    category: Optional[str] = Field(default="General", index=True)
    bias_score: Optional[float] = Field(default=0.0)  # -100 (left) to +100 (right)
    source_id: Optional[int] = Field(default=None, foreign_key="source.id")

class Article(ArticleBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    source: Optional[Source] = Relationship(back_populates="articles")

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    is_active: bool = True
    is_superuser: bool = False

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str




