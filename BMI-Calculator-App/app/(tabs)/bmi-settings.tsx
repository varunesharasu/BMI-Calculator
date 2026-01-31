
import React, { useState } from 'react';
import { View, StyleSheet, Switch, Alert, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';

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
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.container}>
          <Animated.View entering={FadeInUp.duration(600).delay(100)}>
            <ThemedText type="title" style={styles.title}>⚙️ Settings</ThemedText>
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(500).delay(200)} style={styles.section}>
            <ThemedText style={styles.sectionTitle}>📏 Units</ThemedText>
            <View style={styles.row}>
              <ThemedText style={styles.label}>Use Metric Units</ThemedText>
              <Switch value={isMetric} onValueChange={setIsMetric} />
            </View>
            <ThemedText style={styles.note}>
              Metric: kg/cm | Imperial: lb/in (coming soon)
            </ThemedText>
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(500).delay(300)} style={styles.section}>
            <ThemedText style={styles.sectionTitle}>🎨 Appearance</ThemedText>
            <View style={styles.row}>
              <ThemedText style={styles.label}>Dark Mode</ThemedText>
              <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
            </View>
            <ThemedText style={styles.note}>
              Switch between light and dark themes.
            </ThemedText>
          </Animated.View>

          <Animated.View entering={ZoomIn.duration(400).delay(400)} style={styles.section}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <ThemedText style={styles.resetText}>🔄 Reset to Default</ThemedText>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.duration(500).delay(500)} style={styles.section}>
            <ThemedText style={styles.sectionTitle}>ℹ️ About</ThemedText>
            <ThemedText style={styles.aboutText}>BMI Calculator v1.0.0</ThemedText>
            <ThemedText style={styles.aboutText}>Developed by Varunesh Arasu</ThemedText>
            <TouchableOpacity onPress={handleContact}>
              <ThemedText style={styles.contactLink}>📧 Contact / Feedback</ThemedText>
            </TouchableOpacity>
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
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  section: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    color: '#555',
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  resetButton: {
    backgroundColor: '#ff5c5c',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resetText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  aboutText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  contactLink: {
    color: '#007aff',
    fontSize: 15,
    marginTop: 6,
    fontWeight: '600',
  },
});
