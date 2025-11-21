import asyncio
import sys
import os

# Add /app to path so we can import app modules
sys.path.append('/app')

from app.db.session import async_session
from app.models import Source, Article
from sqlalchemy import select, func

async def check_data():
    print("Checking data...")
    async with async_session() as session:
        # Count Sources
        result = await session.execute(select(func.count(Source.id)))
        source_count = result.scalar()
        print(f"Total Sources: {source_count}")

        # Count Articles
        result = await session.execute(select(func.count(Article.id)))
        article_count = result.scalar()
        print(f"Total Articles: {article_count}")
        
        # List some articles
        result = await session.execute(select(Article).limit(5))
        articles = result.scalars().all()
        print("\nSample Articles:")
        for a in articles:
            print(f"- {a.title} ({a.url})")

if __name__ == "__main__":
    asyncio.run(check_data())
