import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function BMIInfoScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedText type="title" style={styles.title}>About BMI</ThemedText>
        <ThemedText style={styles.text}>
          BMI (Body Mass Index) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in metres squared.
        </ThemedText>
        <ThemedText style={styles.text}>
          BMI is used as a screening tool to indicate whether a person is underweight, healthy weight, overweight, or obese. It does not directly assess body fat.
        </ThemedText>
        <ThemedText style={styles.subtitle}>Limitations</ThemedText>
        <ThemedText style={styles.text}>
          BMI does not account for muscle mass, bone density, overall body composition, and racial and sex differences. It is a useful general guideline but not a diagnostic tool.
        </ThemedText>
        <ThemedText style={styles.subtitle}>Tips for a Healthy BMI</ThemedText>
        <ThemedText style={styles.text}>
          - Eat a balanced diet rich in fruits, vegetables, and whole grains. {'\n'}
          - Exercise regularly. {'\n'}
          - Avoid smoking and limit alcohol. {'\n'}
          - Consult a healthcare provider for personalized advice.
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 18, textAlign: 'center' },
  subtitle: { marginTop: 18, fontWeight: 'bold', fontSize: 17 },
  text: { fontSize: 14, marginBottom: 10, color: '#333' },
});
