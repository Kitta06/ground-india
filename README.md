# Ground-India 🇮🇳

**See every side of every news story** - A news aggregation and bias analysis platform for Indian news sources.

![Ground-India](https://img.shields.io/badge/Status-Active-success)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)

## 🎯 Features

- **Multi-Source News Aggregation**: Fetches news from 8 major Indian sources
- **Bias Analysis**: Visual indicators for media bias (Left/Center/Right)
- **Automated Updates**: Celery tasks fetch fresh news every 30 minutes
- **User Authentication**: JWT-based signup and login
- **Dark/Light Mode**: Toggle between themes
- **Category Filtering**: Filter news by Politics, Business, Technology, etc.
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🏗️ Architecture

### Backend (FastAPI + PostgreSQL)
- **FastAPI**: Modern Python web framework
- **SQLModel**: Database ORM
- **Celery + Redis**: Background task processing
- **PostgreSQL**: Relational database
- **JWT Authentication**: Secure user sessions

### Frontend (React + Vite)
- **React 18**: Modern UI library
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first styling
- **React Query**: Data fetching and caching
- **React Router**: Client-side routing

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/ground-india.git
cd ground-india
```

2. **Create environment file**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start the application**
```bash
docker-compose up -d
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Initial Setup

1. **Seed news sources**
```bash
docker-compose exec backend python scripts/seed_sample_data.py
```

2. **Fetch initial articles**
```bash
docker-compose exec backend python scripts/trigger_fetch.py
```

3. **Create test user** (optional)
```bash
docker-compose exec backend python scripts/create_test_user.py
```

## 📚 News Sources

The platform aggregates news from:
- The Hindu
- NDTV
- Indian Express
- Times of India
- Hindustan Times
- India Today
- News18
- Zee News

Each source includes:
- Bias rating (-10 to +10)
- Reliability score (0-100)
- RSS feed integration

## 🔧 Development

### Project Structure
```
ground-india/
├── backend/              # FastAPI backend
│   ├── app/
│   │   ├── api/         # API endpoints
│   │   ├── core/        # Configuration
│   │   ├── models.py    # Database models
│   │   ├── crud.py      # Database operations
│   │   └── tasks.py     # Celery tasks
│   ├── alembic/         # Database migrations
│   └── scripts/         # Utility scripts
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React contexts
│   │   └── App.jsx      # Main app
│   └── index.html
└── docker-compose.yml   # Docker configuration
```

### Making Changes

**Frontend changes:**
```bash
docker-compose up -d --build frontend
```

**Backend changes:**
```bash
docker-compose up -d --build backend
```

**Database migrations:**
```bash
# Auto-generated on backend startup
# Or manually:
docker-compose exec backend alembic revision --autogenerate -m "description"
docker-compose exec backend alembic upgrade head
```

## 🌐 API Endpoints

- `GET /api/v1/articles/` - Get all articles
- `GET /api/v1/sources/` - Get all news sources
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/users/signup` - User registration

Full API documentation: http://localhost:8000/docs

## 🎨 Features in Detail

### Bias Analysis
Each article displays:
- Source name badge
- Bias indicator (colored dot)
- Bias label (Left/Center/Right)

### Category Filtering
Filter articles by:
- All
- Politics
- Business & Markets
- Technology
- Health & Medicine
- Environment & Climate
- Sports
- Entertainment

### Theme Toggle
Switch between dark and light modes with persistent preference storage.

## 📝 Environment Variables

Create a `.env` file with:
```env
# Database
DATABASE_URL=postgresql://groundindia:password@db:5432/groundindia

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Redis
REDIS_URL=redis://redis:6379/0
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by Ground News
- Built with FastAPI, React, and modern web technologies
- News sources: Major Indian media outlets

---

**Ground-India** - Empowering informed citizens through multi-perspective news analysis.
