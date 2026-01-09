import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function BrandingScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.brandName}>AgriBotics</Text>
      <Text style={styles.tagline}>Grow Smart Be Smart</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0eb708ff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  brandName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#042003ff',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 20,
    color: '#042003ff',
    fontStyle: 'italic',
    letterSpacing: 1,
  },
});
