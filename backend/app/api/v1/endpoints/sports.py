from fastapi import APIRouter, HTTPException
import httpx
from typing import List, Dict, Any
import os

router = APIRouter()

# Free sports API - using API-FOOTBALL (you can also use other free APIs)
# For production, get your API key from https://www.api-football.com/
SPORTS_API_KEY = os.getenv("SPORTS_API_KEY", "test")  # Replace with actual API key

@router.get("/live-scores")
async def get_live_scores() -> List[Dict[str, Any]]:
    """
    Fetch live sports scores from multiple sources.
    Returns only matches that are currently live.
    """
    live_matches = []
    
    try:
        # Fetch live cricket scores (using cricapi or similar)
        cricket_matches = await fetch_live_cricket()
        live_matches.extend(cricket_matches)
        
        # Fetch live football scores
        football_matches = await fetch_live_football()
        live_matches.extend(football_matches)
        
    except Exception as e:
        print(f"Error fetching live scores: {e}")
        # Return empty list if API fails
        return []
    
    # Filter to only return matches that are actually live
    return [match for match in live_matches if match.get("isLive", False)]


async def fetch_live_cricket() -> List[Dict[str, Any]]:
    """Fetch live cricket matches"""
    matches = []
    
    try:
        # Using cricapi.com free tier (25 requests/hour)
        # You can also use: https://www.cricbuzz.com/api or espncricinfo
        async with httpx.AsyncClient(timeout=10.0) as client:
            # This is a mock response structure - replace with actual API call
            # response = await client.get(
            #     "https://api.cricapi.com/v1/currentMatches",
            #     params={"apikey": SPORTS_API_KEY}
            # )
            
            # For now, return structured empty data
            # In production, parse the API response here
            pass
            
    except Exception as e:
        print(f"Cricket API error: {e}")
    
    return matches


async def fetch_live_football() -> List[Dict[str, Any]]:
    """Fetch live football matches"""
    matches = []
    
    try:
        # Using API-Football free tier
        async with httpx.AsyncClient(timeout=10.0) as client:
            # Example API call structure
            # response = await client.get(
            #     "https://v3.football.api-sports.io/fixtures",
            #     headers={"x-apisports-key": SPORTS_API_KEY},
            #     params={"live": "all"}
            # )
            
            # For now, return structured empty data
            pass
            
    except Exception as e:
        print(f"Football API error: {e}")
    
    return matches


@router.get("/live-scores/demo")
async def get_demo_scores() -> List[Dict[str, Any]]:
    """
    Return demo live scores for testing.
    This endpoint simulates live matches for demonstration.
    """
    import random
    from datetime import datetime
    
    # Simulate some live matches
    demo_matches = [
        {
            "id": "cricket_1",
            "sport": "Cricket",
            "league": "IPL 2024",
            "status": "LIVE",
            "team1": {
                "name": "Mumbai Indians",
                "short": "MI",
                "score": f"{random.randint(150, 200)}/{random.randint(3, 7)}",
                "overs": f"{random.randint(15, 19)}.{random.randint(0, 5)}"
            },
            "team2": {
                "name": "Chennai Super Kings",
                "short": "CSK",
                "score": f"{random.randint(120, 180)}/{random.randint(4, 8)}",
                "overs": f"{random.randint(12, 17)}.{random.randint(0, 5)}"
            },
            "venue": "Wankhede Stadium, Mumbai",
            "detailsUrl": "https://www.espncricinfo.com",
            "isLive": True,
            "lastUpdated": datetime.now().isoformat()
        },
        {
            "id": "football_1",
            "sport": "Football",
            "league": "Premier League",
            "status": "LIVE",
            "team1": {
                "name": "Manchester United",
                "short": "MUN",
                "score": str(random.randint(0, 3))
            },
            "team2": {
                "name": "Liverpool",
                "short": "LIV",
                "score": str(random.randint(0, 3))
            },
            "time": f"{random.randint(45, 90)}'",
            "venue": "Old Trafford",
            "detailsUrl": "https://www.premierleague.com",
            "isLive": True,
            "lastUpdated": datetime.now().isoformat()
        }
    ]
    
    return demo_matches
