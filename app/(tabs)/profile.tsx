import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ProfileScreen() {
  // For demo purposes, assuming user is not logged in
  const isLoggedIn = false;

  const handleLogin = () => {
    router.push('/(tabs)/login');
  };

  const handleSignup = () => {
    router.push('/(tabs)/register');
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.authContainer}>
          <View style={styles.authHeader}>
            <MaterialIcons name="person" size={64} color="#1E7F43" />
            <Text style={styles.authTitle}>Welcome to Agribotics</Text>
            <Text style={styles.authSubtitle}>Please login or create an account to access your profile</Text>
          </View>

          <View style={styles.authButtons}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <MaterialIcons name="login" size={24} color="#FFFFFF" />
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
              <MaterialIcons name="person-add" size={24} color="#FFFFFF" />
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>What you can do:</Text>
            <View style={styles.featureItem}>
              <MaterialIcons name="agriculture" size={20} color="#1E7F43" />
              <Text style={styles.featureText}>Manage your farm data</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="analytics" size={20} color="#1E7F43" />
              <Text style={styles.featureText}>Track soil health</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="smart-toy" size={20} color="#1E7F43" />
              <Text style={styles.featureText}>Get AI farming advice</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="cloud-upload" size={20} color="#1E7F43" />
              <Text style={styles.featureText}>Upload and analyze reports</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

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
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E7F43',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  authSubtitle: {
    fontSize: 16,
    color: '#6B4F3F',
    textAlign: 'center',
    lineHeight: 22,
  },
  authButtons: {
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#1E7F43',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  signupButton: {
    backgroundColor: '#0af35cff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  featuresContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E7F43',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
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
