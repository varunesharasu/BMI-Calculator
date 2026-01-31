
import React, { useState } from 'react';
import { View, StyleSheet, Switch, Alert, TouchableOpacity, Linking } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function BMISettingsScreen() {
  const [isMetric, setIsMetric] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // In a real app, persist these settings

  const handleReset = () => {
    setIsMetric(true);
    setIsDarkMode(false);
    Alert.alert('Settings Reset', 'All settings have been reset to default.');
  };

  const handleContact = () => {
    Linking.openURL('mailto:developer@email.com?subject=BMI%20Calculator%20Feedback');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Settings</ThemedText>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Units</ThemedText>
        <View style={styles.row}>
          <ThemedText style={styles.label}>Use Metric Units</ThemedText>
          <Switch value={isMetric} onValueChange={setIsMetric} />
        </View>
        <ThemedText style={styles.note}>
          Metric: kg/cm | Imperial: lb/in (coming soon)
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>
        <View style={styles.row}>
          <ThemedText style={styles.label}>Dark Mode</ThemedText>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>
        <ThemedText style={styles.note}>
          Switch between light and dark themes.
        </ThemedText>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <ThemedText style={styles.resetText}>Reset to Default</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>About</ThemedText>
        <ThemedText style={styles.aboutText}>BMI Calculator v1.0.0</ThemedText>
        <ThemedText style={styles.aboutText}>Developed by Varunesh Arasu</ThemedText>
        <TouchableOpacity onPress={handleContact}>
          <ThemedText style={styles.contactLink}>Contact / Feedback</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 18, textAlign: 'center', fontSize: 24, fontWeight: 'bold' },
  section: { marginBottom: 24, backgroundColor: '#f5f5fa', borderRadius: 12, padding: 14, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#4a4a4a' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  label: { fontSize: 15 },
  note: { fontSize: 12, color: '#888', marginTop: 2 },
  resetButton: { backgroundColor: '#ff5c5c', borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginTop: 4 },
  resetText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  aboutText: { fontSize: 13, color: '#555', marginBottom: 2 },
  contactLink: { color: '#007aff', fontSize: 14, marginTop: 4, textDecorationLine: 'underline' },
});
