# Database Schemas

## MongoDB Collections

### users
```json
{
  "_id": "ObjectId",
  "email": "string",
  "username": "string",
  "full_name": "string",
  "hashed_password": "string",
  "phone": "string",
  "location": {
    "latitude": "number",
    "longitude": "number",
    "address": "string"
  },
  "farm_size": "number",
  "crops": ["ObjectId"],
  "is_active": "boolean",
  "is_verified": "boolean",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### crops
```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId",
  "crop_name": "string",
  "crop_type": "string",
  "variety": "string",
  "planted_date": "datetime",
  "expected_harvest": "datetime",
  "area": "number",
  "location": {},
  "status": "string",
  "health_score": "number",
  "growth_stage": "string",
  "images": ["string"],
  "created_at": "datetime"
}
```

### soil_tests
```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId",
  "location": {},
  "ph": "number",
  "nitrogen": "number",
  "phosphorus": "number",
  "potassium": "number",
  "organic_carbon": "number",
  "moisture": "number",
  "test_date": "datetime",
  "recommendations": ["string"],
  "suitable_crops": ["string"]
}
```

### disease_detections
```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId",
  "crop_id": "ObjectId",
  "image_url": "string",
  "disease_name": "string",
  "confidence": "number",
  "severity": "string",
  "recommendations": ["string"],
  "treatments": [{}],
  "detected_at": "datetime"
}
```
