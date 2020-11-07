from typing import Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.article import Article
from app.schemas.article import ArticleCreate, ArticleUpdate


class CRUDArticle(CRUDBase[Article, ArticleCreate, ArticleUpdate]):
    def update_or_create(
        self, db: Session, *, obj_in: ArticleCreate
    ) -> Optional[Article]:
        existing = self.get_by_url(db=db, url=obj_in.url)
        if existing:
            obj_in.favorite = existing.favorite
            return super().update(db=db, db_obj=existing, obj_in=obj_in)
        return super().create(db=db, obj_in=obj_in)

    def get_by_url(self, db: Session, url: str) -> Optional[Article]:
        return db.query(self.model).filter(self.model.url == url).first()


article = CRUDArticle(Article)
