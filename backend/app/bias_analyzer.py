"""
Bias Detection Algorithm for News Articles

This module analyzes article content to determine political bias on a scale from -100 (left) to +100 (right).
"""

# Left-wing indicators
LEFT_KEYWORDS = {
    # Social issues
    "progressive", "liberal", "equality", "diversity", "inclusion", "social justice",
    "climate action", "renewable energy", "environmental protection",
    "workers' rights", "labor union", "minimum wage", "universal healthcare",
    "public education", "welfare", "social programs", "redistribution",
    
    # Economic
    "regulate corporations", "tax the rich", "wealth tax", "corporate accountability",
    "public sector", "nationalize", "subsidize", "government intervention",
    
    # Political terms
    "congress party", "left alliance", "secular", "minority rights",
    "affirmative action", "reservation", "social welfare"
}

# Right-wing indicators
RIGHT_KEYWORDS = {
    # Economic
    "free market", "privatization", "deregulation", "tax cuts", "business friendly",
    "entrepreneurship", "private sector", "capitalism", "economic growth",
    "fiscal responsibility", "reduce spending", "lower taxes",
    
    # Social/Cultural
    "traditional values", "national security", "strong borders", "law and order",
    "military strength", "patriotism", "cultural heritage", "national pride",
    
    # Political terms
    "bjp", "hindutva", "nationalism", "hindu rashtra", "anti-corruption",
    "development", "infrastructure", "make in india"
}

# Neutral/balanced terms (reduce bias score)
NEUTRAL_KEYWORDS = {
    "according to", "sources say", "reports indicate", "data shows",
    "experts say", "analysis reveals", "study finds", "research shows",
    "both sides", "debate", "discussion", "various perspectives"
}

# Emotional/loaded language multipliers
EMOTIONAL_LEFT = {
    "oppression", "exploitation", "inequality", "injustice", "discrimination",
    "marginalized", "vulnerable", "suffering", "crisis", "urgent action needed"
}

EMOTIONAL_RIGHT = {
    "threat", "danger", "invasion", "illegal", "radical", "extremist",
    "anti-national", "terrorist", "sedition", "betrayal", "attack on culture"
}


def calculate_bias_score(title: str, summary: str = "") -> float:
    """
    Calculate bias score for an article based on content analysis.
    
    Returns:
        float: Bias score from -100 (far left) to +100 (far right), 0 is center
    """
    text = (title + " " + summary).lower()
    
    # Count keyword occurrences
    left_count = sum(1 for keyword in LEFT_KEYWORDS if keyword in text)
    right_count = sum(1 for keyword in RIGHT_KEYWORDS if keyword in text)
    neutral_count = sum(1 for keyword in NEUTRAL_KEYWORDS if keyword in text)
    
    # Count emotional language (weighted more heavily)
    emotional_left = sum(2 for keyword in EMOTIONAL_LEFT if keyword in text)
    emotional_right = sum(2 for keyword in EMOTIONAL_RIGHT if keyword in text)
    
    # Total scores
    left_total = left_count + emotional_left
    right_total = right_count + emotional_right
    
    # Calculate raw bias
    if left_total == 0 and right_total == 0:
        return 0.0
    
    total_bias_indicators = left_total + right_total
    
    # Calculate percentage difference
    if total_bias_indicators > 0:
        bias_ratio = (right_total - left_total) / total_bias_indicators
        bias_score = bias_ratio * 100
        
        # Apply neutral modifier (reduces extremity)
        if neutral_count > 0:
            reduction_factor = min(0.3, neutral_count * 0.1)
            bias_score = bias_score * (1 - reduction_factor)
        
        # Cap at -100 to +100
        return max(-100, min(100, bias_score))
    
    return 0.0


def get_bias_label(bias_score: float) -> str:
    """
    Convert bias score to human-readable label.
    
    Args:
        bias_score: Score from -100 to +100
        
    Returns:
        str: "Left", "Center-Left", "Center", "Center-Right", or "Right"
    """
    if bias_score < -30:
        return "Left"
    elif bias_score < -10:
        return "Center-Left"
    elif bias_score <= 10:
        return "Center"
    elif bias_score <= 30:
        return "Center-Right"
    else:
        return "Right"


def get_bias_percentage(bias_score: float) -> dict:
    """
    Convert bias score to percentage breakdown.
    
    Args:
        bias_score: Score from -100 to +100
        
    Returns:
        dict: {"left": %, "center": %, "right": %}
    """
    # Normalize score to 0-100 range
    normalized = (bias_score + 100) / 2  # Now 0-100
    
    if bias_score < -20:  # Left-leaning
        left_pct = 50 + abs(bias_score) / 2
        right_pct = max(0, 10 - abs(bias_score) / 10)
        center_pct = 100 - left_pct - right_pct
    elif bias_score > 20:  # Right-leaning
        right_pct = 50 + bias_score / 2
        left_pct = max(0, 10 - bias_score / 10)
        center_pct = 100 - left_pct - right_pct
    else:  # Center
        center_pct = 60 + (20 - abs(bias_score))
        if bias_score < 0:
            left_pct = 30 + abs(bias_score)
            right_pct = 100 - center_pct - left_pct
        else:
            right_pct = 30 + bias_score
            left_pct = 100 - center_pct - right_pct
    
    return {
        "left": round(max(0, min(100, left_pct)), 1),
        "center": round(max(0, min(100, center_pct)), 1),
        "right": round(max(0, min(100, right_pct)), 1)
    }
