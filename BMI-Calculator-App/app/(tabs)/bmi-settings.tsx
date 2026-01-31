import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function BMISettingsScreen() {
  const [isMetric, setIsMetric] = useState(true);

  // In a real app, persist this setting

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Settings</ThemedText>
      <View style={styles.row}>
        <ThemedText style={styles.label}>Use Metric Units</ThemedText>
        <Switch value={isMetric} onValueChange={setIsMetric} />
      </View>
      <ThemedText style={styles.note}>
        (Imperial units coming soon)
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 18, textAlign: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  label: { fontSize: 15 },
  note: { fontSize: 12, color: '#888', marginTop: 8 },
});
