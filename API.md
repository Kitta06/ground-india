# API Reference

## Base URL
```
http://localhost:8000/api/v1
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### 📰 Articles

#### Get All Articles
```http
GET /articles/
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Breaking News Title",
    "url": "https://source.com/article",
    "summary": "Article summary text...",
    "published_at": "2024-01-01T12:00:00",
    "image_url": "https://source.com/image.jpg",
    "category": "Politics",
    "source": {
      "id": 1,
      "name": "The Hindu",
      "url": "https://thehindu.com",
      "bias_rating": -2.5,
      "reliability_score": 85.0
    }
  }
]
```

---

### 📡 Sources

#### Get All Sources
```http
GET /sources/
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "The Hindu",
    "url": "https://thehindu.com",
    "rss_url": "https://thehindu.com/rss",
    "bias_rating": -2.5,
    "reliability_score": 85.0
  }
]
```

---

### 🔐 Authentication

#### Login
```http
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=user@example.com&password=password
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

**Error Response:** `401 Unauthorized`
```json
{
  "detail": "Incorrect email or password"
}
```

---

### 👤 Users

#### Register New User
```http
POST /users/signup
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "securepassword123"
}
```

**Response:** `200 OK`
```json
{
  "id": 2,
  "email": "newuser@example.com"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "detail": "Email already registered"
}
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Internal Server Error |

---

## Interactive Documentation

Visit these URLs for interactive API testing:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
