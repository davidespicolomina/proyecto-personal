import logging
import scrapy
from app.api.api_v1.endpoints.search_terms import create_search_term
from app.api.deps import with_transaction
from app.schemas import SearchTermCreate

logger = logging.getLogger(__name__)


class MarcaSpider(scrapy.Spider):
    name = "quotes"
    start_urls = ["http://quotes.toscrape.com/page/1/"]

    @with_transaction
    def parse(self, response, db_session, **kwargs):
        logger.warning("Spider parse")
        create_search_term(
            db=db_session, search_term_in=SearchTermCreate(term="prueba!!!")
        )
        for quote in response.css("div.quote"):
            print(f"text -> {quote.css('span.text::text').get()}")
            yield {
                "text": quote.css("span.text::text").get(),
                "author": quote.css("small.author::text").get(),
                "tags": quote.css("div.tags a.tag::text").getall(),
            }

        next_page = response.css("li.next a::attr(href)").get()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)
