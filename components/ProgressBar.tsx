import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ProgressBar({ progress = 0.5 }) {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
  },
  background: {
    width: '100%',
    height: 7,
    borderRadius: 8,
    backgroundColor: '#e5e7eb', // Tailwind gray-200
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#1A73E8', // Primary
    borderRadius: 8,
  },
  label: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#1a202c',
  },
});
