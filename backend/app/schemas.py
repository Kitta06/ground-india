from typing import List, Optional
from datetime import datetime
from sqlmodel import SQLModel
from app.models import ArticleBase, SourceBase, UserBase

class ArticleCreate(ArticleBase):
    pass

class ArticleRead(ArticleBase):
    id: int
    source: Optional[SourceBase] = None

class SourceCreate(SourceBase):
    pass

class SourceRead(SourceBase):
    id: int

class UserRead(UserBase):
    id: int

class UserCreate(UserBase):
    password: str

class ArticleFilter(SQLModel):
    source_id: Optional[int] = None
    category: Optional[str] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None

class Token(SQLModel):
    access_token: str
    token_type: str

class TokenPayload(SQLModel):
    sub: Optional[int] = None
