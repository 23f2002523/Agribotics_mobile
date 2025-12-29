import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
export default function AIAssistantScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Assistant</Text>
      </View>

      <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeCard}>
          <MaterialIcons name="smart-toy" size={48} color="#1E7F43" style={styles.welcomeIcon} />
          <Text style={styles.welcomeTitle}>Welcome to AgriBotics AI</Text>
          <Text style={styles.welcomeText}>
            I'm your smart farming assistant. Ask me anything about crops, soil, weather, or farming practices!
          </Text>
        </View>

        {/* Sample Chat Bubbles */}
        <View style={styles.messageBubbleUser}>
          <Text style={styles.messageText}>What crops should I plant this season?</Text>
        </View>

        <View style={styles.messageBubbleAI}>
          <Text style={styles.messageText}>
            Based on your location and current season, I recommend planting wheat, mustard, or chickpeas. 
            These crops thrive in winter and are well-suited for your soil type.
          </Text>
        </View>

        <View style={styles.suggestionContainer}>
          <Text style={styles.suggestionTitle}>Quick Questions:</Text>
          <TouchableOpacity style={styles.suggestionButton}>
            <View style={styles.suggestionRow}>
              <MaterialIcons name="eco" size={18} color="#1E7F43" />
              <Text style={styles.suggestionText}>Crop recommendations</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionButton}>
            <View style={styles.suggestionRow}>
              <MaterialIcons name="wb-sunny" size={18} color="#1E7F43" />
              <Text style={styles.suggestionText}>Weather forecast</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionButton}>
            <View style={styles.suggestionRow}>
              <MaterialIcons name="attach-money" size={18} color="#1E7F43" />
              <Text style={styles.suggestionText}>Market prices</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suggestionButton}>
            <View style={styles.suggestionRow}>
              <MaterialIcons name="science" size={18} color="#1E7F43" />
              <Text style={styles.suggestionText}>Soil analysis</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything about farming..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
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
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E3E8E3',
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeIcon: {
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E7F43',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: '#6B4F3F',
    textAlign: 'center',
    lineHeight: 20,
  },
  messageBubbleUser: {
    backgroundColor: '#1E7F43',
    borderRadius: 16,
    borderBottomRightRadius: 4,
    padding: 14,
    marginBottom: 12,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  messageBubbleAI: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E3E8E3',
    padding: 14,
    marginBottom: 12,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  suggestionContainer: {
    marginVertical: 20,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B4F3F',
    marginBottom: 12,
  },
  suggestionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E3E8E3',
    padding: 14,
    marginBottom: 8,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E3E8E3',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#F7F9F7',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E3E8E3',
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#1E7F43',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});
