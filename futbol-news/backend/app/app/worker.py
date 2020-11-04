import logging

from app.api.scrapy.process import crawl_news
from app.core.config import settings
from raven import Client

from app.core.celery_app import celery_app

client_sentry = Client(settings.SENTRY_DSN)
logger = logging.getLogger(__name__)


@celery_app.task(acks_late=True)
def test_celery(word: str) -> str:
    return f"test task return {word}"


@celery_app.task(acks_late=True)
def task_crawl_news() -> None:
    logger.warning("task_crawl_news")
    crawl_news()
