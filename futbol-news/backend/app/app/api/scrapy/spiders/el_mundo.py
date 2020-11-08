import logging
from typing import List

import scrapy
from app.api.deps import with_transaction
from app.api.scrapy.spiders import BaseSpider
from app.crud import article
from app.schemas import ArticleCreate

logger = logging.getLogger(__name__)


class ElMundoSpider(BaseSpider):
    name = "elmundo"
    start_urls = [
        "https://www.elmundo.es/deportes/futbol.html?intcmp=MENUMIGA01&s_kw=futbol",
        "https://www.elmundo.es/deportes/futbol/primera-division.html?intcmp=MENUMIGA01&s_kw=primera-division",
        "https://www.elmundo.es/deportes/futbol/segunda-division.html?intcmp=MENUMIGA01&s_kw=segunda-division",
        "https://www.elmundo.es/deportes/futbol/segunda-division-b.html?intcmp=MENUMIGA01&s_kw=segunda-division-b",
    ]

    def get_source_name(self) -> str:
        return "el mundo"

    def get_article_summary(self, response, article_info: ArticleCreate, db_session):
        summary: List[str] = []
        # sólo los p de la primera row content
        for web_article in response.css("article"):
            for paragraph in web_article.css("p"):
                text = ""
                for p_text in paragraph.css("*::text").getall():
                    if len(p_text) > 0:
                        text += p_text
                summary.append(text)

        article_info.summary = "\n".join(
            [string for string in summary if len(string) > 1]
        )
        if article_info.summary is None or len(article_info.summary) == 0:
            article_info.summary = "No disponible"
        logger.info(f"Procesado artículo {article_info}")
        article.update_or_create(db=db_session, obj_in=article_info)
        yield article_info.dict()

    @with_transaction
    def parse(self, response, db_session, **kwargs):
        search_terms: List[str] = self.get_search_terms_list(db_session)
        logger.info(f"El mundo spider para buscar {search_terms}")
        for web_article in response.css("article"):
            title: str = ""
            for a in web_article.css("a"):
                for text in a.css("*::text").getall():
                    if len(text) > 0:
                        title += text
                break
            url: str = str(web_article.css("a::attr(href)").get())
            logger.info(f"Artículo {article}")
            logger.info(f"Title {title}")
            logger.info(f"URL {url}")
            to_compare: str = title.upper()
            if any(search_term in to_compare for search_term in search_terms):
                article_info = ArticleCreate(
                    source=self.get_source_name(),
                    title=title,
                    url=url,
                    favorite=False,
                    summary="resumen",
                )
                yield scrapy.Request(
                    url,
                    callback=self.get_article_summary,
                    cb_kwargs={"article_info": article_info, "db_session": db_session},
                )
