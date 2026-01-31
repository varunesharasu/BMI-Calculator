import { Image } from 'expo-image';
import { Platform, StyleSheet, ScrollView } from 'react-native';
import { HelloWave } from '@/components/hello-wave';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';

export default function HomeScreen() {
  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.container}>
          <Animated.View entering={FadeInUp.duration(600).delay(100)}>
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title" style={styles.title}>Welcome! 👋</ThemedText>
            </ThemedView>
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(500).delay(200)} style={styles.card}>
            <ThemedText style={styles.cardTitle}>💪 BMI Calculator</ThemedText>
            <ThemedText style={styles.cardText}>
              Calculate your Body Mass Index quickly and easily. Track your health and get personalized advice.
            </ThemedText>
          </Animated.View>

          <Animated.View entering={ZoomIn.duration(500).delay(300)} style={styles.card}>
            <ThemedText style={styles.cardTitle}>📊 Features</ThemedText>
            <ThemedText style={styles.cardText}>
              • Quick BMI calculation{`\n`}
              • Health category insights{`\n`}
              • Personalized recommendations{`\n`}
              • Educational resources{`\n`}
              • Customizable settings
            </ThemedText>
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(500).delay(400)} style={styles.card}>
            <ThemedText style={styles.cardTitle}>🚀 Get Started</ThemedText>
            <ThemedText style={styles.cardText}>
              Tap the BMI tab to start calculating your Body Mass Index and discover your health status.
            </ThemedText>
          </Animated.View>
        </ThemedView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
});
