#!/usr/bin/env bash
set -o errexit

echo "==> Building React frontend"
cd frontend
npm install
npm run build
cd ..

echo "==> Installing backend dependencies"
cd backend
pip install -r requirements.txt

echo "==> Collecting static files"
python manage.py collectstatic --no-input

echo "==> Running migrations"
python manage.py migrate
