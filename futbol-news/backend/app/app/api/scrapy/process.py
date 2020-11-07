import logging
from typing import List

from app.api.deps import with_transaction
from app.api.scrapy.spiders.marca import MarcaSpider
from app.crud import search_term
from billiard.context import Process
from scrapy import signals
from scrapy.crawler import Crawler
from scrapy.utils.project import get_project_settings
from twisted.internet import reactor

logger = logging.getLogger(__name__)


class CrawlerProcess(Process):
    def __init__(self, spider):
        Process.__init__(self)
        settings = get_project_settings()
        self.crawler = Crawler(spider.__class__, settings)
        self.crawler.signals.connect(reactor.stop, signal=signals.spider_closed)
        self.spider = spider

    def run(self):
        self.crawler.crawl(self.spider)
        reactor.run()


def crawl_news():
    logger.info(f"Crawl news")
    spider = MarcaSpider()
    crawler = CrawlerProcess(spider)
    crawler.start()
    crawler.join()
