import asyncio
import sys
import os

# Add /app to path so we can import app modules
sys.path.append('/app')

from app.db.session import async_session
from app.crud import create_source, create_article
from app.schemas import SourceCreate, ArticleCreate
from datetime import datetime

async def seed_data():
    print("Seeding data...")
    async with async_session() as session:
        # Create Sources
        sources_data = [
            {
                "name": "The Hindu",
                "url": "https://www.thehindu.com/",
                "feed_url": "https://www.thehindu.com/news/national/feeder/default.rss",
                "bias_rating": -2,
                "reliability_rating": 9
            },
            {
                "name": "NDTV",
                "url": "https://www.ndtv.com/",
                "feed_url": "https://feeds.feedburner.com/ndtvnews-top-stories",
                "bias_rating": -3,
                "reliability_rating": 8
            },
            {
                "name": "Indian Express",
                "url": "https://indianexpress.com/",
                "feed_url": "https://indianexpress.com/section/india/feed/",
                "bias_rating": -1,
                "reliability_rating": 9
            },
            {
                "name": "Times of India",
                "url": "https://timesofindia.indiatimes.com/",
                "feed_url": "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
                "bias_rating": 1,
                "reliability_rating": 7
            },
            {
                "name": "Hindustan Times",
                "url": "https://www.hindustantimes.com/",
                "feed_url": "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml",
                "bias_rating": 0,
                "reliability_rating": 8
            },
            {
                "name": "India Today",
                "url": "https://www.indiatoday.in/",
                "feed_url": "https://www.indiatoday.in/rss/1206584",
                "bias_rating": -1,
                "reliability_rating": 8
            },
            {
                "name": "News18",
                "url": "https://www.news18.com/",
                "feed_url": "https://www.news18.com/common-feeds/v1/eng/news18/india.xml",
                "bias_rating": 2,
                "reliability_rating": 6
            },
            {
                "name": "Zee News",
                "url": "https://zeenews.india.com/",
                "feed_url": "https://zeenews.india.com/rss/india-national-news.xml",
                "bias_rating": 3,
                "reliability_rating": 5
            }
        ]

        for s in sources_data:
            try:
                # Check if source exists by name to avoid duplicates if re-running
                # Ideally we should have a get_source_by_name or similar, but for seeding we can try create and catch
                # Or better, let's just try to create and ignore if it fails (likely due to unique constraint if we had one, but we don't on name yet?)
                # SourceBase has name: str = Field(index=True). Not unique. 
                # But let's assume we want to avoid duplicates.
                # For now, we'll just try to create.
                await create_source(session, SourceCreate(**s))
                print(f"Created source: {s['name']}")
            except Exception as e:
                print(f"Source {s['name']} might already exist or error: {e}")
                await session.rollback()
    
    print("Seeding complete.")

if __name__ == "__main__":
    asyncio.run(seed_data())
