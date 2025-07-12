import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ProgressBar({ progress = 0.5 }) {
  const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },
  background: {
    width: '100%',
    height: 7,
    borderRadius: 8,
    backgroundColor: '#444444', // Dark gray background
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#F07900', // Orange primary
    borderRadius: 8,
  },
  label: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#1a202c',
  },
});

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

