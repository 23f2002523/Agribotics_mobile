# ML Model Inference Service

## Purpose
Serves trained ML models for real-time predictions

## Models
- `disease_model.h5` - Plant disease detection
- `soil_model.pkl` - Soil crop recommendation

## Usage
```python
from inference_service import predict_disease, analyze_soil

# Disease detection
result = predict_disease(image_path)

# Soil analysis
crops = analyze_soil(ph=6.5, n=40, p=20, k=30, oc=1.5, moisture=25)
```
