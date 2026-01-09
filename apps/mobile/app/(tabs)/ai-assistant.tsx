import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AIAssistantScreen() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* WhatsApp-style Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <MaterialIcons name="smart-toy" size={28} color="#FFFFFF" />
          </View>
          <View style={styles.onlineIndicator} />
        </View>
        
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>AgriBot</Text>
          <Text style={styles.headerSubtitle}>Online • Available in Hindi & English</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon}>
            <MaterialIcons name="call" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <MaterialIcons name="more-vert" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Area */}
      <ScrollView style={styles.chatContainer} showsVerticalScrollIndicator={false}>
        {/* Date Separator */}
        <View style={styles.dateSeparator}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>TODAY</Text>
          </View>
        </View>

        {/* AI Message - Left */}
        <View style={styles.messageContainer}>
          <View style={styles.messageBubbleAI}>
            <Text style={styles.messageTextAI}>
              Namaste! Kaise hain aap? How can I help with your crops today?
            </Text>
            <Text style={styles.messageTime}>09:15 AM</Text>
          </View>
        </View>

        {/* User Message - Right */}
        <View style={styles.messageContainerRight}>
          <View style={styles.messageBubbleUser}>
            <Text style={styles.messageTextUser}>
              When is the best time to sow wheat in Punjab this season?
            </Text>
            <Text style={styles.messageTimeUser}>09:16 AM</Text>
          </View>
        </View>

        {/* AI Response with Weather */}
        <View style={styles.messageContainer}>
          <View style={styles.messageBubbleAI}>
            <Text style={styles.messageTextAI}>
              Based on your location and the weather forecast, the next 2 weeks (Oct 25 - Nov 10) are ideal for sowing wheat.
            </Text>
            <View style={styles.weatherInfo}>
              <MaterialIcons name="wb-sunny" size={20} color="#FDB813" />
              <Text style={styles.weatherText}>28°C Clear Skies</Text>
            </View>
            <Text style={styles.messageTime}>09:16 AM</Text>
          </View>
        </View>

        {/* Voice Message */}
        <View style={styles.messageContainerRight}>
          <View style={styles.voiceMessageBubble}>
            <TouchableOpacity style={styles.playButton}>
              <MaterialIcons name="play-arrow" size={24} color="#1E7F43" />
            </TouchableOpacity>
            <View style={styles.waveformContainer}>
              <View style={[styles.waveBar, { height: 12 }]} />
              <View style={[styles.waveBar, { height: 20 }]} />
              <View style={[styles.waveBar, { height: 16 }]} />
              <View style={[styles.waveBar, { height: 24 }]} />
              <View style={[styles.waveBar, { height: 18 }]} />
              <View style={[styles.waveBar, { height: 22 }]} />
              <View style={[styles.waveBar, { height: 14 }]} />
            </View>
            <Text style={styles.voiceDuration}>0:12</Text>
          </View>
        </View>

        {/* Quick Action Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.quickActionsContainer}
          contentContainerStyle={styles.quickActionsContent}
        >
          <TouchableOpacity style={styles.quickActionChip}>
            <MaterialIcons name="wb-cloudy" size={18} color="#1E7F43" />
            <Text style={styles.quickActionText}>Weather</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionChip}>
            <MaterialIcons name="trending-up" size={18} color="#1E7F43" />
            <Text style={styles.quickActionText}>Market Prices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionChip}>
            <MaterialIcons name="eco" size={18} color="#1E7F43" />
            <Text style={styles.quickActionText}>Crop Info</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionChip}>
            <MaterialIcons name="science" size={18} color="#1E7F43" />
            <Text style={styles.quickActionText}>Soil Test</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>

      {/* WhatsApp-style Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.emojiButton}>
            <MaterialIcons name="emoji-emotions" size={24} color="#666" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          
          <TouchableOpacity style={styles.attachButton}>
            <MaterialIcons name="attach-file" size={24} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cameraButton}>
            <MaterialIcons name="camera-alt" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.sendButton}>
          <MaterialIcons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE5DD',
  },
  // WhatsApp-style Green Header
  header: {
    backgroundColor: '#1E7F43',
    paddingTop: 45,
    paddingBottom: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#128C7E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#1E7F43',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#E8F5E9',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerIcon: {
    padding: 4,
  },
  // Chat Area
  chatContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 12,
  },
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dateBadge: {
    backgroundColor: '#E1F5E1',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    elevation: 1,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  // Message Containers
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  messageContainerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  // AI Message Bubble (Left - Light Green)
  messageBubbleAI: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderTopLeftRadius: 0,
    padding: 12,
    maxWidth: '80%',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageTextAI: {
    fontSize: 15,
    color: '#000',
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  // User Message Bubble (Right - White)
  messageBubbleUser: {
    backgroundColor: '#E1F5E1',
    borderRadius: 8,
    borderTopRightRadius: 0,
    padding: 12,
    maxWidth: '80%',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageTextUser: {
    fontSize: 15,
    color: '#000',
    lineHeight: 20,
  },
  messageTimeUser: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  // Weather Info in Message
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  weatherText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  // Voice Message
  voiceMessageBubble: {
    backgroundColor: '#E1F5E1',
    borderRadius: 8,
    borderTopRightRadius: 0,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '60%',
    gap: 8,
    elevation: 1,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  waveBar: {
    width: 3,
    backgroundColor: '#1E7F43',
    borderRadius: 2,
  },
  voiceDuration: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  // Quick Action Chips
  quickActionsContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  quickActionsContent: {
    paddingHorizontal: 4,
    gap: 8,
  },
  quickActionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    gap: 6,
  },
  quickActionText: {
    fontSize: 14,
    color: '#1E7F43',
    fontWeight: '600',
  },
  // WhatsApp Input Area
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'flex-end',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  emojiButton: {
    padding: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 6,
    paddingHorizontal: 8,
    maxHeight: 100,
  },
  attachButton: {
    padding: 4,
    transform: [{ rotate: '45deg' }],
  },
  cameraButton: {
    padding: 4,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E7F43',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
