from typing import Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.search_term import SearchTerm
from app.schemas.search_term import SearchTermCreate, SearchTermUpdate


class CRUDSearchTerm(CRUDBase[SearchTerm, SearchTermCreate, SearchTermUpdate]):
    def create(self, db: Session, *, obj_in: SearchTermCreate) -> Optional[SearchTerm]:
        existing = self.get_by_term(db=db, term=obj_in.term)
        if existing:
            return None
        return super().create(db=db, obj_in=obj_in)

    def get_by_term(self, db: Session, term: str) -> Optional[SearchTerm]:
        return db.query(self.model).filter(self.model.term == term).first()


search_term = CRUDSearchTerm(SearchTerm)
