from sqlalchemy import Column, Integer, String

from app.db.base_class import Base


class SearchTerm(Base):
    id = Column(Integer, primary_key=True, index=True)
    term = Column(String, nullable=False, comment="Término de búsqueda para filtros", unique=True, index=True)
