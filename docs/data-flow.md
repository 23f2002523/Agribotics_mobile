# Data Flow Diagrams

## 1. User Registration & Login

```
User → Mobile App → API (/api/auth/register)
                        ↓
                    Validate Data
                        ↓
                    Hash Password
                        ↓
                    Save to MongoDB (users collection)
                        ↓
                    Generate JWT Token
                        ↓
                    Return Token + User Data
                        ↓
Mobile App ← Store Token Securely
```

## 2. Disease Detection

```
User captures image → Mobile App
                        ↓
                    Convert to Base64
                        ↓
                    POST /api/disease/detect
                        ↓
                    API receives image
                        ↓
                    Decode Base64
                        ↓
                    Preprocess Image (resize, normalize)
                        ↓
                    ML Inference Service
                        ↓
                    CNN Model Prediction
                        ↓
                    Get Disease + Confidence
                        ↓
                    Save to MongoDB (disease_detections)
                        ↓
                    Return Results with Recommendations
                        ↓
Mobile App ← Display Results
```

## 3. Soil Analysis

```
User enters soil data → Mobile App
                        ↓
                    POST /api/soil/analyze
                        ↓
                    Validate Soil Parameters
                        ↓
                    ML Crop Recommendation Model
                        ↓
                    Predict Suitable Crops
                        ↓
                    Generate Recommendations
                        ↓
                    Save to MongoDB (soil_tests)
                        ↓
                    Return Analysis + Crops
                        ↓
Mobile App ← Display Recommendations
```

## 4. Real-time Chat (Future)

```
User sends message → Mobile App
                        ↓
                    WebSocket Connection
                        ↓
                    Realtime Service
                        ↓
                    AI Model (LLM)
                        ↓
                    Generate Response
                        ↓
                    Save to MongoDB (chat_messages)
                        ↓
                    WebSocket → Mobile App
                        ↓
Mobile App ← Display AI Response
```

## 5. Weather Data

```
User opens dashboard → Mobile App
                        ↓
                    GET /api/weather?lat=X&lon=Y
                        ↓
                    API → External Weather API
                        ↓
                    Fetch Weather Data
                        ↓
                    Cache in Redis (5 min TTL)
                        ↓
                    Return Weather Data
                        ↓
Mobile App ← Display Weather Card
```

## Database Schema Relationships

```
users (1) ──────────── (*) crops
  │
  ├── (1) ──────────── (*) soil_tests
  │
  └── (1) ──────────── (*) disease_detections
```

## Security Flow

```
Request → Mobile App
            ↓
        Check JWT Token
            ↓
        Add to Authorization Header
            ↓
        API Middleware
            ↓
        Verify JWT
            ↓
        Extract User ID
            ↓
        Process Request
            ↓
        Return Response
```
