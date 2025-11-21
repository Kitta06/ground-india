# Ground-India Development Guide

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Testing](#testing)
- [Deployment](#deployment)

---

## 🎯 Project Overview

Ground-India is a news aggregation platform that fetches articles from multiple Indian news sources and provides bias analysis to help users see every side of every story.

### Key Features
- Multi-source news aggregation (8 Indian sources)
- Bias analysis and visualization
- User authentication (JWT)
- Automated news fetching (Celery + Redis)
- Dark/light mode
- Category filtering
- Responsive design

### Tech Stack
**Backend:**
- FastAPI (Python 3.11)
- PostgreSQL (Database)
- SQLModel (ORM)
- Celery + Redis (Background tasks)
- Alembic (Migrations)

**Frontend:**
- React 18
- Vite (Build tool)
- Tailwind CSS
- React Query
- React Router

---

## 🏗️ Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Browser   │────▶│    Nginx     │────▶│   React     │
│             │     │  (Port 5173) │     │  Frontend   │
└─────────────┘     └──────────────┘     └─────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │   FastAPI    │
                    │   Backend    │
                    │  (Port 8000) │
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  PostgreSQL  │   │    Redis     │   │    Celery    │
│   Database   │   │    Cache     │   │    Worker    │
└──────────────┘   └──────────────┘   └──────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Docker Desktop
- Git
- Code editor (VS Code recommended)

### Initial Setup

1. **Clone the repository**
```bash
git clone https://github.com/Kitta06/ground-india.git
cd ground-india
```

2. **Environment setup**
```bash
# Copy example env file
cp .env.example .env

# Edit .env with your settings (optional for local development)
```

3. **Start all services**
```bash
docker-compose up -d
```

4. **Initialize database and seed data**
```bash
# Seed news sources
docker-compose exec backend python scripts/seed_sample_data.py

# Fetch initial articles
docker-compose exec backend python scripts/trigger_fetch.py

# (Optional) Create test user
docker-compose exec backend python scripts/create_test_user.py
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 💻 Development Workflow

### Making Changes

**Frontend Development:**
```bash
# After making changes to frontend code
docker-compose up -d --build frontend

# Or restart just the frontend
docker-compose restart frontend
```

**Backend Development:**
```bash
# After making changes to backend code
docker-compose up -d --build backend

# Or restart just the backend
docker-compose restart backend
```

### Viewing Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f worker
```

### Database Operations

**Create migration:**
```bash
docker-compose exec backend alembic revision --autogenerate -m "description"
```

**Apply migrations:**
```bash
docker-compose exec backend alembic upgrade head
```

**Rollback migration:**
```bash
docker-compose exec backend alembic downgrade -1
```

**Access database:**
```bash
docker-compose exec db psql -U groundindia -d groundindia
```

### Running Scripts
```bash
# Seed sources
docker-compose exec backend python scripts/seed_sample_data.py

# Fetch news
docker-compose exec backend python scripts/trigger_fetch.py

# Create test user
docker-compose exec backend python scripts/create_test_user.py

# Check data
docker-compose exec backend python scripts/check_data.py
```

---

## 📁 Project Structure

```
ground-india/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   └── v1/
│   │   │       ├── api.py     # Main router
│   │   │       └── endpoints/ # Endpoint modules
│   │   │           ├── articles.py
│   │   │           ├── sources.py
│   │   │           ├── login.py
│   │   │           └── users.py
│   │   ├── core/              # Core configuration
│   │   │   ├── config.py      # Settings
│   │   │   └── security.py    # Auth utilities
│   │   ├── models.py          # Database models
│   │   ├── schemas.py         # Pydantic schemas
│   │   ├── crud.py            # Database operations
│   │   ├── tasks.py           # Celery tasks
│   │   └── main.py            # FastAPI app
│   ├── alembic/               # Database migrations
│   │   ├── versions/          # Migration files
│   │   └── env.py             # Alembic config
│   ├── scripts/               # Utility scripts
│   │   ├── seed_sample_data.py
│   │   ├── trigger_fetch.py
│   │   ├── create_test_user.py
│   │   └── check_data.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── start.sh               # Startup script
│
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── CategoryNav.jsx
│   │   │   ├── ArticleCard.jsx
│   │   │   └── ArticleSkeleton.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Sources.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── context/           # React contexts
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── index.html
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── docker-compose.yml          # Docker orchestration
├── .env.example               # Environment template
├── .gitignore
└── README.md
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Endpoints

#### Articles
```http
GET /articles/
```
Returns all articles with source information.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Article title",
    "url": "https://...",
    "summary": "Article summary",
    "published_at": "2024-01-01T00:00:00",
    "image_url": "https://...",
    "category": "Politics",
    "source": {
      "id": 1,
      "name": "The Hindu",
      "bias_rating": -2.5,
      "reliability_score": 85
    }
  }
]
```

#### Sources
```http
GET /sources/
```
Returns all news sources.

#### Authentication
```http
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=user@example.com&password=password
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer"
}
```

#### User Registration
```http
POST /users/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Interactive API Docs
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 🗄️ Database

### Schema

**Users Table:**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL
);
```

**Sources Table:**
```sql
CREATE TABLE sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    url VARCHAR NOT NULL,
    rss_url VARCHAR NOT NULL,
    bias_rating FLOAT,
    reliability_score FLOAT
);
```

**Articles Table:**
```sql
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    url VARCHAR UNIQUE NOT NULL,
    summary TEXT,
    published_at TIMESTAMP,
    image_url VARCHAR,
    category VARCHAR,
    source_id INTEGER REFERENCES sources(id)
);
```

### Accessing Database
```bash
# Via Docker
docker-compose exec db psql -U groundindia -d groundindia

# Common queries
SELECT COUNT(*) FROM articles;
SELECT COUNT(*) FROM sources;
SELECT * FROM sources;
```

---

## 🧪 Testing

### Manual Testing

**Test User Credentials:**
- Email: `admin@example.com`
- Password: `admin`

**Test Workflow:**
1. Visit http://localhost:5173
2. Click "Sign In"
3. Login with test credentials
4. Browse articles
5. Test category filtering
6. Toggle dark/light mode

### API Testing
Use the interactive docs at http://localhost:8000/docs to test endpoints.

---

## 🚢 Deployment

### Production Checklist

1. **Update environment variables**
```env
DATABASE_URL=postgresql://user:pass@production-db:5432/db
SECRET_KEY=generate-strong-secret-key
ENVIRONMENT=production
```

2. **Build production images**
```bash
docker-compose -f docker-compose.prod.yml build
```

3. **Run migrations**
```bash
docker-compose exec backend alembic upgrade head
```

4. **Seed data**
```bash
docker-compose exec backend python scripts/seed_sample_data.py
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `SECRET_KEY` | JWT secret key | Required |
| `ALGORITHM` | JWT algorithm | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiry | `30` |
| `REDIS_URL` | Redis connection string | `redis://redis:6379/0` |

---

## 🔧 Common Tasks

### Add a New News Source
1. Edit `scripts/seed_sample_data.py`
2. Add source to `sources_data` list
3. Run: `docker-compose exec backend python scripts/seed_sample_data.py`

### Update Frontend Styling
1. Edit files in `frontend/src/`
2. Rebuild: `docker-compose up -d --build frontend`

### Add New API Endpoint
1. Create endpoint in `backend/app/api/v1/endpoints/`
2. Add to router in `backend/app/api/v1/api.py`
3. Restart: `docker-compose restart backend`

### Modify Database Schema
1. Update models in `backend/app/models.py`
2. Generate migration: `docker-compose exec backend alembic revision --autogenerate -m "description"`
3. Apply: `docker-compose exec backend alembic upgrade head`

---

## 🐛 Troubleshooting

### Frontend not updating
```bash
docker-compose up -d --build frontend
```

### Database connection errors
```bash
# Check if database is running
docker-compose ps

# Restart database
docker-compose restart db
```

### Celery not fetching news
```bash
# Check worker logs
docker-compose logs -f worker

# Manually trigger fetch
docker-compose exec backend python scripts/trigger_fetch.py
```

### Port already in use
```bash
# Stop all containers
docker-compose down

# Start again
docker-compose up -d
```

---

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SQLModel](https://sqlmodel.tiangolo.com/)
- [Celery](https://docs.celeryq.dev/)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Happy coding! 🚀**
