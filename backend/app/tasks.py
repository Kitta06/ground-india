import asyncio
from celery import Celery
from app.core.config import settings
from app.db.session import async_session
from app.crud import create_article, get_sources
from app.schemas import ArticleCreate
from app.bias_analyzer import calculate_bias_score, get_bias_label
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

def categorize_article(title: str, summary: str = "") -> str:
    """Categorize article based on keywords in title and summary"""
    text = (title + " " + summary).lower()
    
    # Category keywords
    categories = {
        "Politics": ["election", "government", "minister", "parliament", "political", "party", "bjp", "congress", "vote", "policy", "law", "supreme court", "president", "prime minister"],
        "Business": ["business", "economy", "market", "stock", "company", "corporate", "trade", "finance", "bank", "rupee", "gdp", "industry", "startup", "investment"],
        "Technology": ["technology", "tech", "ai", "artificial intelligence", "software", "app", "digital", "internet", "cyber", "smartphone", "computer", "innovation", "startup"],
        "Health": ["health", "medical", "hospital", "doctor", "disease", "covid", "vaccine", "medicine", "patient", "treatment", "healthcare"],
        "Environment": ["environment", "climate", "pollution", "green", "renewable", "carbon", "weather", "forest", "wildlife", "conservation"],
        "Sports": ["cricket", "football", "sports", "match", "player", "team", "tournament", "olympics", "ipl", "fifa", "championship"],
        "Entertainment": ["film", "movie", "actor", "actress", "bollywood", "music", "celebrity", "entertainment", "show", "series", "netflix"]
    }
    
    # Count matches for each category
    scores = {}
    for category, keywords in categories.items():
        score = sum(1 for keyword in keywords if keyword in text)
        if score > 0:
            scores[category] = score
    
    # Return category with highest score, or "General" if no matches
    if scores:
        return max(scores, key=scores.get)
    return "General"

async def fetch_feed(url: str, source_id: int):
    feed = feedparser.parse(url)
    async with async_session() as session:
        # Fetch more entries (up to 50) to get past week's news
        for entry in feed.entries[:50]:
            try:
                published_at = datetime.fromtimestamp(mktime(entry.published_parsed)) if hasattr(entry, "published_parsed") else datetime.utcnow()
                
                # Get summary and image
                summary = entry.summary if hasattr(entry, "summary") else ""
                image_url = None
                
                # Try to extract image from media content or enclosures
                if hasattr(entry, "media_content") and entry.media_content:
                    image_url = entry.media_content[0].get("url")
                elif hasattr(entry, "enclosures") and entry.enclosures:
                    for enclosure in entry.enclosures:
                        if "image" in enclosure.get("type", ""):
                            image_url = enclosure.get("href")
                            break
                
                # Categorize the article
                category = categorize_article(entry.title, summary)
                
                # Calculate bias score
                bias_score = calculate_bias_score(entry.title, summary)
                
                article = ArticleCreate(
                    title=entry.title,
                    summary=summary,
                    url=entry.link,
                    published_at=published_at,
                    source_id=source_id,
                    category=category,
                    image_url=image_url,
                    bias_score=bias_score
                )
                
                try:
                    await create_article(session, article)
                    bias_label = get_bias_label(bias_score)
                    print(f"Saved [{category}] [{bias_label}]: {entry.title}")
                except Exception as e:
                    # Skip duplicates silently
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
