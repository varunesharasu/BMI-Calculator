import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BMIHistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('bmiHistory').then(data => {
      if (data) setHistory(JSON.parse(data));
    });
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>BMI History</ThemedText>
      <FlatList
        data={history}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <ThemedText style={styles.value}>BMI: {item.bmi}</ThemedText>
            <ThemedText style={styles.meta}>{item.date}</ThemedText>
          </View>
        )}
        ListEmptyComponent={<ThemedText>No history yet.</ThemedText>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { marginBottom: 18, textAlign: 'center' },
  item: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, width: '98%', alignSelf: 'center' },
  value: { fontSize: 17, fontWeight: 'bold' },
  meta: { fontSize: 12, color: '#888', marginTop: 4 },
});
