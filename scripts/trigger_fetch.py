import asyncio
import sys
import os

# Add /app to path so we can import app modules
sys.path.append('/app')

from app.tasks import fetch_all_feeds_async

async def trigger_fetch():
    print("Triggering manual news fetch...")
    await fetch_all_feeds_async()
    print("Manual news fetch completed.")

if __name__ == "__main__":
    asyncio.run(trigger_fetch())
