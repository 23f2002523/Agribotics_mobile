import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Profile</Text>
        
        {/* Profile Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <MaterialIcons name="person" size={48} color="#FFFFFF" />
          </View>
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.section}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>John Farmer</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>john.farmer@example.com</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>+91 98765 43210</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Farm Location</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Maharashtra, India</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Farm Size</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>5 Acres</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Farming Experience</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>10 Years</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1E7F43',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  changePhotoButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changePhotoText: {
    fontSize: 14,
    color: '#1E7F43',
    fontWeight: '600',
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
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E3E8E3',
    padding: 14,
  },
  inputText: {
    fontSize: 15,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#1E7F43',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E3E8E3',
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B4F3F',
  },
});
