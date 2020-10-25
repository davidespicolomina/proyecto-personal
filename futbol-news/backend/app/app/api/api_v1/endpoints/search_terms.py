from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.SearchTerm])
def read_search_terms(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve search terms.
    """
    search_terms = crud.search_term.get_multi(
        db=db, skip=skip, limit=limit
    )
    return search_terms


@router.post("/", response_model=schemas.SearchTerm)
def create_search_term(
    *,
    db: Session = Depends(deps.get_db),
    search_term_in: schemas.SearchTermCreate,
) -> Any:
    """
    Create new search term.
    """
    search_term = crud.search_term.create(db=db, obj_in=search_term_in)
    if not search_term:
        raise HTTPException(status_code=400, detail="Already existing search term")
    return search_term


@router.put("/{id}", response_model=schemas.SearchTerm)
def update_search_term(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    search_term_in: schemas.SearchTermUpdate,
) -> Any:
    """
    Update a search term.
    """
    search_term = crud.search_term.get(db=db, id=id)
    if not search_term:
        raise HTTPException(status_code=404, detail="Search term not found")
    search_term = crud.search_term.update(db=db, db_obj=search_term, obj_in=search_term_in)
    return search_term


@router.get("/{id}", response_model=schemas.SearchTerm)
def read_search_term(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
) -> Any:
    """
    Get search term by ID.
    """
    search_term = crud.search_term.get(db=db, id=id)
    if not search_term:
        raise HTTPException(status_code=404, detail="Search term not found")
    return search_term


@router.delete("/{id}", response_model=schemas.SearchTerm)
def delete_search_term(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
) -> Any:
    """
    Delete a search term.
    """
    search_term = crud.search_term.get(db=db, id=id)
    if not search_term:
        raise HTTPException(status_code=404, detail="Search term not found")
    search_term = crud.search_term.remove(db=db, id=id)
    return search_term
