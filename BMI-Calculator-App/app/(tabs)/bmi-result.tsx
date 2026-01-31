import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 24.9) return 'Normal weight';
  if (bmi < 29.9) return 'Overweight';
  return 'Obesity';
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
  const category = getBMICategory(bmiValue);
  const healthyRange = heightValue ? getHealthyWeightRange(heightValue) : null;
  const advice = getBMIAdvice(bmiValue);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Your BMI Result</ThemedText>
      <ThemedText type="large" style={styles.bmi}>{bmiValue || '--'}</ThemedText>
      <ThemedText type="subtitle" style={styles.category}>{category}</ThemedText>
      {healthyRange && (
        <ThemedText style={styles.range}>Healthy weight range for your height: {healthyRange}</ThemedText>
      )}
      <ThemedText style={styles.advice}>{advice}</ThemedText>
      <Pressable style={styles.button} onPress={() => router.back()}>
        <ThemedText type="defaultSemiBold" style={styles.buttonText}>Back</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 18,
    textAlign: 'center',
  },
  bmi: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
    textAlign: 'center',
  },
  category: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
    textAlign: 'center',
  },
  range: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
    textAlign: 'center',
  },
  advice: {
    fontSize: 16,
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 36,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
