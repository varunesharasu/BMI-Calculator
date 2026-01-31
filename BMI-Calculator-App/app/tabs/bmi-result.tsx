import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BMIResultScreen({ route }: any) {
  const { bmi } = route.params || {};

  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 24.9) category = 'Normal weight';
  else if (bmi < 29.9) category = 'Overweight';
  else category = 'Obesity';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your BMI Result</Text>
      <Text style={styles.bmi}>{bmi}</Text>
      <Text style={styles.category}>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  bmi: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  category: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
