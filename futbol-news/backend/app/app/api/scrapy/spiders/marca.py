import logging
import scrapy
from app.api.deps import with_transaction

logger = logging.getLogger(__name__)


class MarcaSpider(scrapy.Spider):
    name = "marca"
    start_urls = [
        "https://www.marca.com/futbol.html?intcmp=MENUPROD&s_kw=futbol",
        "https://www.marca.com/futbol/primera-division.html?intcmp=MENUMIGA&s_kw=laliga-santander",
        "https://www.marca.com/futbol/segunda-division.html?intcmp=MENUMIGA&s_kw=laliga-smartbank",
        "https://www.marca.com/futbol/mas-futbol.html?intcmp=MENUPROD&s_kw=segunda-b",
    ]

    # TODO: init method to set search terms

    @with_transaction
    def parse(self, response, db_session, **kwargs):
        logger.warning("Marca spider")
        for article in response.css("article"):
            print(f"texto -> {article.css('a::text').get()}")
            print(f"link -> {article.css('a::attr(href)').get()}")
            yield {
                "texto": article.css("a::text").get(),
                "link": article.css("a::attr(href)").get(),
            }
