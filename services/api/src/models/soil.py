"""
Soil Analysis Model
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class SoilData(BaseModel):
    """Soil test data"""
    user_id: str
    location: Optional[dict] = None
    ph: float
    nitrogen: float  # N in ppm
    phosphorus: float  # P in ppm
    potassium: float  # K in ppm
    organic_carbon: float  # percentage
    moisture: float  # percentage
    test_date: datetime = Field(default_factory=datetime.utcnow)
    recommendations: Optional[list] = []
    suitable_crops: Optional[list] = []
    report_url: Optional[str] = None

class SoilAnalysisRequest(BaseModel):
    """Soil analysis request"""
    ph: float
    nitrogen: float
    phosphorus: float
    potassium: float
    organic_carbon: float
    moisture: float
    location: Optional[dict] = None
