import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  currentScreen: string;
}

export function DrawerMenu({ visible, onClose, onNavigate, currentScreen }: DrawerMenuProps) {
  const slideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const menuItems = [
    { id: 'home', title: 'Home', icon: 'home' },
    { id: 'profile', title: 'Profile', icon: 'person' },
    { id: 'farm', title: "Let's Farm", icon: 'agriculture' },
    { id: 'settings', title: 'Settings', icon: 'settings' },
    { id: 'contact', title: 'Contact Us', icon: 'phone' },
    { id: 'about', title: 'About us', icon: 'info' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <Animated.View 
          style={[
            styles.drawer,
            { transform: [{ translateX: slideAnim }] }
          ]}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerTitle}>AGRIBOTICS</Text>
          </View>

          <View style={styles.menuItems}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  currentScreen === item.id && styles.menuItemActive
                ]}
                onPress={() => {
                  onNavigate(item.id);
                  onClose();
                }}
              >
                <MaterialIcons name={item.icon} size={22} color={currentScreen === item.id ? '#FFFFFF' : '#333'} style={styles.menuIcon} />
                <Text style={[
                  styles.menuText,
                  currentScreen === item.id && styles.menuTextActive
                ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    width: 280,
    height: '100%',
    backgroundColor: '#A8E6A0',
    paddingTop: 50,
    position: 'absolute',
    right: 0,
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: '#1E7F43',
    marginBottom: 20,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  menuItems: {
    flex: 1,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#D3D3D3',
    borderRadius: 8,
    marginBottom: 12,
  },
  menuItemActive: {
    backgroundColor: '#4A9FD8',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  menuTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
