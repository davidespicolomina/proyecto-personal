import logging
from typing import List

import scrapy
from app.api.deps import with_transaction
from app.api.scrapy.spiders import BaseSpider
from app.crud import article
from app.schemas import ArticleCreate

logger = logging.getLogger(__name__)


class MarcaSpider(BaseSpider):
    name = "marca"
    start_urls = [
        "https://www.marca.com/futbol.html?intcmp=MENUPROD&s_kw=futbol",
        "https://www.marca.com/futbol/primera-division.html?intcmp=MENUMIGA&s_kw=laliga-santander",
        "https://www.marca.com/futbol/segunda-division.html?intcmp=MENUMIGA&s_kw=laliga-smartbank",
        "https://www.marca.com/futbol/mas-futbol.html?intcmp=MENUPROD&s_kw=segunda-b",
    ]

    def get_source_name(self) -> str:
        return "marca"

    def get_article_summary(self, response, article_info: ArticleCreate, db_session):
        summary: List[str] = []
        # sólo los p de la primera row content
        for web_article in response.css("article"):
            for row in web_article.css("div.row.content"):
                for paragraph in row.css("p"):
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
        logger.info(f"Marca spider para buscar {search_terms}")
        for web_article in response.css("article"):
            title: str = str(web_article.css("a::text").get())
            url: str = str(web_article.css("a::attr(href)").get())
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
