
import React, { useState } from 'react';
import { TextInput, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  FadeInUp,
  ZoomIn,
} from 'react-native-reanimated';
import { calculateBMI } from '../utils/calculateBMI';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function BMICalculatorScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const router = useRouter();

  const buttonScale = useSharedValue(1);
  const resultOpacity = useSharedValue(0);
  const resultScale = useSharedValue(0.5);

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return;
    const result = calculateBMI(w, h);
    setBmi(result);

    // Animate result
    resultOpacity.value = withTiming(1, { duration: 400 });
    resultScale.value = withSpring(1, { damping: 8, stiffness: 100 });

    setTimeout(() => {
      router.push({ pathname: '/(tabs)/bmi-result', params: { bmi: result, height: h } });
    }, 600);
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const animatedResultStyle = useAnimatedStyle(() => ({
    opacity: resultOpacity.value,
    transform: [{ scale: resultScale.value }],
  }));

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.gradient}>
      <ThemedView style={styles.container}>
        <Animated.View entering={FadeInUp.duration(600).delay(100)}>
          <ThemedText type="title" style={styles.title}>💪 BMI Calculator</ThemedText>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(500).delay(200)} style={styles.card}>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Weight</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter weight"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
              placeholderTextColor="#aaa"
            />
            <ThemedText style={styles.unit}>kg</ThemedText>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Height</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter height"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
              placeholderTextColor="#aaa"
            />
            <ThemedText style={styles.unit}>cm</ThemedText>
          </View>
        </Animated.View>

        <Animated.View entering={ZoomIn.duration(400).delay(400)}>
          <AnimatedPressable
            style={[styles.button, animatedButtonStyle]}
            onPress={handleCalculate}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                Calculate BMI
              </ThemedText>
            </LinearGradient>
          </AnimatedPressable>
        </Animated.View>

        {bmi !== null && (
          <Animated.View style={[styles.resultCard, animatedResultStyle]}>
            <ThemedText style={styles.resultLabel}>Your BMI</ThemedText>
            <ThemedText type="title" style={styles.resultValue}>{bmi}</ThemedText>
          </Animated.View>
        )}
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
    marginBottom: 32,
    textAlign: 'center',
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    width: 60,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    backgroundColor: '#fafafa',
    color: '#222',
    marginHorizontal: 8,
  },
  unit: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    width: 30,
  },
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
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
  resultCard: {
    marginTop: 24,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#667eea',
  },
});
