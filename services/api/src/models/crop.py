"""
Crop Model - MongoDB Schema
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class Crop(BaseModel):
    """Crop model"""
    user_id: str
    crop_name: str
    crop_type: str  # kharif, rabi, zaid
    variety: Optional[str] = None
    planted_date: datetime
    expected_harvest: Optional[datetime] = None
    area: float  # in acres
    location: Optional[dict] = None
    status: str = "active"  # active, harvested, failed
    health_score: Optional[float] = None  # 0-100
    growth_stage: Optional[str] = None
    notes: Optional[str] = None
    images: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class CropCreate(BaseModel):
    """Create crop model"""
    crop_name: str
    crop_type: str
    variety: Optional[str] = None
    planted_date: datetime
    area: float
    location: Optional[dict] = None
