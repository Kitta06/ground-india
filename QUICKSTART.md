# Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### 1. Start the Application
```bash
docker-compose up -d
```

### 2. Initialize Data
```bash
# Seed news sources
docker-compose exec backend python scripts/seed_sample_data.py

# Fetch articles
docker-compose exec backend python scripts/trigger_fetch.py
```

### 3. Access the App
- **Website**: http://localhost:5173
- **API Docs**: http://localhost:8000/docs

### 4. Test Login
- Email: `admin@example.com`
- Password: `admin`

---

## 📝 Common Commands

### Development
```bash
# View logs
docker-compose logs -f

# Rebuild frontend
docker-compose up -d --build frontend

# Rebuild backend
docker-compose up -d --build backend

# Stop all services
docker-compose down
```

### Database
```bash
# Access database
docker-compose exec db psql -U groundindia -d groundindia

# Run migrations
docker-compose exec backend alembic upgrade head

# Check data
docker-compose exec backend python scripts/check_data.py
```

---

## 🔍 Project Structure (Simplified)

```
ground-india/
├── backend/           # Python FastAPI
│   ├── app/          # Application code
│   └── scripts/      # Utility scripts
├── frontend/         # React app
│   └── src/         # Source code
└── docker-compose.yml # Start everything
```

---

## 📚 Full Documentation
See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed developer guide.
