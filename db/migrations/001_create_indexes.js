// MongoDB Migration - Create Indexes
// Run: mongosh < 001_create_indexes.js

use agribotics_db;

// Users collection indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "created_at": -1 });

// Crops collection indexes
db.crops.createIndex({ "user_id": 1 });
db.crops.createIndex({ "crop_name": 1 });
db.crops.createIndex({ "status": 1 });
db.crops.createIndex({ "created_at": -1 });

// Soil tests indexes
db.soil_tests.createIndex({ "user_id": 1 });
db.soil_tests.createIndex({ "test_date": -1 });

// Disease detections indexes
db.disease_detections.createIndex({ "user_id": 1 });
db.disease_detections.createIndex({ "crop_id": 1 });
db.disease_detections.createIndex({ "detected_at": -1 });

print("Indexes created successfully!");
