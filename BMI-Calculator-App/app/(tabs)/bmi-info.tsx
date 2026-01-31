import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeInUp,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  ZoomIn,
  SlideInUp,
} from 'react-native-reanimated';

export default function BMIInfoScreen() {
  return (
    <LinearGradient colors={['#11998e', '#38ef7d']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.container}>
          <Animated.View entering={FadeInUp.duration(600).delay(100)}>
            <ThemedText type="title" style={styles.title}>📚 About BMI</ThemedText>
          </Animated.View>

          <Animated.View entering={ZoomIn.duration(500).delay(200)} style={styles.card}>
            <View style={styles.iconRow}>
              <ThemedText style={styles.cardIcon}>📏</ThemedText>
            </View>
            <ThemedText style={styles.cardTitle}>What is BMI?</ThemedText>
            <ThemedText style={styles.cardText}>
              BMI (Body Mass Index) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in metres squared.
            </ThemedText>
          </Animated.View>

          <Animated.View entering={FadeInLeft.duration(500).delay(300)} style={styles.card}>
            <View style={styles.iconRow}>
              <ThemedText style={styles.cardIcon}>🎯</ThemedText>
            </View>
            <ThemedText style={styles.cardTitle}>Purpose</ThemedText>
            <ThemedText style={styles.cardText}>
              BMI is used as a screening tool to indicate whether a person is underweight, healthy weight, overweight, or obese. It does not directly assess body fat.
            </ThemedText>
          </Animated.View>

          <Animated.View entering={FadeInRight.duration(500).delay(400)} style={styles.card}>
            <View style={styles.iconRow}>
              <ThemedText style={styles.cardIcon}>⚠️</ThemedText>
            </View>
            <ThemedText style={styles.cardTitle}>Limitations</ThemedText>
            <ThemedText style={styles.cardText}>
              BMI does not account for muscle mass, bone density, overall body composition, and racial and sex differences. It is a useful general guideline but not a diagnostic tool.
            </ThemedText>
          </Animated.View>

          <Animated.View entering={SlideInUp.duration(500).delay(500)} style={styles.tipsCard}>
            <View style={styles.iconRow}>
              <ThemedText style={styles.cardIcon}>💡</ThemedText>
            </View>
            <ThemedText style={styles.tipsTitle}>Tips for a Healthy BMI</ThemedText>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipEmoji}>🥗</ThemedText>
              <ThemedText style={styles.tipText}>Eat a balanced diet rich in fruits, vegetables, and whole grains.</ThemedText>
            </View>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipEmoji}>🏃</ThemedText>
              <ThemedText style={styles.tipText}>Exercise regularly - aim for at least 30 minutes daily.</ThemedText>
            </View>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipEmoji}>🚭</ThemedText>
              <ThemedText style={styles.tipText}>Avoid smoking and limit alcohol consumption.</ThemedText>
            </View>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipEmoji}>👨‍⚕️</ThemedText>
              <ThemedText style={styles.tipText}>Consult a healthcare provider for personalized advice.</ThemedText>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.duration(500).delay(600)} style={styles.bmiRangeCard}>
            <ThemedText style={styles.rangeTitle}>📊 BMI Categories</ThemedText>
            <View style={styles.rangeRow}>
              <View style={[styles.rangeBadge, { backgroundColor: '#f39c12' }]}>
                <ThemedText style={styles.rangeBadgeText}>{'<18.5'}</ThemedText>
              </View>
              <ThemedText style={styles.rangeLabel}>Underweight</ThemedText>
            </View>
            <View style={styles.rangeRow}>
              <View style={[styles.rangeBadge, { backgroundColor: '#27ae60' }]}>
                <ThemedText style={styles.rangeBadgeText}>18.5-24.9</ThemedText>
              </View>
              <ThemedText style={styles.rangeLabel}>Normal</ThemedText>
            </View>
            <View style={styles.rangeRow}>
              <View style={[styles.rangeBadge, { backgroundColor: '#e67e22' }]}>
                <ThemedText style={styles.rangeBadgeText}>25-29.9</ThemedText>
              </View>
              <ThemedText style={styles.rangeLabel}>Overweight</ThemedText>
            </View>
            <View style={styles.rangeRow}>
              <View style={[styles.rangeBadge, { backgroundColor: '#e74c3c' }]}>
                <ThemedText style={styles.rangeBadgeText}>{'≥30'}</ThemedText>
              </View>
              <ThemedText style={styles.rangeLabel}>Obese</ThemedText>
            </View>
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
    paddingVertical: 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  iconRow: {
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    textAlign: 'center',
  },
  tipsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 14,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  tipEmoji: {
    fontSize: 20,
    marginRight: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#444',
    flex: 1,
    lineHeight: 20,
  },
  bmiRangeCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  rangeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 14,
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rangeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  rangeBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  rangeLabel: {
    marginLeft: 12,
    fontSize: 15,
    color: '#444',
    fontWeight: '500',
  },
});
