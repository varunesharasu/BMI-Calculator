import React, { useEffect } from 'react';
import { StyleSheet, Pressable, View, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import Animated, {
  FadeInUp,
  FadeInDown,
  ZoomIn,
  BounceIn,
  SlideInRight,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
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
  const pulseScale = useSharedValue(1);
  const emojiRotation = useSharedValue(0);

  useEffect(() => {
    // Pulse animation for the result circle
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    // Emoji bounce
    emojiRotation.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 300 }),
        withTiming(10, { duration: 300 }),
        withTiming(0, { duration: 300 })
      ),
      3,
      false
    );
  }, []);

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.92);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const animatedPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const animatedEmojiStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${emojiRotation.value}deg` }],
  }));

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.container}>
          <Animated.View entering={FadeInUp.duration(600).delay(100)}>
            <ThemedText type="title" style={styles.title}>📊 Your BMI Result</ThemedText>
          </Animated.View>

          <Animated.View entering={BounceIn.duration(800).delay(200)} style={[styles.resultCircle, animatedPulseStyle]}>
            <Animated.View style={animatedEmojiStyle}>
              <ThemedText style={styles.emoji}>{emoji}</ThemedText>
            </Animated.View>
            <ThemedText type="title" style={styles.bmiValue}>{bmiValue || '--'}</ThemedText>
            <View style={[styles.categoryBadge, { backgroundColor: color }]}>
              <ThemedText style={styles.categoryText}>{category}</ThemedText>
            </View>
          </Animated.View>

          <Animated.View entering={SlideInRight.duration(500).delay(500)} style={styles.infoCard}>
            {healthyRange && (
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>🎯 Healthy Range</ThemedText>
                <ThemedText style={styles.infoValue}>{healthyRange}</ThemedText>
              </View>
            )}
            <View style={styles.divider} />
            <ThemedText style={styles.advice}>{advice}</ThemedText>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(700)}>
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
    justifyContent: 'center',
    paddingVertical: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 28,
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },
  resultCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  emoji: {
    fontSize: 36,
    marginBottom: 6,
  },
  bmiValue: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 50,
  },
  categoryBadge: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 15,
    color: '#555',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 14,
  },
  advice: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  button: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#4facfe',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
