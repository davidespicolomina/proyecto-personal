from fastapi import APIRouter

from app.api.api_v1.endpoints import (
    items,
    login,
    users,
    utils,
    management,
    search_terms,
    articles,
)

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(management.router, prefix="/management", tags=["management"])
api_router.include_router(
    search_terms.router, prefix="/search-terms", tags=["search-terms"]
)
api_router.include_router(articles.router, prefix="/articles", tags=["articles"])
