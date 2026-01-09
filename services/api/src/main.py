"""
Agribotics API - Main FastAPI Application
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Agribotics API",
    description="Backend API for Agricultural Intelligence Platform",
    version="1.0.0"
)

# CORS Configuration
origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routers (will be created next)
# from src.routes import auth, crops, disease, soil, weather, mandi

# Register routers
# app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
# app.include_router(crops.router, prefix="/api/crops", tags=["Crops"])
# app.include_router(disease.router, prefix="/api/disease", tags=["Disease Detection"])
# app.include_router(soil.router, prefix="/api/soil", tags=["Soil Analysis"])
# app.include_router(weather.router, prefix="/api/weather", tags=["Weather"])
# app.include_router(mandi.router, prefix="/api/mandi", tags=["Mandi Prices"])

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Agribotics API",
        "version": "1.0.0"
    }

@app.get("/api/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "ok",
        "database": "connected",  # Will implement actual DB check
        "ml_models": "loaded"     # Will implement actual model check
    }
