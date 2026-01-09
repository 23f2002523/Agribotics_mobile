import { DrawerMenu } from '@/components/drawer-menu';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface SoilData {
  pH?: string;
  nitrogen?: string;
  phosphorus?: string;
  potassium?: string;
  organicCarbon?: string;
  moisture?: string;
}

export default function FarmScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [soilExpanded, setSoilExpanded] = useState(false);
  const [diseaseExpanded, setDiseaseExpanded] = useState(false);
  const [soilData, setSoilData] = useState<SoilData>({});
  const [uploadedFile, setUploadedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [inputMethod, setInputMethod] = useState<'manual' | 'upload' | null>(null);
  const [diseaseImage, setDiseaseImage] = useState<string | null>(null);
  const router = useRouter();

  const handleNavigate = (screen: string) => {
    router.push(`/(tabs)/${screen}`);
  };

  const handleInputChange = (field: keyof SoilData, value: string) => {
    setSoilData(prev => ({ ...prev, [field]: value }));
  };

  const handleUploadFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        multiple: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        setUploadedFile(result.assets[0]);
        Alert.alert(
          'File Selected',
          `File: ${result.assets[0].name}\nSize: ${(result.assets[0].size! / 1024).toFixed(2)} KB`
        );
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handleSubmitManual = () => {
    const mandatoryFields = ['pH', 'nitrogen', 'phosphorus', 'potassium', 'organicCarbon', 'moisture'];
    const missingFields = mandatoryFields.filter(field => !soilData[field as keyof SoilData]?.trim());

    if (missingFields.length > 0) {
      Alert.alert(
        'Required Fields Missing',
        `Please fill in: ${missingFields.join(', ')}`
      );
      return;
    }

    Alert.alert('Success', 'Soil data submitted successfully!');
  };

  const handleSubmitUpload = () => {
    if (!uploadedFile) {
      Alert.alert('Error', 'Please upload a soil test report');
      return;
    }
    Alert.alert('Success', `Processing report: ${uploadedFile.name}`);
  };

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Camera permission is required to take photos');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setDiseaseImage(result.assets[0].uri);
      Alert.alert('Success', 'Photo captured successfully!');
    }
  };

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Gallery permission is required to select photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setDiseaseImage(result.assets[0].uri);
      Alert.alert('Success', 'Image selected successfully!');
    }
  };

  const handleAnalyzeDisease = () => {
    if (!diseaseImage) {
      Alert.alert('Error', 'Please capture or upload an image first');
      return;
    }
    Alert.alert('Analyzing...', 'AI is analyzing the plant disease. Results will be shown shortly.');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Crops</Text>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setDrawerVisible(true)}
        >
          <MaterialIcons name="menu" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onNavigate={handleNavigate}
        currentScreen="farm"
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        {/* Test Your Soil Card */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.soilTestCard}
            onPress={() => setSoilExpanded(!soilExpanded)}
          >
            <View style={styles.soilTestHeader}>
              <MaterialIcons name="science" size={32} color="#1E7F43" />
              <View style={styles.soilTestTitleContainer}>
                <Text style={styles.soilTestTitle}>Test Your Soil</Text>
                <Text style={styles.soilTestSubtitle}>Check soil nutrition and health</Text>
              </View>
              <MaterialIcons 
                name={soilExpanded ? "expand-less" : "expand-more"} 
                size={28} 
                color="#1E7F43" 
              />
            </View>
          </TouchableOpacity>

          {/* Soil Testing Expanded Content */}
          {soilExpanded && (
            <View style={styles.soilTestContent}>
              <Text style={styles.inputMethodTitle}>Choose input method:</Text>
              
              {/* Manual Entry and Upload Buttons */}
              <View style={styles.methodButtons}>
                <TouchableOpacity
                  style={[styles.methodButton, inputMethod === 'manual' && styles.methodButtonActive]}
                  onPress={() => setInputMethod('manual')}
                >
                  <MaterialIcons 
                    name="edit" 
                    size={24} 
                    color={inputMethod === 'manual' ? '#FFFFFF' : '#1E7F43'} 
                  />
                  <Text style={[styles.methodButtonText, inputMethod === 'manual' && styles.methodButtonTextActive]}>
                    Manual Entry
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.methodButton, inputMethod === 'upload' && styles.methodButtonActive]}
                  onPress={() => setInputMethod('upload')}
                >
                  <MaterialIcons 
                    name="file-upload" 
                    size={24} 
                    color={inputMethod === 'upload' ? '#FFFFFF' : '#1E7F43'} 
                  />
                  <Text style={[styles.methodButtonText, inputMethod === 'upload' && styles.methodButtonTextActive]}>
                    Upload Report
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Manual Entry Form */}
              {inputMethod === 'manual' && (
                <View style={styles.manualForm}>
                  <Text style={styles.formTitle}>Enter Soil Parameters *</Text>
                  
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>pH Value *</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g., 6.5"
                      keyboardType="numeric"
                      value={soilData.pH}
                      onChangeText={(value) => handleInputChange('pH', value)}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Nitrogen (kg/ha) *</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g., 280"
                      keyboardType="numeric"
                      value={soilData.nitrogen}
                      onChangeText={(value) => handleInputChange('nitrogen', value)}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Phosphorus (kg/ha) *</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g., 15"
                      keyboardType="numeric"
                      value={soilData.phosphorus}
                      onChangeText={(value) => handleInputChange('phosphorus', value)}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Potassium (kg/ha) *</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g., 120"
                      keyboardType="numeric"
                      value={soilData.potassium}
                      onChangeText={(value) => handleInputChange('potassium', value)}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Organic Carbon (%) *</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g., 0.5"
                      keyboardType="numeric"
                      value={soilData.organicCarbon}
                      onChangeText={(value) => handleInputChange('organicCarbon', value)}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Moisture (%) *</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="e.g., 20"
                      keyboardType="numeric"
                      value={soilData.moisture}
                      onChangeText={(value) => handleInputChange('moisture', value)}
                    />
                  </View>

                  <TouchableOpacity style={styles.submitButton} onPress={handleSubmitManual}>
                    <Text style={styles.submitButtonText}>Analyze Soil Data</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Upload Report */}
              {inputMethod === 'upload' && (
                <View style={styles.uploadForm}>
                  <Text style={styles.formTitle}>Upload Soil Test Report</Text>
                  <Text style={styles.uploadDescription}>
                    Upload your soil testing document (PDF or Image)
                  </Text>

                  {uploadedFile ? (
                    <View style={styles.fileCard}>
                      <MaterialIcons name="insert-drive-file" size={40} color="#1E7F43" />
                      <View style={styles.fileInfo}>
                        <Text style={styles.fileName}>{uploadedFile.name}</Text>
                        <Text style={styles.fileSize}>
                          {(uploadedFile.size! / 1024).toFixed(2)} KB
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => setUploadedFile(null)}>
                        <MaterialIcons name="close" size={24} color="#e74c3c" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity style={styles.uploadButton} onPress={handleUploadFile}>
                      <MaterialIcons name="cloud-upload" size={48} color="#1E7F43" />
                      <Text style={styles.uploadButtonText}>Choose File</Text>
                    </TouchableOpacity>
                  )}

                  {uploadedFile && (
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmitUpload}>
                      <Text style={styles.submitButtonText}>Submit Report</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          )}
        </View>

        {/* Detect Disease Card */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.diseaseCard}
            onPress={() => setDiseaseExpanded(!diseaseExpanded)}
          >
            <View style={styles.diseaseHeader}>
              <MaterialIcons name="local-hospital" size={32} color="#e74c3c" />
              <View style={styles.diseaseTitleContainer}>
                <Text style={styles.diseaseTitle}>Detect Disease</Text>
                <Text style={styles.diseaseSubtitle}>AI-powered plant disease detection</Text>
              </View>
              <MaterialIcons 
                name={diseaseExpanded ? "expand-less" : "expand-more"} 
                size={28} 
                color="#e74c3c" 
              />
            </View>
          </TouchableOpacity>

          {/* Disease Detection Expanded Content */}
          {diseaseExpanded && (
            <View style={styles.diseaseContent}>
              <Text style={styles.diseaseInstructions}>
                Take a clear photo of the affected plant part or upload from gallery
              </Text>

              {/* Image Preview */}
              {diseaseImage && (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: diseaseImage }} style={styles.imagePreview} />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={() => setDiseaseImage(null)}
                  >
                    <MaterialIcons name="close" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              )}

              {/* Camera and Gallery Buttons */}
              <View style={styles.imageActionButtons}>
                <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
                  <MaterialIcons name="camera-alt" size={40} color="#FFFFFF" />
                  <Text style={styles.imageButtonText}>Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.galleryButton} onPress={handlePickImage}>
                  <MaterialIcons name="photo-library" size={40} color="#FFFFFF" />
                  <Text style={styles.imageButtonText}>Choose from Gallery</Text>
                </TouchableOpacity>
              </View>

              {/* Analyze Button */}
              {diseaseImage && (
                <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyzeDisease}>
                  <MaterialIcons name="biotech" size={24} color="#FFFFFF" />
                  <Text style={styles.analyzeButtonText}>Analyze Disease</Text>
                </TouchableOpacity>
              )}

              {/* Tips */}
              <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>📸 Tips for best results:</Text>
                <Text style={styles.tipText}>• Take photo in good lighting</Text>
                <Text style={styles.tipText}>• Focus on affected area</Text>
                <Text style={styles.tipText}>• Keep image clear and sharp</Text>
                <Text style={styles.tipText}>• Avoid blurry or dark images</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crop Planning</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Select crops based on season, soil, and climate conditions</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farming Calendar</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Track planting, harvesting, and maintenance schedules</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smart Recommendations</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>AI-powered suggestions for optimal farming practices</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  menuButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  // Soil Test Card Styles
  soilTestCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1E7F43',
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  soilTestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  soilTestTitleContainer: {
    flex: 1,
  },
  soilTestTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E7F43',
  },
  soilTestSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  soilTestContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  methodButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  methodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#1E7F43',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  methodButtonActive: {
    backgroundColor: '#1E7F43',
  },
  methodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E7F43',
  },
  methodButtonTextActive: {
    color: '#FFFFFF',
  },
  manualForm: {
    gap: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#1E7F43',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  uploadForm: {
    gap: 16,
  },
  uploadDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: -8,
  },
  uploadButton: {
    backgroundColor: '#F0F9F4',
    borderWidth: 2,
    borderColor: '#1E7F43',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    gap: 12,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E7F43',
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  fileSize: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  // Detect Disease Card Styles
  diseaseCard: {
    backgroundColor: '#FFEBEE',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e74c3c',
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  diseaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  diseaseTitleContainer: {
    flex: 1,
  },
  diseaseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  diseaseSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  diseaseContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  diseaseInstructions: {
    fontSize: 15,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  imageActionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  cameraButton: {
    flex: 1,
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  galleryButton: {
    flex: 1,
    backgroundColor: '#9b59b6',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  analyzeButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  analyzeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tipsContainer: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  tipsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    paddingLeft: 8,
  },
});
