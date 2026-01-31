
import React, { useState } from 'react';
import { TextInput, Pressable, StyleSheet } from 'react-native';
import { calculateBMI } from '../utils/calculateBMI';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function BMICalculatorScreen() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const router = useRouter();

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!w || !h) return;
    const result = calculateBMI(w, h);
    setBmi(result);
    router.push({ pathname: 'bmi-result', params: { bmi: result } });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>BMI Calculator</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        placeholderTextColor="#888"
      />
      <Pressable style={styles.button} onPress={handleCalculate}>
        <ThemedText type="defaultSemiBold" style={styles.buttonText}>Calculate BMI</ThemedText>
      </Pressable>
      {bmi !== null && (
        <ThemedText type="subtitle" style={styles.result}>Your BMI: {bmi}</ThemedText>
      )}
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
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    width: 280,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    fontSize: 18,
    backgroundColor: '#fff',
    color: '#222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 8,
    marginBottom: 16,
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
  result: {
    marginTop: 24,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
