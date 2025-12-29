import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {/* Camera Icon - Left */}
      <TouchableOpacity style={styles.iconButton}>
        <MaterialIcons name="camera-alt" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* AI Assistant Input - Center */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type Message"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton}>
          <MaterialIcons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Mic Icon - Right */}
      <TouchableOpacity style={styles.micButton}>
        <MaterialIcons name="mic" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#098c2cff',
    height: 65,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 0,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#3C3C4A',
    borderRadius: 24,
    marginHorizontal: 8,
    paddingLeft: 16,
    paddingRight: 4,
    alignItems: 'center',
    height: 48,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1E7F43',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  micButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0af35cff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
