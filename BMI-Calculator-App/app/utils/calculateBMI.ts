// Utility function to calculate BMI
export function calculateBMI(weight: number, height: number): number {
  if (!weight || !height) return 0;
  // height in meters
  const heightInMeters = height / 100;
  return +(weight / (heightInMeters * heightInMeters)).toFixed(2);
}
