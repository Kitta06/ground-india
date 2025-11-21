import asyncio
from celery import Celery
from app.core.config import settings
from app.db.session import async_session
from app.crud import create_article, get_sources
from app.schemas import ArticleCreate
import feedparser
from datetime import datetime
from time import mktime

celery_app = Celery("worker", broker=settings.CELERY_BROKER_URL, backend=settings.CELERY_RESULT_BACKEND)

celery_app.conf.beat_schedule = {
    "fetch-news-every-30-minutes": {
        "task": "app.tasks.fetch_news_task",
        "schedule": 1800.0,
    },
}

async def fetch_feed(url: str, source_id: int):
    feed = feedparser.parse(url)
    async with async_session() as session:
        for entry in feed.entries[:10]: # Limit to 10 for now
            try:
                published_at = datetime.fromtimestamp(mktime(entry.published_parsed)) if hasattr(entry, "published_parsed") else datetime.utcnow()
                article = ArticleCreate(
                    title=entry.title,
                    summary=entry.summary if hasattr(entry, "summary") else None,
                    url=entry.link,
                    published_at=published_at,
                    source_id=source_id,
                    category="General" # Basic categorization
                )
                # Check if exists logic should be here or in CRUD (CRUD creates blindly currently, but unique constraint on URL handles it)
                try:
                    await create_article(session, article)
                    print(f"Saved: {entry.title}")
                except Exception as e:
                    print(f"Skipping duplicate or error: {entry.title} - {e}")
                    await session.rollback()
            except Exception as e:
                print(f"Error processing entry: {e}")

async def fetch_all_feeds_async():
    async with async_session() as session:
        sources = await get_sources(session)
        tasks = []
        for source in sources:
            if source.feed_url:
                tasks.append(fetch_feed(source.feed_url, source.id))
        await asyncio.gather(*tasks)

@celery_app.task
def fetch_news_task():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(fetch_all_feeds_async())
    return "News fetch completed"
