// Sample seed data for testing
// Run: mongosh < seed_sample_data.js

use agribotics_db;

// Sample crop data
db.crops.insertMany([
  {
    crop_name: "Wheat",
    crop_type: "rabi",
    variety: "PBW 343",
    season: "Winter",
    water_requirement: "Medium",
    suitable_soil: ["Loamy", "Clay"]
  },
  {
    crop_name: "Rice",
    crop_type: "kharif",
    variety: "Pusa Basmati",
    season: "Monsoon",
    water_requirement: "High",
    suitable_soil: ["Clay", "Loamy"]
  },
  {
    crop_name: "Cotton",
    crop_type: "kharif",
    variety: "Bt Cotton",
    season: "Summer",
    water_requirement: "Medium",
    suitable_soil: ["Black Soil", "Loamy"]
  }
]);

print("Sample data seeded successfully!");
