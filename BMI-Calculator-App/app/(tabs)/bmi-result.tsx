import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import Animated, {
  FadeInUp,
  FadeInDown,
  ZoomIn,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function getBMICategory(bmi: number): { category: string; color: string; emoji: string } {
  if (bmi < 18.5) return { category: 'Underweight', color: '#f39c12', emoji: '🍃' };
  if (bmi < 24.9) return { category: 'Normal weight', color: '#27ae60', emoji: '✅' };
  if (bmi < 29.9) return { category: 'Overweight', color: '#e67e22', emoji: '⚠️' };
  return { category: 'Obesity', color: '#e74c3c', emoji: '🚨' };
}

function getHealthyWeightRange(height: number): string {
  // height in cm
  const h = height / 100;
  const min = (18.5 * h * h).toFixed(1);
  const max = (24.9 * h * h).toFixed(1);
  return `${min} kg - ${max} kg`;
}

function getBMIAdvice(bmi: number): string {
  if (bmi < 18.5) return 'You are underweight. Consider a balanced diet to gain weight.';
  if (bmi < 24.9) return 'You have a normal body weight. Good job!';
  if (bmi < 29.9) return 'You are overweight. Consider regular exercise and a healthy diet.';
  return 'You are in the obesity range. Consult a healthcare provider for advice.';
}

export default function BMIResultScreen() {
  const { bmi, height } = useLocalSearchParams();
  const router = useRouter();
  const bmiValue = typeof bmi === 'string' ? parseFloat(bmi) : Array.isArray(bmi) ? parseFloat(bmi[0]) : 0;
  const heightValue = typeof height === 'string' ? parseFloat(height) : Array.isArray(height) ? parseFloat(height[0]) : 0;
  const { category, color, emoji } = getBMICategory(bmiValue);
  const healthyRange = heightValue ? getHealthyWeightRange(heightValue) : null;
  const advice = getBMIAdvice(bmiValue);

  const buttonScale = useSharedValue(1);

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
      <ThemedView style={styles.container}>
        <Animated.View entering={FadeInUp.duration(500).delay(100)}>
          <ThemedText type="title" style={styles.title}>📊 Your BMI Result</ThemedText>
        </Animated.View>

        <Animated.View entering={ZoomIn.duration(600).delay(200)} style={styles.resultCircle}>
          <ThemedText style={styles.emoji}>{emoji}</ThemedText>
          <ThemedText type="title" style={styles.bmiValue}>{bmiValue || '--'}</ThemedText>
          <ThemedText style={[styles.categoryText, { color }]}>{category}</ThemedText>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(500).delay(400)} style={styles.infoCard}>
          {healthyRange && (
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>🎯 Healthy Range</ThemedText>
              <ThemedText style={styles.infoValue}>{healthyRange}</ThemedText>
            </View>
          )}
          <View style={styles.divider} />
          <ThemedText style={styles.advice}>{advice}</ThemedText>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(600)}>
          <AnimatedPressable
            style={[styles.button, animatedButtonStyle]}
            onPress={() => router.back()}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <LinearGradient
              colors={['#4facfe', '#00f2fe']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                ← Calculate Again
              </ThemedText>
            </LinearGradient>
          </AnimatedPressable>
        </Animated.View>
      </ThemedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  resultCircle: {
    width: '80%',
    maxWidth: 220,
    aspectRatio: 1,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
    alignSelf: 'center',
  },
  emoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    width: '90%',
    maxWidth: 350,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  advice: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
