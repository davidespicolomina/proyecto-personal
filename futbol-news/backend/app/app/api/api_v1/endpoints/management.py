import logging

from typing import Any

from fastapi import APIRouter, BackgroundTasks

from app import schemas

router = APIRouter()
logger = logging.getLogger(__name__)


def procesar_noticias():
    logger.info("Estoy procesando noticias")


@router.post("/update/", response_model=schemas.Msg, status_code=201)
def run_update(background_tasks: BackgroundTasks) -> Any:
    """
    Lanzar la actualización de la base de datos en una tarea en segundo plano.
    Siempre devuelve un mensaje "OK"
    """
    background_tasks.add_task(procesar_noticias)
    return {"msg": "OK"}
