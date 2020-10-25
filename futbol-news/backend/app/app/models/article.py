from sqlalchemy import Boolean, Column, Integer, String, Text, Date, DateTime
from sqlalchemy.sql import func

from app.db.base_class import Base


class Article(Base):
    id = Column(Integer, primary_key=True, index=True)
    source = Column(String, nullable=False, comment="De qué web viene el artículo")
    title = Column(String, nullable=False, comment="Título para mostrar en la lista")
    url = Column(String, unique=True, index=True, nullable=False, comment="Link")
    favorite = Column(Boolean(), default=True, comment="True si está añadido a favoritos")
    summary = Column(
        Text,
        nullable=False,
        comment="Se puede poner un resumen del texto aquí, por si no se quiere abrir la url",
    )
    last_updated = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
        comment="Fecha de última actualización",
    )
