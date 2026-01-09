"""
Disease Detection Model
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class DiseaseDetection(BaseModel):
    """Disease detection result"""
    user_id: str
    crop_id: Optional[str] = None
    image_url: str
    disease_name: Optional[str] = None
    confidence: Optional[float] = None
    severity: Optional[str] = None  # low, medium, high
    affected_area: Optional[float] = None  # percentage
    recommendations: List[str] = []
    treatments: List[dict] = []  # [{name, dosage, timing}]
    detected_at: datetime = Field(default_factory=datetime.utcnow)

class DiseaseDetectionRequest(BaseModel):
    """Disease detection request"""
    crop_id: Optional[str] = None
    image_base64: str  # Base64 encoded image
