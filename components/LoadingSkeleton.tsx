import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

type SkeletonProps = {
  height?: number;
  width?: number;
};

const LoadingSkeleton = ({ height = 280, width = 170 }: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        opacity,
        height,
        width,
        backgroundColor: '#2a2a2a', // replace with your secondary color
        borderRadius: 16,
      }}
    />
  );
};

export default LoadingSkeleton;
