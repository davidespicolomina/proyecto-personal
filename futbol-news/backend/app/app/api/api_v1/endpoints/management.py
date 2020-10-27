import logging

from typing import Any
from fastapi import APIRouter, BackgroundTasks

from app import schemas
from app.api.scrapy.process import crawl_news

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/update/", response_model=schemas.Msg, status_code=201)
def run_update(background_tasks: BackgroundTasks) -> Any:
    """
    Lanzar la actualización de la base de datos en una tarea en segundo plano.
    Siempre devuelve un mensaje "OK"
    """
    background_tasks.add_task(crawl_news)
    return {"msg": "OK"}
