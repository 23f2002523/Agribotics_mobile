# Agribotics - Agricultural Intelligence Platform

## 🌾 Project Architecture

This is a production-ready monorepo for the Agribotics platform - an AI-powered agricultural intelligence system.

## 📁 Project Structure

```
agribotics/
│
├── apps/                     # User-facing applications
│   ├── mobile/               # React Native mobile app
│   ├── admin-dashboard/      # Web admin panel (future)
│   └── farmer-web/           # PWA for farmers (future)
│
├── services/                 # Backend microservices
│   ├── api/                  # FastAPI main backend
│   ├── auth/                 # Authentication service
│   ├── realtime/             # WebSocket service
│   └── notification/         # Push notifications
│
├── ml/                       # Machine Learning
│   ├── training/             # Model training scripts
│   ├── inference/            # Inference services
│   ├── pipelines/            # Data pipelines
│   └── datasets/             # Training datasets
│
├── infra/                    # Infrastructure
│   ├── docker/               # Docker configurations
│   ├── k8s/                  # Kubernetes manifests
│   ├── terraform/            # Infrastructure as Code
│   └── env/                  # Environment configs
│
├── db/                       # Database
│   ├── migrations/           # DB migrations
│   ├── seeds/                # Seed data
│   ├── schemas/              # Schema definitions
│   └── backups/              # Backup scripts
│
└── docs/                     # Documentation
    ├── architecture.md       # System architecture
    ├── api-contracts.md      # API documentation
    └── data-flow.md          # Data flow diagrams
```

## 🚀 Features

### Mobile App (React Native + Expo)
- ✅ Dashboard with weather and crop data
- ✅ AI Assistant (WhatsApp-style chat)
- ✅ Soil Testing (manual entry + file upload)
- ✅ Disease Detection (camera + gallery)
- ✅ Farm Management
- ✅ Profile & Settings

### Backend (FastAPI + Python)
- 🔄 RESTful API
- 🔄 JWT Authentication
- 🔄 MongoDB integration
- 🔄 ML model serving
- 🔄 Real-time features

### Machine Learning
- 🔄 Plant disease detection (CNN)
- 🔄 Crop recommendation (ML)
- 🔄 Soil analysis
- 🔄 Yield prediction

## 🛠️ Tech Stack

### Frontend
- React Native (Expo)
- TypeScript
- expo-router
- expo-image-picker

### Backend
- FastAPI (Python 3.11)
- MongoDB
- Redis (caching)
- JWT authentication

### ML/AI
- TensorFlow
- Keras
- scikit-learn
- OpenCV

### DevOps
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- AWS/GCP (deployment)

## 📝 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB 7.0+
- Docker (optional)

### Quick Start

#### 1. Mobile App
```bash
cd apps/mobile
npm install
npx expo start
```

#### 2. Backend API
```bash
cd services/api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --reload
```

#### 3. Database (Docker)
```bash
cd infra
docker-compose up mongodb
```

#### 4. Full Stack (Docker)
```bash
cd infra
docker-compose up
```

## 📚 Documentation

- [Architecture](docs/architecture.md)
- [API Contracts](docs/api-contracts.md)
- [Data Flow](docs/data-flow.md)

## 🌿 Branches

- `main` - Production-ready code
- `apps` - Mobile/Web applications
- `services` - Backend services
- `ml` - Machine learning models
- `infra` - Infrastructure configs
- `db` - Database schemas
- `docs` - Documentation

## 👥 Team

Agribotics Development Team

## 📄 License

MIT License
