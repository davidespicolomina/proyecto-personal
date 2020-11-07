from typing import List

import scrapy
from app.crud import search_term


class BaseSpider(scrapy.Spider):
    def get_search_terms_list(self, db_session) -> List[str]:
        return [t.term for t in search_term.get_multi(db=db_session)]

    def get_source_name(self) -> str:
        return "undefined"
