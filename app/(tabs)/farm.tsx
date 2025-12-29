import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function FarmScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Let's Farm</Text>
        
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
  cardText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
