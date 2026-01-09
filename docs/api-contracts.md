# API Contracts

## Base URL
- Development: `http://localhost:8000`
- Production: `https://api.agribotics.com`

## Authentication

### POST /api/auth/register
Register a new user

**Request:**
```json
{
  "email": "farmer@example.com",
  "username": "farmer123",
  "full_name": "John Farmer",
  "password": "SecurePass123",
  "phone": "+91-9876543210"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "64a1b2c3d4e5f6g7h8i9j0k1",
    "email": "farmer@example.com",
    "username": "farmer123",
    "full_name": "John Farmer"
  }
}
```

### POST /api/auth/login
User login

**Request:**
```json
{
  "email": "farmer@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {...}
}
```

## Crops

### GET /api/crops
Get user's crops

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "crops": [
    {
      "id": "64a1b2c3...",
      "crop_name": "Wheat",
      "crop_type": "rabi",
      "planted_date": "2024-10-15",
      "area": 5.5,
      "status": "active",
      "health_score": 85
    }
  ]
}
```

### POST /api/crops
Add a new crop

**Request:**
```json
{
  "crop_name": "Rice",
  "crop_type": "kharif",
  "variety": "Basmati",
  "planted_date": "2024-07-01",
  "area": 3.5,
  "location": {
    "latitude": 30.7333,
    "longitude": 76.7794
  }
}
```

## Disease Detection

### POST /api/disease/detect
Detect plant disease from image

**Request:**
```json
{
  "crop_id": "64a1b2c3...",
  "image_base64": "iVBORw0KGgoAAAANSUhEUgAA..."
}
```

**Response:**
```json
{
  "disease_name": "Leaf Spot",
  "confidence": 0.92,
  "severity": "medium",
  "recommendations": [
    "Remove affected leaves",
    "Apply fungicide",
    "Improve air circulation"
  ],
  "treatments": [
    {
      "name": "Copper Fungicide",
      "dosage": "2ml per liter",
      "timing": "Morning or evening"
    }
  ]
}
```

## Soil Analysis

### POST /api/soil/analyze
Analyze soil and get crop recommendations

**Request:**
```json
{
  "ph": 6.5,
  "nitrogen": 40,
  "phosphorus": 25,
  "potassium": 35,
  "organic_carbon": 1.8,
  "moisture": 28,
  "location": {
    "latitude": 30.7333,
    "longitude": 76.7794
  }
}
```

**Response:**
```json
{
  "soil_health": "Good",
  "suitable_crops": [
    "Rice",
    "Wheat",
    "Maize"
  ],
  "recommendations": [
    "pH is optimal for most crops",
    "Nitrogen level is adequate",
    "Consider adding potassium"
  ],
  "fertilizer_suggestions": {
    "nitrogen": "Apply 20kg/acre urea",
    "phosphorus": "Adequate",
    "potassium": "Apply 10kg/acre potash"
  }
}
```

## Weather

### GET /api/weather?lat={lat}&lon={lon}
Get weather data for location

**Response:**
```json
{
  "temperature": 28,
  "humidity": 65,
  "rainfall": 0,
  "wind_speed": 12,
  "forecast": [
    {
      "date": "2024-01-11",
      "temperature": 29,
      "condition": "Sunny"
    }
  ]
}
```

## Mandi Prices

### GET /api/mandi/prices?state={state}
Get market prices

**Response:**
```json
{
  "prices": [
    {
      "commodity": "Wheat",
      "market": "Delhi",
      "min_price": 2000,
      "max_price": 2200,
      "modal_price": 2100,
      "unit": "per quintal",
      "date": "2024-01-10"
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "detail": "Invalid or expired token"
}
```

### 500 Internal Server Error
```json
{
  "detail": "Internal server error"
}
```
