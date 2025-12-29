import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ContactUsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Contact Us</Text>
        
        <Text style={styles.description}>
          Have questions or feedback? We'd love to hear from you!
        </Text>

        {/* Contact Form */}
        <View style={styles.section}>
          <Text style={styles.label}>Name</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Subject</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter subject"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Message</Text>
          <TextInput 
            style={[styles.input, styles.textArea]}
            placeholder="Type your message here..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>

        {/* Contact Information */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Other Ways to Reach Us</Text>
          
          <View style={styles.infoCard}>
            <MaterialIcons name="email" size={28} color="#1E7F43" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoText}>support@agribotics.com</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <MaterialIcons name="phone" size={28} color="#1E7F43" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoText}>+91 1800-123-4567</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <MaterialIcons name="language" size={28} color="#1E7F43" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Website</Text>
              <Text style={styles.infoText}>www.agribotics.com</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <MaterialIcons name="location-on" size={28} color="#1E7F43" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoText}>123 Farm Tech Plaza, Mumbai, India</Text>
            </View>
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
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#6B4F3F',
    marginBottom: 24,
    lineHeight: 22,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B4F3F',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E3E8E3',
    padding: 14,
    fontSize: 15,
    color: '#333',
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  submitButton: {
    backgroundColor: '#1E7F43',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoSection: {
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E7F43',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3E8E3',
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B4F3F',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
});
