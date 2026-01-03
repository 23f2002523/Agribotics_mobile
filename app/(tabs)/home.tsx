import { DrawerMenu } from '@/components/drawer-menu';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        <Text style={styles.headerTitle}>AGRIBOTICS</Text>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setDrawerVisible(true)}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <DrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onNavigate={handleNavigate}
        currentScreen="home"
      />

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <Text style={styles.greeting}>Hello, {'{user}'}</Text>

        {/* Cards Grid */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Which crop u want this season?</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('soil_testing')}>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>check ur soil nutrition !</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Additional Cards Row */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Weather Forecast</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Market Prices</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* AI Assistant Card */}
        <View style={styles.singleCardContainer}>
          <TouchableOpacity style={styles.card} onPress={() => handleNavigate('ai-assistant')}>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>AI Assistant</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F7',
  },
  header: {
    backgroundColor: '#1E7F43',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 18,
    color: '#333',
    marginTop: 24,
    marginBottom: 20,
    fontWeight: '500',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  singleCardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3E8E3',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardContent: {
    padding: 20,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    lineHeight: 20,
  },
});
