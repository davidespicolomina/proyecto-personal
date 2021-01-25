from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi_pagination import Page, pagination_params
from fastapi_pagination.paginator import paginate
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=Page[schemas.Article], dependencies=[Depends(pagination_params)])
def read_articles(
    filter: Optional[str] = None,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Retrieve articles.
    """
    search_terms = crud.article.get_articles(
        db=db, filter=filter
    )

    return paginate(search_terms)


@router.get("/{id}", response_model=schemas.Article)
def read_article(*, db: Session = Depends(deps.get_db), id: int) -> Any:
    """
    Get article by ID.
    """
    article = crud.article.get(db=db, id=id)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article
