"""
ML Inference Service
"""
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import base64

class DiseaseDetectionService:
    def __init__(self, model_path):
        self.model = None
        self.model_path = model_path
        self.class_names = [
            "Healthy",
            "Bacterial Blight",
            "Leaf Spot",
            "Rust",
            "Powdery Mildew",
            # Add more disease classes
        ]
    
    def load_model(self):
        """Load trained model"""
        try:
            self.model = tf.keras.models.load_model(self.model_path)
            print(f"Model loaded from {self.model_path}")
        except Exception as e:
            print(f"Error loading model: {e}")
    
    def preprocess_image(self, image_base64):
        """Preprocess image for prediction"""
        # Decode base64
        image_data = base64.b64decode(image_base64)
        image = Image.open(io.BytesIO(image_data))
        
        # Resize to model input size
        image = image.resize((224, 224))
        image_array = np.array(image)
        image_array = np.expand_dims(image_array, axis=0)
        
        return image_array
    
    def predict(self, image_base64):
        """Predict disease from image"""
        if self.model is None:
            self.load_model()
        
        # Preprocess
        image = self.preprocess_image(image_base64)
        
        # Predict
        predictions = self.model.predict(image)
        predicted_class = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class])
        
        return {
            "disease": self.class_names[predicted_class],
            "confidence": confidence,
            "all_predictions": {
                self.class_names[i]: float(predictions[0][i])
                for i in range(len(self.class_names))
            }
        }
