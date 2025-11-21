#!/bin/bash
set -e

# Let the DB start
sleep 5

# Run migrations
# Check if any migration files exist
if [ -z "$(ls -A alembic/versions)" ]; then
   echo "No migrations found. Generating initial migration..."
   alembic revision --autogenerate -m "Initial migration"
fi
alembic upgrade head

# Start the application
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
