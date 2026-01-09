# ML Training Pipeline for Disease Detection

## Requirements
- Python 3.10+
- TensorFlow 2.15+
- Keras
- NumPy, Pandas
- OpenCV

## Dataset Structure
```
datasets/
├── plant-disease/
│   ├── train/
│   │   ├── healthy/
│   │   ├── bacterial_blight/
│   │   ├── leaf_spot/
│   │   └── ...
│   ├── test/
│   └── validation/
```

## Training Script
Run: `python train_disease_model.py`

## Model Output
- Saved to: `../../ml/inference/disease_model.h5`
- Accuracy target: >90%
