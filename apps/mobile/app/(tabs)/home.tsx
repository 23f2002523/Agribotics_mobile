import { DrawerMenu } from '@/components/drawer-menu';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();

  const handleNavigate = (screen: string) => {
    if (screen === 'profile') {
      router.push('/(tabs)/profile');
    } else if (screen === 'farm') {
      router.push('/(tabs)/farm');
    } else if (screen === 'settings') {
      router.push('/(tabs)/settings');
    } else if (screen === 'contact') {
      router.push('/(tabs)/contact');
    } else if (screen === 'about') {
      router.push('/(tabs)/about');
    } else if (screen === 'soil_testing') {
      router.push('/(tabs)/soil_testing');
    } else if (screen === 'ai-assistant') {
      router.push('/(tabs)/ai-assistant');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={32} color="#8B4513" />
          </View>
          <Text style={styles.greeting}>Namaste, Rajesh!</Text>
        </View>
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
        currentScreen="home"
      />

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        {/* Weather Card */}
        <View style={styles.weatherCard}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800' }}
            style={styles.weatherImage}
            imageStyle={styles.weatherImageStyle}
          >
            <View style={styles.weatherOverlay} />
            <View style={styles.weatherIconContainer}>
              <MaterialIcons name="wb-sunny" size={40} color="#FDB813" />
            </View>
          </ImageBackground>
          <View style={styles.weatherInfo}>
            <Text style={styles.weatherLabel}>LOCAL WEATHER</Text>
            <View style={styles.tempContainer}>
              <Text style={styles.temperature}>32°C</Text>
              <Text style={styles.weatherCondition}>- Sunny</Text>
            </View>
            <Text style={styles.location}>Ludhiana, Punjab</Text>
            <TouchableOpacity style={styles.forecastButton}>
              <Text style={styles.forecastButtonText}>View Forecast</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Your Crops Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Crops</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cropCard}>
          <View style={styles.cropInfo}>
            <View style={styles.cropStatusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>CROP STATUS</Text>
            </View>
            <Text style={styles.cropName}>Wheat - Healthy</Text>
            <Text style={styles.cropDetails}>Sown 45 days ago</Text>
            <TouchableOpacity style={styles.healthDetailsButton}>
              <Text style={styles.healthDetailsText}>Health Details</Text>
              <MaterialIcons name="chevron-right" size={20} color="#333" />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400' }}
            style={styles.cropImage}
          />
        </View>

        {/* Today's Mandi Prices */}
        <TouchableOpacity style={styles.mandiPricesCard}>
          <View style={styles.mandiPricesContent}>
            <MaterialIcons name="trending-up" size={24} color="#1E7F43" />
            <Text style={styles.mandiPricesText}>Today's Mandi Prices</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        {/* Ask AgriBot Button */}
        <TouchableOpacity 
          style={styles.agriBotButton}
          onPress={() => handleNavigate('ai-assistant')}
        >
          <MaterialIcons name="mic" size={28} color="#FFFFFF" />
          <Text style={styles.agriBotText}>Ask AgriBot</Text>
        </TouchableOpacity>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFB74D',
  },
  greeting: {
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
  weatherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 24,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weatherImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  weatherImageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  weatherOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  weatherIconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  weatherInfo: {
    padding: 20,
  },
  weatherLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E7F43',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  weatherCondition: {
    fontSize: 20,
    color: '#666',
    marginLeft: 8,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  forecastButton: {
    backgroundColor: '#1E7F43',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  forecastButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 16,
    color: '#1E7F43',
    fontWeight: '600',
  },
  cropCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cropInfo: {
    flex: 1,
    paddingRight: 12,
  },
  cropStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cropName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  cropDetails: {
    fontSize: 14,
    color: '#999',
    marginBottom: 12,
  },
  healthDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  healthDetailsText: {
    fontSize: 14,
    color: '#333',
    marginRight: 4,
  },
  cropImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  mandiPricesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  mandiPricesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  mandiPricesText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  agriBotButton: {
    backgroundColor: '#1E7F43',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 50,
    gap: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  agriBotText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 30,
  },
});
