import React, { useEffect } from 'react';
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
  BounceIn,
  FlipInXUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export default function BMIInfoScreen() {
  const pulseScale = useSharedValue(1);
  const floatY = useSharedValue(0);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    floatY.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedPulse = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const animatedFloat = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.container}>
          <Animated.View entering={FadeInUp.duration(600).delay(100)}>
            <ThemedText type="title" style={styles.title}>📚 About BMI</ThemedText>
          </Animated.View>

          <Animated.View entering={ZoomIn.duration(500).delay(200)} style={styles.card}>
            <Animated.View style={[styles.iconRow, animatedPulse]}>
              <ThemedText style={styles.cardIcon}>📏</ThemedText>
            </Animated.View>
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

          {/* New: Health Risks Section */}
          <Animated.View entering={BounceIn.duration(600).delay(450)} style={styles.riskCard}>
            <Animated.View style={[styles.iconRow, animatedFloat]}>
              <ThemedText style={styles.cardIcon}>🏥</ThemedText>
            </Animated.View>
            <ThemedText style={styles.cardTitle}>Health Risks by BMI</ThemedText>
            <View style={styles.riskItem}>
              <ThemedText style={styles.riskEmoji}>🍃</ThemedText>
              <View style={styles.riskTextContainer}>
                <ThemedText style={styles.riskLabel}>Underweight</ThemedText>
                <ThemedText style={styles.riskDesc}>Malnutrition, weakened immunity, bone loss, anemia</ThemedText>
              </View>
            </View>
            <View style={styles.riskItem}>
              <ThemedText style={styles.riskEmoji}>✅</ThemedText>
              <View style={styles.riskTextContainer}>
                <ThemedText style={styles.riskLabel}>Normal</ThemedText>
                <ThemedText style={styles.riskDesc}>Lower risk of chronic diseases, optimal health</ThemedText>
              </View>
            </View>
            <View style={styles.riskItem}>
              <ThemedText style={styles.riskEmoji}>⚠️</ThemedText>
              <View style={styles.riskTextContainer}>
                <ThemedText style={styles.riskLabel}>Overweight</ThemedText>
                <ThemedText style={styles.riskDesc}>Increased risk of heart disease, diabetes, joint problems</ThemedText>
              </View>
            </View>
            <View style={styles.riskItem}>
              <ThemedText style={styles.riskEmoji}>🚨</ThemedText>
              <View style={styles.riskTextContainer}>
                <ThemedText style={styles.riskLabel}>Obese</ThemedText>
                <ThemedText style={styles.riskDesc}>High risk of heart disease, stroke, type 2 diabetes, certain cancers</ThemedText>
              </View>
            </View>
          </Animated.View>

          {/* New: BMI Formula Breakdown */}
          <Animated.View entering={FlipInXUp.duration(600).delay(480)} style={styles.formulaCard}>
            <View style={styles.iconRow}>
              <ThemedText style={styles.cardIcon}>🧮</ThemedText>
            </View>
            <ThemedText style={styles.cardTitle}>BMI Formula</ThemedText>
            <View style={styles.formulaBox}>
              <ThemedText style={styles.formulaText}>BMI = Weight (kg) ÷ Height² (m²)</ThemedText>
            </View>
            <ThemedText style={styles.formulaExample}>
              Example: 70kg ÷ (1.75m × 1.75m) = 22.86
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
              <ThemedText style={styles.tipEmoji}>💧</ThemedText>
              <ThemedText style={styles.tipText}>Stay hydrated - drink at least 8 glasses of water daily.</ThemedText>
            </View>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipEmoji}>😴</ThemedText>
              <ThemedText style={styles.tipText}>Get 7-9 hours of quality sleep every night.</ThemedText>
            </View>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipEmoji}>🚭</ThemedText>
              <ThemedText style={styles.tipText}>Avoid smoking and limit alcohol consumption.</ThemedText>
            </View>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipEmoji}>🧘</ThemedText>
              <ThemedText style={styles.tipText}>Manage stress through meditation or relaxation techniques.</ThemedText>
            </View>
            <View style={styles.tipItem}>
              <ThemedText style={styles.tipEmoji}>👨‍⚕️</ThemedText>
              <ThemedText style={styles.tipText}>Consult a healthcare provider for personalized advice.</ThemedText>
            </View>
          </Animated.View>

          {/* New: Interesting Facts */}
          <Animated.View entering={ZoomIn.duration(500).delay(550)} style={styles.factsCard}>
            <View style={styles.iconRow}>
              <ThemedText style={styles.cardIcon}>🌟</ThemedText>
            </View>
            <ThemedText style={styles.cardTitle}>Did You Know?</ThemedText>
            <View style={styles.factItem}>
              <ThemedText style={styles.factBullet}>•</ThemedText>
              <ThemedText style={styles.factText}>BMI was invented by Belgian mathematician Adolphe Quetelet in the 1830s.</ThemedText>
            </View>
            <View style={styles.factItem}>
              <ThemedText style={styles.factBullet}>•</ThemedText>
              <ThemedText style={styles.factText}>Athletes often have a high BMI due to muscle mass, not fat.</ThemedText>
            </View>
            <View style={styles.factItem}>
              <ThemedText style={styles.factBullet}>•</ThemedText>
              <ThemedText style={styles.factText}>BMI standards may vary by country and ethnicity.</ThemedText>
            </View>
            <View style={styles.factItem}>
              <ThemedText style={styles.factBullet}>•</ThemedText>
              <ThemedText style={styles.factText}>Waist-to-hip ratio is another important health indicator.</ThemedText>
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

          {/* Disclaimer */}
          <Animated.View entering={FadeInUp.duration(400).delay(650)} style={styles.disclaimerCard}>
            <ThemedText style={styles.disclaimerText}>
              ⚕️ Disclaimer: BMI is a general indicator and should not replace professional medical advice. Always consult a healthcare provider for accurate health assessments.
            </ThemedText>
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
  riskCard: {
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
  riskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  riskEmoji: {
    fontSize: 22,
    marginRight: 12,
  },
  riskTextContainer: {
    flex: 1,
  },
  riskLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  riskDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  formulaCard: {
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
  formulaBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 12,
    alignItems: 'center',
  },
  formulaText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2e7d32',
  },
  formulaExample: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  factsCard: {
    backgroundColor: '#fff8e1',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  factItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  factBullet: {
    fontSize: 16,
    color: '#f57c00',
    marginRight: 8,
    fontWeight: 'bold',
  },
  factText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
    lineHeight: 20,
  },
  disclaimerCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
