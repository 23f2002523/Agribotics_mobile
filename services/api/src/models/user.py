"""
User Model - MongoDB Schema
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class User(BaseModel):
    """User model for farmers"""
    email: EmailStr
    username: str
    full_name: str
    phone: Optional[str] = None
    hashed_password: str
    location: Optional[dict] = None  # {latitude, longitude, address}
    farm_size: Optional[float] = None  # in acres
    crops: Optional[list] = []
    is_active: bool = True
    is_verified: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(BaseModel):
    """User registration model"""
    email: EmailStr
    username: str
    full_name: str
    password: str
    phone: Optional[str] = None

class UserLogin(BaseModel):
    """User login model"""
    email: EmailStr
    password: str

class Token(BaseModel):
    """JWT Token response"""
    access_token: str
    token_type: str
    user: dict
