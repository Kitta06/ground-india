import asyncio
import sys
import os

# Add /app to path so we can import app modules
sys.path.append('/app')

from app.db.session import async_session
from app.crud import create_source
from app.schemas import SourceCreate

async def seed_data():
    print("Seeding data...")
    async with async_session() as session:
        # Create Sources with category-specific feeds
        sources_data = [
            # General News
            {
                "name": "The Hindu",
                "url": "https://www.thehindu.com",
                "feed_url": "https://www.thehindu.com/news/national/feeder/default.rss",
                "bias_rating": -2.5,
                "reliability_score": 85.0
            },
            {
                "name": "NDTV",
                "url": "https://www.ndtv.com",
                "feed_url": "https://feeds.feedburner.com/ndtvnews-top-stories",
                "bias_rating": -1.5,
                "reliability_score": 80.0
            },
            {
                "name": "Indian Express",
                "url": "https://indianexpress.com",
                "feed_url": "https://indianexpress.com/feed/",
                "bias_rating": -1.0,
                "reliability_score": 82.0
            },
            {
                "name": "Times of India",
                "url": "https://timesofindia.indiatimes.com",
                "feed_url": "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
                "bias_rating": 1.0,
                "reliability_score": 75.0
            },
            {
                "name": "Hindustan Times",
                "url": "https://www.hindustantimes.com",
                "feed_url": "https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml",
                "bias_rating": 0.5,
                "reliability_score": 78.0
            },
            {
                "name": "India Today",
                "url": "https://www.indiatoday.in",
                "feed_url": "https://www.indiatoday.in/rss/home",
                "bias_rating": 0.0,
                "reliability_score": 77.0
            },
            {
                "name": "News18",
                "url": "https://www.news18.com",
                "feed_url": "https://www.news18.com/rss/india.xml",
                "bias_rating": 2.0,
                "reliability_score": 72.0
            },
            {
                "name": "Zee News",
                "url": "https://zeenews.india.com",
                "feed_url": "https://zeenews.india.com/rss/india-national-news.xml",
                "bias_rating": 3.5,
                "reliability_score": 70.0
            },
            # Sports-specific feeds
            {
                "name": "The Hindu - Sports",
                "url": "https://www.thehindu.com/sport",
                "feed_url": "https://www.thehindu.com/sport/feeder/default.rss",
                "bias_rating": 0.0,
                "reliability_score": 85.0
            },
            {
                "name": "NDTV Sports",
                "url": "https://sports.ndtv.com",
                "feed_url": "https://feeds.feedburner.com/ndtvsports-latest",
                "bias_rating": 0.0,
                "reliability_score": 80.0
            },
            {
                "name": "Times of India - Sports",
                "url": "https://timesofindia.indiatimes.com/sports",
                "feed_url": "https://timesofindia.indiatimes.com/rssfeeds/4719148.cms",
                "bias_rating": 0.0,
                "reliability_score": 75.0
            },
            {
                "name": "India Today - Sports",
                "url": "https://www.indiatoday.in/sports",
                "feed_url": "https://www.indiatoday.in/rss/1206578",
                "bias_rating": 0.0,
                "reliability_score": 77.0
            },
            # Business/Economy feeds
            {
                "name": "Moneycontrol",
                "url": "https://www.moneycontrol.com",
                "feed_url": "https://www.moneycontrol.com/rss/latestnews.xml",
                "bias_rating": 0.5,
                "reliability_score": 80.0
            },
            {
                "name": "Economic Times",
                "url": "https://economictimes.indiatimes.com",
                "feed_url": "https://economictimes.indiatimes.com/rssfeedstopstories.cms",
                "bias_rating": 1.5,
                "reliability_score": 82.0
            },
            # Entertainment
            {
                "name": "Times of India - Entertainment",
                "url": "https://timesofindia.indiatimes.com/entertainment",
                "feed_url": "https://timesofindia.indiatimes.com/rssfeeds/1081479906.cms",
                "bias_rating": 0.0,
                "reliability_score": 70.0
            }
        ]

        for s in sources_data:
            try:
                await create_source(session, SourceCreate(**s))
                print(f"Created source: {s['name']}")
            except Exception as e:
                print(f"Source {s['name']} might already exist or error: {e}")
                await session.rollback()
    
    print("Seeding complete.")

if __name__ == "__main__":
    asyncio.run(seed_data())
