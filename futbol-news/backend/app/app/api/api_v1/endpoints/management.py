from typing import Any

from app.core.celery_app import celery_app
from fastapi import APIRouter, BackgroundTasks

from app import schemas

router = APIRouter()


@router.post("/update/", response_model=schemas.Msg, status_code=201)
def run_update() -> Any:
    """
    Lanzar la actualización de la base de datos en una tarea en segundo plano.
    Siempre devuelve un mensaje "OK"
    """
    celery_app.send_task("app.worker.task_crawl_news")
    return {"msg": "OK"}
