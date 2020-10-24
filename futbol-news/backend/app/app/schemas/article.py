from datetime import date
from typing import Optional

from pydantic import BaseModel


# Shared properties
class ArticleBase(BaseModel):
    source: str
    title: str
    url: str
    description: Optional[str] = None
    favorite: bool = True
    summary: str


# Properties to receive on Article creation
class ArticleCreate(ArticleBase):
    pass


# Properties to receive on Article update
class ArticleUpdate(ArticleBase):
    pass


# Properties shared by models stored in DB
class ArticleInDBBase(ArticleBase):
    id: int
    last_update: date

    class Config:
        orm_mode = True


# Properties to return to client
class Article(ArticleInDBBase):
    pass


# Properties properties stored in DB
class ArticleInDB(ArticleInDBBase):
    pass
