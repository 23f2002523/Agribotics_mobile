import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>About Us</Text>
        
        <View style={styles.logoContainer}>
          <MaterialIcons name="eco" size={64} color="#1E7F43" style={styles.logo} />
          <Text style={styles.appName}>AgriBotics</Text>
          <Text style={styles.tagline}>Grow Smart Be Smart</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <View style={styles.card}>
            <Text style={styles.text}>
              AgriBotics is dedicated to empowering farmers with smart technology and AI-driven insights 
              to maximize crop yields, reduce waste, and promote sustainable farming practices.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.card}>
            <Text style={styles.bulletPoint}>• Smart crop recommendations</Text>
            <Text style={styles.bulletPoint}>• Soil nutrition analysis</Text>
            <Text style={styles.bulletPoint}>• Weather forecasting</Text>
            <Text style={styles.bulletPoint}>• Market price tracking</Text>
            <Text style={styles.bulletPoint}>• Farming calendar & reminders</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Version</Text>
          <View style={styles.card}>
            <Text style={styles.text}>Version 1.0.0</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.card}>
            <Text style={styles.text}>Email: support@agribotics.com</Text>
            <Text style={styles.text}>Website: www.agribotics.com</Text>
          </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E7F43',
    marginBottom: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  logo: {
    marginBottom: 12,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E7F43',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: '#6B4F3F',
    fontStyle: 'italic',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B4F3F',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3E8E3',
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  text: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#333',
    lineHeight: 24,
  },
});
