from datetime import date
from typing import Optional

from pydantic import BaseModel


# Shared properties
class SearchTermBase(BaseModel):
    term: str


# Properties to receive on SearchTerm creation
class SearchTermCreate(SearchTermBase):
    pass


# Properties to receive on SearchTerm update
class SearchTermUpdate(SearchTermBase):
    pass


# Properties shared by models stored in DB
class SearchTermInDBBase(SearchTermBase):
    id: int

    class Config:
        orm_mode = True


# Properties to return to client
class SearchTerm(SearchTermInDBBase):
    pass


# Properties stored in DB
class SearchTermInDB(SearchTermInDBBase):
    pass
