import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

interface SoilData {
  pH?: string;
  nitrogen?: string;
  phosphorus?: string;
  potassium?: string;
  organicCarbon?: string;
  moisture?: string;
  // Micronutrients (optional)
  zinc?: string;
  copper?: string;
  manganese?: string;
  iron?: string;
  boron?: string;
  molybdenum?: string;
  chlorine?: string;
}

const App: React.FC = () => {
  const [soilData, setSoilData] = React.useState<SoilData>({});
  const [uploadedFile, setUploadedFile] = React.useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [selectedOption, setSelectedOption] = React.useState<'manual' | 'upload' | null>(null);
  const [manualExpanded, setManualExpanded] = React.useState<boolean>(false);
  const [uploadExpanded, setUploadExpanded] = React.useState<boolean>(false);

  const handleInputChange = (field: keyof SoilData, value: string) => {
    setSoilData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const getOrganicCarbonStatus = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return null;

    if (numValue < 0.5) {
      return {
        status: 'Low',
        color: '#e74c3c',
        icon: 'sentiment-dissatisfied',
        message: 'The soil is "hungry." It has poor structure and cannot hold nutrients well.',
        action: 'Needs urgent addition of organic matter like Farm Yard Manure (FYM), compost, or green manure.'
      };
    } else if (numValue >= 0.5 && numValue <= 0.75) {
      return {
        status: 'Medium',
        color: '#f39c12',
        icon: 'sentiment-neutral',
        message: 'The soil is in average health but needs maintenance to prevent degradation.',
        action: 'Continue adding organic matter regularly to maintain soil health.'
      };
    } else {
      return {
        status: 'High',
        color: '#27ae60',
        icon: 'sentiment-satisfied',
        message: '"Happy Soil". As the image suggests, this is the ideal state. The soil is teeming with microbial life, holds moisture well, and supports healthy plant growth.',
        action: 'Maintain current practices to keep the soil in optimal condition.'
      };
    }
  };

  const getNitrogenStatus = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return null;

    if (numValue < 280) {
      return {
        status: 'Low (Deficient)',
        color: '#e74c3c',
        icon: 'warning',
        role: 'Vegetative Growth: Makes plants green and leafy.',
        message: 'Plants will look pale/yellow.',
        action: 'Needs full dose of Urea/N-fertilizer.'
      };
    } else if (numValue >= 280 && numValue <= 560) {
      return {
        status: 'Medium (Safe Zone)',
        color: '#f39c12',
        icon: 'info',
        role: 'Vegetative Growth: Makes plants green and leafy.',
        message: 'Standard maintenance dose required.',
        action: 'Apply standard nitrogen fertilizer dose.'
      };
    } else {
      return {
        status: 'High (Surplus)',
        color: '#27ae60',
        icon: 'check-circle',
        role: 'Vegetative Growth: Makes plants green and leafy.',
        message: 'Soil has enough nitrogen.',
        action: 'Reduce N-fertilizer to save money and prevent leaching.'
      };
    }
  };

  const getPhosphorusStatus = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return null;

    if (numValue < 10) {
      return {
        status: 'Low (Deficient)',
        color: '#e74c3c',
        icon: 'warning',
        role: 'Roots & Energy: Essential for root development and ripening.',
        message: 'Root growth will be stunted.',
        action: 'Needs phosphorus-rich fertilizer (DAP/SSP).'
      };
    } else if (numValue >= 10 && numValue <= 25) {
      return {
        status: 'Medium (Safe Zone)',
        color: '#f39c12',
        icon: 'info',
        role: 'Roots & Energy: Essential for root development and ripening.',
        message: 'Moderate application needed.',
        action: 'Apply moderate phosphorus fertilizer dose.'
      };
    } else {
      return {
        status: 'High (Surplus)',
        color: '#27ae60',
        icon: 'check-circle',
        role: 'Roots & Energy: Essential for root development and ripening.',
        message: numValue > 50 ? 'Very High levels detected.' : 'Good levels maintained.',
        action: numValue > 50 ? 'Stop applying P fertilizer.' : 'Monitor phosphorus levels.'
      };
    }
  };

  const getPotassiumStatus = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return null;

    if (numValue < 120) {
      return {
        status: 'Low (Deficient)',
        color: '#e74c3c',
        icon: 'warning',
        role: 'Immunity & Quality: Disease resistance and fruit quality.',
        message: 'Plants may have weak stems or poor fruit quality.',
        action: 'Apply potassium-rich fertilizer (MOP).'
      };
    } else if (numValue >= 120 && numValue <= 280) {
      return {
        status: 'Medium (Safe Zone)',
        color: '#f39c12',
        icon: 'info',
        role: 'Immunity & Quality: Disease resistance and fruit quality.',
        message: 'Standard application needed.',
        action: 'Apply standard potassium fertilizer dose.'
      };
    } else {
      return {
        status: 'High (Surplus)',
        color: '#27ae60',
        icon: 'check-circle',
        role: 'Immunity & Quality: Disease resistance and fruit quality.',
        message: numValue > 600 ? 'Very High reserves detected.' : 'High reserves available.',
        action: numValue > 600 ? 'Avoid Potash application.' : 'Monitor potassium levels.'
      };
    }
  };

  // Micronutrient evaluation functions
  const getMicronutrientStatus = (value: string, nutrient: string, unit: string, low: number, optimal: number) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return null;

    if (numValue < low) {
      return {
        status: 'Low (Deficient)',
        color: '#e74c3c',
        icon: 'warning',
        message: `${nutrient} deficiency detected.`,
        action: `Apply ${nutrient.toLowerCase()}-rich fertilizer or correct soil pH.`
      };
    } else if (numValue >= low && numValue <= optimal * 1.5) {
      return {
        status: 'Optimal',
        color: '#27ae60',
        icon: 'check-circle',
        message: `${nutrient} levels are adequate.`,
        action: 'No action required. Monitor regularly.'
      };
    } else {
      return {
        status: 'High (Excess)',
        color: '#f39c12',
        icon: 'info',
        message: `${nutrient} levels are high.`,
        action: 'Monitor for toxicity symptoms. Avoid additional application.'
      };
    }
  };

  const getZincStatus = (value: string) => getMicronutrientStatus(value, 'Zinc', 'ppm', 0.5, 2.0);
  const getCopperStatus = (value: string) => getMicronutrientStatus(value, 'Copper', 'ppm', 0.2, 1.0);
  const getManganeseStatus = (value: string) => getMicronutrientStatus(value, 'Manganese', 'ppm', 1.0, 5.0);
  const getIronStatus = (value: string) => getMicronutrientStatus(value, 'Iron', 'ppm', 2.0, 10.0);
  const getBoronStatus = (value: string) => getMicronutrientStatus(value, 'Boron', 'ppm', 0.1, 1.0);
  const getMolybdenumStatus = (value: string) => getMicronutrientStatus(value, 'Molybdenum', 'ppm', 0.05, 0.2);
  const getChlorineStatus = (value: string) => getMicronutrientStatus(value, 'Chlorine', 'ppm', 2.0, 10.0);

  const handleSubmitManual = () => {
    // Validate mandatory fields
    const mandatoryFields = ['pH', 'nitrogen', 'phosphorus', 'potassium', 'organicCarbon', 'moisture'];
    const missingFields = mandatoryFields.filter(field => !soilData[field as keyof SoilData]?.trim());

    if (missingFields.length > 0) {
      Alert.alert(
        'Required Fields Missing',
        `Please fill in all mandatory fields:\n${missingFields.join(', ')}`,
        [{ text: 'OK' }]
      );
      return;
    }

    // Get status information for all nutrients
    const organicCarbonStatus = soilData.organicCarbon ? getOrganicCarbonStatus(soilData.organicCarbon) : null;
    const nitrogenStatus = soilData.nitrogen ? getNitrogenStatus(soilData.nitrogen) : null;
    const phosphorusStatus = soilData.phosphorus ? getPhosphorusStatus(soilData.phosphorus) : null;
    const potassiumStatus = soilData.potassium ? getPotassiumStatus(soilData.potassium) : null;

    let statusSummary = '\n\nNutrient Status Summary:';
    if (organicCarbonStatus) statusSummary += `\nOrganic Carbon: ${organicCarbonStatus.status}`;
    if (nitrogenStatus) statusSummary += `\nNitrogen: ${nitrogenStatus.status}`;
    if (phosphorusStatus) statusSummary += `\nPhosphorus: ${phosphorusStatus.status}`;
    if (potassiumStatus) statusSummary += `\nPotassium: ${potassiumStatus.status}`;

    Alert.alert(
      'Data Submitted',
      `Soil test data:\n${JSON.stringify(soilData, null, 2)}${statusSummary}`,
      [{ text: 'OK' }]
    );
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
          `File: ${result.assets[0].name}\nSize: ${(result.assets[0].size! / 1024).toFixed(2)} KB`,
          [{ text: 'OK' }]
        );
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  const handleSubmitUpload = () => {
    if (!uploadedFile) {
      Alert.alert('Error', 'Please upload a soil test report');
      return;
    }

    Alert.alert(
      'Report Submitted',
      `Processing report: ${uploadedFile.name}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Soil Testing</Text>
          <Text style={styles.subtitle}>Choose how you'd like to input your soil data</Text>
        </View>

        {/* Main Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.optionCard, (selectedOption === 'manual' || manualExpanded) && styles.optionCardSelected]}
            onPress={() => {
              if (selectedOption === 'manual' && manualExpanded) {
                // If already selected and expanded, collapse it
                setManualExpanded(false);
              } else {
                // Select manual and expand
                setSelectedOption('manual');
                setManualExpanded(true);
                setUploadExpanded(false); // Collapse upload when manual is selected
              }
            }}
          >
            <MaterialIcons
              name="edit"
              size={40}
              color={(selectedOption === 'manual' || manualExpanded) ? '#0af35cff' : '#666'}
            />
            <Text style={[styles.optionTitle, (selectedOption === 'manual' || manualExpanded) && styles.optionTitleSelected]}>
              Enter Data Manually
            </Text>
            <Text style={styles.optionDescription}>
              Input soil parameters directly
            </Text>
            {selectedOption === 'manual' && !manualExpanded && (
              <MaterialIcons
                name="expand-more"
                size={20}
                color="#0af35cff"
                style={styles.expandIcon}
              />
            )}
            {manualExpanded && (
              <MaterialIcons
                name="expand-less"
                size={20}
                color="#0af35cff"
                style={styles.expandIcon}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionCard, (selectedOption === 'upload' || uploadExpanded) && styles.optionCardSelected]}
            onPress={() => {
              if (selectedOption === 'upload' && uploadExpanded) {
                // If already selected and expanded, collapse it
                setUploadExpanded(false);
              } else {
                // Select upload and expand
                setSelectedOption('upload');
                setUploadExpanded(true);
                setManualExpanded(false); // Collapse manual when upload is selected
              }
            }}
          >
            <MaterialIcons
              name="file-upload"
              size={40}
              color={(selectedOption === 'upload' || uploadExpanded) ? '#0af35cff' : '#666'}
            />
            <Text style={[styles.optionTitle, (selectedOption === 'upload' || uploadExpanded) && styles.optionTitleSelected]}>
              Upload Report
            </Text>
            <Text style={styles.optionDescription}>
              Upload your soil testing document
            </Text>
            {selectedOption === 'upload' && !uploadExpanded && (
              <MaterialIcons
                name="expand-more"
                size={20}
                color="#0af35cff"
                style={styles.expandIcon}
              />
            )}
            {uploadExpanded && (
              <MaterialIcons
                name="expand-less"
                size={20}
                color="#0af35cff"
                style={styles.expandIcon}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Manual Data Entry Section */}
        {manualExpanded && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="edit" size={24} color="#0af35cff" />
              <Text style={styles.sectionTitle}>Enter Primary Soil Parameters</Text>
              <View style={styles.headerRight}>
                <Text style={styles.mandatoryNote}>* Required fields</Text>
                <TouchableOpacity
                  onPress={() => setManualExpanded(false)}
                  style={styles.collapseButton}
                >
                  <MaterialIcons name="expand-less" size={20} color="#0af35cff" />
                </TouchableOpacity>
              </View>
            </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>pH Level <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter pH value (e.g., 6.5)"
              value={soilData.pH}
              onChangeText={(value) => handleInputChange('pH', value)}
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nitrogen (N) - kg/ha <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter nitrogen value in kg/ha (e.g., 350)"
              value={soilData.nitrogen}
              onChangeText={(value) => handleInputChange('nitrogen', value)}
              keyboardType="decimal-pad"
            />
            {soilData.nitrogen && getNitrogenStatus(soilData.nitrogen) && (
              <View style={[styles.statusContainer, { borderLeftColor: getNitrogenStatus(soilData.nitrogen)?.color }]}>
                <View style={styles.statusHeader}>
                  <MaterialIcons
                    name={getNitrogenStatus(soilData.nitrogen)?.icon as any}
                    size={20}
                    color={getNitrogenStatus(soilData.nitrogen)?.color}
                  />
                  <Text style={[styles.statusTitle, { color: getNitrogenStatus(soilData.nitrogen)?.color }]}>
                    {getNitrogenStatus(soilData.nitrogen)?.status}
                  </Text>
                </View>
                <Text style={styles.statusRole}>
                  {getNitrogenStatus(soilData.nitrogen)?.role}
                </Text>
                <Text style={styles.statusMessage}>
                  {getNitrogenStatus(soilData.nitrogen)?.message}
                </Text>
                <Text style={styles.statusAction}>
                  <Text style={{ fontWeight: 'bold' }}>Action: </Text>
                  {getNitrogenStatus(soilData.nitrogen)?.action}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phosphorus (P) - kg/ha <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phosphorus value in kg/ha (e.g., 15)"
              value={soilData.phosphorus}
              onChangeText={(value) => handleInputChange('phosphorus', value)}
              keyboardType="decimal-pad"
            />
            {soilData.phosphorus && getPhosphorusStatus(soilData.phosphorus) && (
              <View style={[styles.statusContainer, { borderLeftColor: getPhosphorusStatus(soilData.phosphorus)?.color }]}>
                <View style={styles.statusHeader}>
                  <MaterialIcons
                    name={getPhosphorusStatus(soilData.phosphorus)?.icon as any}
                    size={20}
                    color={getPhosphorusStatus(soilData.phosphorus)?.color}
                  />
                  <Text style={[styles.statusTitle, { color: getPhosphorusStatus(soilData.phosphorus)?.color }]}>
                    {getPhosphorusStatus(soilData.phosphorus)?.status}
                  </Text>
                </View>
                <Text style={styles.statusRole}>
                  {getPhosphorusStatus(soilData.phosphorus)?.role}
                </Text>
                <Text style={styles.statusMessage}>
                  {getPhosphorusStatus(soilData.phosphorus)?.message}
                </Text>
                <Text style={styles.statusAction}>
                  <Text style={{ fontWeight: 'bold' }}>Action: </Text>
                  {getPhosphorusStatus(soilData.phosphorus)?.action}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Potassium (K) - kg/ha <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter potassium value in kg/ha (e.g., 200)"
              value={soilData.potassium}
              onChangeText={(value) => handleInputChange('potassium', value)}
              keyboardType="decimal-pad"
            />
            {soilData.potassium && getPotassiumStatus(soilData.potassium) && (
              <View style={[styles.statusContainer, { borderLeftColor: getPotassiumStatus(soilData.potassium)?.color }]}>
                <View style={styles.statusHeader}>
                  <MaterialIcons
                    name={getPotassiumStatus(soilData.potassium)?.icon as any}
                    size={20}
                    color={getPotassiumStatus(soilData.potassium)?.color}
                  />
                  <Text style={[styles.statusTitle, { color: getPotassiumStatus(soilData.potassium)?.color }]}>
                    {getPotassiumStatus(soilData.potassium)?.status}
                  </Text>
                </View>
                <Text style={styles.statusRole}>
                  {getPotassiumStatus(soilData.potassium)?.role}
                </Text>
                <Text style={styles.statusMessage}>
                  {getPotassiumStatus(soilData.potassium)?.message}
                </Text>
                <Text style={styles.statusAction}>
                  <Text style={{ fontWeight: 'bold' }}>Action: </Text>
                  {getPotassiumStatus(soilData.potassium)?.action}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Organic Carbon (%) <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter organic carbon percentage (e.g., 0.6)"
              value={soilData.organicCarbon}
              onChangeText={(value) => handleInputChange('organicCarbon', value)}
              keyboardType="decimal-pad"
            />
            {soilData.organicCarbon && getOrganicCarbonStatus(soilData.organicCarbon) && (
              <View style={[styles.statusContainer, { borderLeftColor: getOrganicCarbonStatus(soilData.organicCarbon)?.color }]}>
                <View style={styles.statusHeader}>
                  <MaterialIcons
                    name={getOrganicCarbonStatus(soilData.organicCarbon)?.icon as any}
                    size={20}
                    color={getOrganicCarbonStatus(soilData.organicCarbon)?.color}
                  />
                  <Text style={[styles.statusTitle, { color: getOrganicCarbonStatus(soilData.organicCarbon)?.color }]}>
                    {getOrganicCarbonStatus(soilData.organicCarbon)?.status} Organic Carbon Level
                  </Text>
                </View>
                <Text style={styles.statusMessage}>
                  {getOrganicCarbonStatus(soilData.organicCarbon)?.message}
                </Text>
                <Text style={styles.statusAction}>
                  <Text style={{ fontWeight: 'bold' }}>Action: </Text>
                  {getOrganicCarbonStatus(soilData.organicCarbon)?.action}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Moisture (%) <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter moisture percentage"
              value={soilData.moisture}
              onChangeText={(value) => handleInputChange('moisture', value)}
              keyboardType="decimal-pad"
            />
          </View>

          {/* Micronutrients Section */}
          <View style={styles.micronutrientsHeader}>
            <MaterialIcons name="science" size={20} color="#0af35cff" />
            <Text style={styles.micronutrientsTitle}>Micronutrients (Optional)</Text>
            <Text style={styles.optionalText}>Can be left blank</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Zinc (Zn) - ppm</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter zinc value in ppm (optional)"
              value={soilData.zinc}
              onChangeText={(value) => handleInputChange('zinc', value)}
              keyboardType="decimal-pad"
            />
            {soilData.zinc && getZincStatus(soilData.zinc) && (
              <View style={[styles.microStatusContainer, { borderLeftColor: getZincStatus(soilData.zinc)?.color }]}>
                <View style={styles.microStatusHeader}>
                  <MaterialIcons
                    name={getZincStatus(soilData.zinc)?.icon as any}
                    size={16}
                    color={getZincStatus(soilData.zinc)?.color}
                  />
                  <Text style={[styles.microStatusTitle, { color: getZincStatus(soilData.zinc)?.color }]}>
                    {getZincStatus(soilData.zinc)?.status}
                  </Text>
                </View>
                <Text style={styles.microStatusMessage}>
                  {getZincStatus(soilData.zinc)?.message}
                </Text>
                <Text style={styles.microStatusAction}>
                  {getZincStatus(soilData.zinc)?.action}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Copper (Cu) - ppm</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter copper value in ppm (optional)"
              value={soilData.copper}
              onChangeText={(value) => handleInputChange('copper', value)}
              keyboardType="decimal-pad"
            />
            {soilData.copper && getCopperStatus(soilData.copper) && (
              <View style={[styles.microStatusContainer, { borderLeftColor: getCopperStatus(soilData.copper)?.color }]}>
                <View style={styles.microStatusHeader}>
                  <MaterialIcons
                    name={getCopperStatus(soilData.copper)?.icon as any}
                    size={16}
                    color={getCopperStatus(soilData.copper)?.color}
                  />
                  <Text style={[styles.microStatusTitle, { color: getCopperStatus(soilData.copper)?.color }]}>
                    {getCopperStatus(soilData.copper)?.status}
                  </Text>
                </View>
                <Text style={styles.microStatusMessage}>
                  {getCopperStatus(soilData.copper)?.message}
                </Text>
                <Text style={styles.microStatusAction}>
                  {getCopperStatus(soilData.copper)?.action}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Manganese (Mn) - ppm</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter manganese value in ppm (optional)"
              value={soilData.manganese}
              onChangeText={(value) => handleInputChange('manganese', value)}
              keyboardType="decimal-pad"
            />
            {soilData.manganese && getManganeseStatus(soilData.manganese) && (
              <View style={[styles.microStatusContainer, { borderLeftColor: getManganeseStatus(soilData.manganese)?.color }]}>
                <View style={styles.microStatusHeader}>
                  <MaterialIcons
                    name={getManganeseStatus(soilData.manganese)?.icon as any}
                    size={16}
                    color={getManganeseStatus(soilData.manganese)?.color}
                  />
                  <Text style={[styles.microStatusTitle, { color: getManganeseStatus(soilData.manganese)?.color }]}>
                    {getManganeseStatus(soilData.manganese)?.status}
                  </Text>
                </View>
                <Text style={styles.microStatusMessage}>
                  {getManganeseStatus(soilData.manganese)?.message}
                </Text>
                <Text style={styles.microStatusAction}>
                  {getManganeseStatus(soilData.manganese)?.action}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Iron (Fe) - ppm</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter iron value in ppm (optional)"
              value={soilData.iron}
              onChangeText={(value) => handleInputChange('iron', value)}
              keyboardType="decimal-pad"
            />
            {soilData.iron && getIronStatus(soilData.iron) && (
              <View style={[styles.microStatusContainer, { borderLeftColor: getIronStatus(soilData.iron)?.color }]}>
                <View style={styles.microStatusHeader}>
                  <MaterialIcons
                    name={getIronStatus(soilData.iron)?.icon as any}
                    size={16}
                    color={getIronStatus(soilData.iron)?.color}
                  />
                  <Text style={[styles.microStatusTitle, { color: getIronStatus(soilData.iron)?.color }]}>
                    {getIronStatus(soilData.iron)?.status}
                  </Text>
                </View>
                <Text style={styles.microStatusMessage}>
                  {getIronStatus(soilData.iron)?.message}
                </Text>
                <Text style={styles.microStatusAction}>
                  {getIronStatus(soilData.iron)?.action}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Boron (B) - ppm</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter boron value in ppm (optional)"
              value={soilData.boron}
              onChangeText={(value) => handleInputChange('boron', value)}
              keyboardType="decimal-pad"
            />
            {soilData.boron && getBoronStatus(soilData.boron) && (
              <View style={[styles.microStatusContainer, { borderLeftColor: getBoronStatus(soilData.boron)?.color }]}>
                <View style={styles.microStatusHeader}>
                  <MaterialIcons
                    name={getBoronStatus(soilData.boron)?.icon as any}
                    size={16}
                    color={getBoronStatus(soilData.boron)?.color}
                  />
                  <Text style={[styles.microStatusTitle, { color: getBoronStatus(soilData.boron)?.color }]}>
                    {getBoronStatus(soilData.boron)?.status}
                  </Text>
                </View>
                <Text style={styles.microStatusMessage}>
                  {getBoronStatus(soilData.boron)?.message}
                </Text>
                <Text style={styles.microStatusAction}>
                  {getBoronStatus(soilData.boron)?.action}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Molybdenum (Mo) - ppm</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter molybdenum value in ppm (optional)"
              value={soilData.molybdenum}
              onChangeText={(value) => handleInputChange('molybdenum', value)}
              keyboardType="decimal-pad"
            />
            {soilData.molybdenum && getMolybdenumStatus(soilData.molybdenum) && (
              <View style={[styles.microStatusContainer, { borderLeftColor: getMolybdenumStatus(soilData.molybdenum)?.color }]}>
                <View style={styles.microStatusHeader}>
                  <MaterialIcons
                    name={getMolybdenumStatus(soilData.molybdenum)?.icon as any}
                    size={16}
                    color={getMolybdenumStatus(soilData.molybdenum)?.color}
                  />
                  <Text style={[styles.microStatusTitle, { color: getMolybdenumStatus(soilData.molybdenum)?.color }]}>
                    {getMolybdenumStatus(soilData.molybdenum)?.status}
                  </Text>
                </View>
                <Text style={styles.microStatusMessage}>
                  {getMolybdenumStatus(soilData.molybdenum)?.message}
                </Text>
                <Text style={styles.microStatusAction}>
                  {getMolybdenumStatus(soilData.molybdenum)?.action}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Chlorine (Cl) - ppm</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter chlorine value in ppm (optional)"
              value={soilData.chlorine}
              onChangeText={(value) => handleInputChange('chlorine', value)}
              keyboardType="decimal-pad"
            />
            {soilData.chlorine && getChlorineStatus(soilData.chlorine) && (
              <View style={[styles.microStatusContainer, { borderLeftColor: getChlorineStatus(soilData.chlorine)?.color }]}>
                <View style={styles.microStatusHeader}>
                  <MaterialIcons
                    name={getChlorineStatus(soilData.chlorine)?.icon as any}
                    size={16}
                    color={getChlorineStatus(soilData.chlorine)?.color}
                  />
                  <Text style={[styles.microStatusTitle, { color: getChlorineStatus(soilData.chlorine)?.color }]}>
                    {getChlorineStatus(soilData.chlorine)?.status}
                  </Text>
                </View>
                <Text style={styles.microStatusMessage}>
                  {getChlorineStatus(soilData.chlorine)?.message}
                </Text>
                <Text style={styles.microStatusAction}>
                  {getChlorineStatus(soilData.chlorine)?.action}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitManual}>
            <Text style={styles.submitButtonText}>Submit Manual Data</Text>
          </TouchableOpacity>
        </View>
        )}

        {/* Upload Report Section */}
        {uploadExpanded && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="file-upload" size={24} color="#0af35cff" />
              <Text style={styles.sectionTitle}>Upload Soil Test Report</Text>
              <TouchableOpacity
                onPress={() => setUploadExpanded(false)}
                style={styles.collapseButton}
              >
                <MaterialIcons name="expand-less" size={20} color="#0af35cff" />
              </TouchableOpacity>
            </View>
            
            {uploadedFile ? (
              <View style={styles.fileInfoContainer}>
                <MaterialIcons name="description" size={48} color="#27ae60" />
                <Text style={styles.fileName}>{uploadedFile.name}</Text>
                <Text style={styles.fileSize}>
                  Size: {(uploadedFile.size! / 1024).toFixed(2)} KB
                </Text>
                <View style={styles.fileActions}>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={handleRemoveFile}
                  >
                    <MaterialIcons name="delete" size={20} color="#fff" />
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmitUpload}
                  >
                    <MaterialIcons name="send" size={20} color="#fff" />
                    <Text style={styles.submitButtonText}>Submit Report</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity style={styles.uploadButton} onPress={handleUploadFile}>
                <MaterialIcons name="cloud-upload" size={48} color="#fff" />
                <Text style={styles.uploadButtonText}>Choose File</Text>
                <Text style={styles.uploadSubtext}>PDF or Image files supported</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  optionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#e1e8ed',
  },
  optionCardSelected: {
    borderColor: '#0af35cff',
    backgroundColor: '#f8fffe',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  optionTitleSelected: {
    color: '#0af35cff',
  },
  optionDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  expandIcon: {
    marginTop: 8,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 10,
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mandatoryNote: {
    fontSize: 12,
    color: '#e74c3c',
    fontStyle: 'italic',
    marginRight: 10,
  },
  collapseButton: {
    padding: 5,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#34495e',
    marginBottom: 8,
  },
  required: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  statusContainer: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  statusRole: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
    marginBottom: 6,
  },
  statusMessage: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 8,
    lineHeight: 20,
  },
  statusAction: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  uploadButton: {
    backgroundColor: '#27ae60',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  uploadSubtext: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 5,
  },
  fileInfoContainer: {
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2c3e50',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  fileSize: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  fileActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginRight: 10,
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  micronutrientsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  micronutrientsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginLeft: 8,
  },
  optionalText: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 'auto',
    fontStyle: 'italic',
  },
  microStatusContainer: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 6,
    borderLeftWidth: 3,
  },
  microStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  microStatusTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  microStatusMessage: {
    fontSize: 12,
    color: '#34495e',
    marginBottom: 4,
    lineHeight: 18,
  },
  microStatusAction: {
    fontSize: 12,
    color: '#2c3e50',
    lineHeight: 18,
  },
});

export default App;

