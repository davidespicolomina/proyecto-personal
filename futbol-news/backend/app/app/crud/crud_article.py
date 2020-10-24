from datetime import datetime
from typing import Union, Dict, Any

from app.crud.base import CRUDBase
from app.models.article import Article
from app.schemas.article import ArticleCreate, ArticleUpdate
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session


class CRUDArticle(CRUDBase[Article, ArticleCreate, ArticleUpdate]):
    def create(
        self, db: Session, *, obj_in: ArticleCreate
    ) -> Article:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, last_updated=datetime.now().date())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: Article,
        obj_in: Union[ArticleUpdate, Dict[str, Any]]
    ) -> Article:
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db_obj.last_updated = datetime.now().date()
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


article = CRUDArticle(Article)
