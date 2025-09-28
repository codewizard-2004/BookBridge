import React, { useEffect, useRef } from 'react';
import { Text, View, Animated, TouchableOpacity } from 'react-native';
import { Svg, Defs, LinearGradient, Rect, Stop, Circle } from 'react-native-svg';

interface StatProps1 {
  index: number;
  icon: string;
  title: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Rarity theme configurations
const RARITY_THEMES = {
  common: {
    colors: {
      primary: '#6b7280',
      secondary: '#9ca3af',
      accent: '#d1d5db',
      glow: '#374151',
      text: '#f3f4f6',
      background: ['#111827', '#1f2937', '#374151', '#4b5563', '#1f2937'],
    },
    name: 'Common',
    particle: '•',
    glowIntensity: 0.2,
  },
  rare: {
    colors: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      accent: '#93c5fd',
      glow: '#1e40af',
      text: '#dbeafe',
      background: ['#0f172a', '#1e293b', '#1d4ed8', '#3b82f6', '#1e293b'],
    },
    name: 'Rare',
    particle: '◆',
    glowIntensity: 0.3,
  },
  epic: {
    colors: {
      primary: '#a855f7',
      secondary: '#c084fc',
      accent: '#d8b4fe',
      glow: '#7c3aed',
      text: '#f3e8ff',
      background: ['#0f0a1a', '#2e1065', '#7c3aed', '#a855f7', '#2e1065'],
    },
    name: 'Epic',
    particle: '★',
    glowIntensity: 0.4,
  },
  legendary: {
    colors: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      accent: '#fcd34d',
      glow: '#d97706',
      text: '#fef3c7',
      background: ['#0c0a09', '#451a03', '#d97706', '#f59e0b', '#451a03'],
    },
    name: 'Legendary',
    particle: '✦',
    glowIntensity: 0.5,
  },
};

// Enhanced Gradient Background Component
const EnhancedGradientBackground = ({ rarity }: { rarity: 'common' | 'rare' | 'epic' | 'legendary' }) => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;
  const theme = RARITY_THEMES[rarity];

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: rarity === 'legendary' ? 2000 : rarity === 'epic' ? 2500 : 3000,
          useNativeDriver: false,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: rarity === 'legendary' ? 2000 : rarity === 'epic' ? 2500 : 3000,
          useNativeDriver: false,
        }),
      ])
    );
    shimmer.start();
  }, [rarity]);

  return (
    <Svg height="100%" width="100%" style={{ borderRadius: 12 }}>
      <Defs>
        <LinearGradient id={`mainGrad_${rarity}`} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor={theme.colors.background[0]} stopOpacity="1" />
          <Stop offset="25%" stopColor={theme.colors.background[1]} stopOpacity="1" />
          <Stop offset="50%" stopColor={theme.colors.background[2]} stopOpacity="1" />
          <Stop offset="75%" stopColor={theme.colors.background[3]} stopOpacity="1" />
          <Stop offset="100%" stopColor={theme.colors.background[4]} stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id={`accentGrad_${rarity}`} x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor={theme.colors.primary} stopOpacity="0.8" />
          <Stop offset="50%" stopColor={theme.colors.secondary} stopOpacity="0.6" />
          <Stop offset="100%" stopColor={theme.colors.accent} stopOpacity="0.8" />
        </LinearGradient>
        <LinearGradient id={`shimmerGrad_${rarity}`} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="rgba(255,255,255,0)" stopOpacity="0" />
          <Stop offset="50%" stopColor="rgba(255,255,255,0.15)" stopOpacity="1" />
          <Stop offset="100%" stopColor="rgba(255,255,255,0)" stopOpacity="0" />
        </LinearGradient>
        <LinearGradient id={`glowGrad_${rarity}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={`${theme.colors.primary}40`} stopOpacity="1" />
          <Stop offset="50%" stopColor={`${theme.colors.secondary}30`} stopOpacity="1" />
          <Stop offset="100%" stopColor={`${theme.colors.glow}20`} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      
      {/* Main background */}
      <Rect x="0" y="0" width="100%" height="100%" fill={`url(#mainGrad_${rarity})`} rx={12} ry={12} />
      
      {/* Rarity glow overlay */}
      <Rect x="1" y="1" width="98%" height="98%" 
            fill={`url(#glowGrad_${rarity})`} rx={11} ry={11} />
      
      {/* Accent border */}
      <Rect x="1" y="1" width="98%" height="98%" 
            fill="none" stroke={`url(#accentGrad_${rarity})`} 
            strokeWidth={rarity === 'legendary' ? "2" : rarity === 'epic' ? "1.5" : "1"} 
            rx={11} ry={11} />
      
      {/* Shimmer effect */}
      <Animated.View style={{
        position: 'absolute',
        top: 0,
        left: shimmerAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['-100%', '200%'],
        }),
        width: rarity === 'legendary' ? '80%' : '60%',
        height: '100%',
      }}>
        <Svg height="100%" width="100%">
          <Rect x="0" y="0" width="100%" height="100%" fill={`url(#shimmerGrad_${rarity})`} rx={12} ry={12} />
        </Svg>
      </Animated.View>
      
      {/* Decorative particles based on rarity */}
      <Circle cx="85%" cy="20%" r="1.5" fill={theme.colors.primary} opacity="0.7" />
      <Circle cx="15%" cy="80%" r="2" fill={theme.colors.secondary} opacity="0.5" />
      <Circle cx="90%" cy="75%" r="1" fill={theme.colors.accent} opacity="0.6" />
      <Circle cx="20%" cy="25%" r="0.8" fill={theme.colors.primary} opacity="0.4" />
      {/* Extra particles for higher rarities */}
      {(rarity === 'epic' || rarity === 'legendary') && (
        <>
          <Circle cx="70%" cy="15%" r="1" fill={theme.colors.accent} opacity="0.5" />
          <Circle cx="25%" cy="60%" r="1.2" fill={theme.colors.secondary} opacity="0.4" />
        </>
      )}
      {rarity === 'legendary' && (
        <>
          <Circle cx="50%" cy="10%" r="0.8" fill={theme.colors.accent} opacity="0.6" />
          <Circle cx="80%" cy="50%" r="1" fill={theme.colors.primary} opacity="0.5" />
        </>
      )}
    </Svg>
  );
};

const Achievement = ({icon, title, description, rarity }: StatProps1) => {
  const scaleAnimation = useRef(new Animated.Value(1)).current;
  const glowAnimation = useRef(new Animated.Value(0)).current;
  const floatAnimation = useRef(new Animated.Value(0)).current;
  const particleAnimation = useRef(new Animated.Value(0)).current;

  const theme = RARITY_THEMES[rarity];

  useEffect(() => {
    // Enhanced glow for higher rarities
    const glowDuration = rarity === 'legendary' ? 2000 : rarity === 'epic' ? 2500 : 3000;
    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnimation, {
          toValue: 1,
          duration: glowDuration,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnimation, {
          toValue: 0,
          duration: glowDuration,
          useNativeDriver: false,
        }),
      ])
    );

    // Floating animation - more pronounced for higher rarities
    const floatIntensity = rarity === 'legendary' ? 5 : rarity === 'epic' ? 4 : 3;
    const float = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnimation, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    // Particle animation for epic and legendary
    const particle = Animated.loop(
      Animated.timing(particleAnimation, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
      })
    );

    glow.start();
    float.start();
    if (rarity === 'epic' || rarity === 'legendary') {
      particle.start();
    }
  }, [rarity]);

  const handlePress = () => {
    const scaleIntensity = rarity === 'legendary' ? 1.05 : rarity === 'epic' ? 1.03 : 1.02;
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: scaleIntensity,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const floatRange = rarity === 'legendary' ? 5 : rarity === 'epic' ? 4 : 3;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{ width: '45%' }}
    >
      <Animated.View 
        style={[
          {
            height: 140,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
              { scale: scaleAnimation },
              { 
                translateY: floatAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -floatRange],
                })
              }
            ],
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: theme.glowIntensity,
            shadowRadius: rarity === 'legendary' ? 16 : rarity === 'epic' ? 14 : 12,
            elevation: rarity === 'legendary' ? 15 : rarity === 'epic' ? 12 : 10,
          }
        ]}
      >
        {/* Floating particles for epic and legendary */}
        {(rarity === 'epic' || rarity === 'legendary') && (
          <>
            <Animated.View style={{
              position: 'absolute',
              top: 10,
              left: '20%',
              opacity: particleAnimation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 1, 0],
              }),
              transform: [{
                translateY: particleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -30],
                })
              }],
              zIndex: 20,
            }}>
              <Text style={{ fontSize: 8, color: theme.colors.accent }}>{theme.particle}</Text>
            </Animated.View>
            <Animated.View style={{
              position: 'absolute',
              top: 15,
              right: '25%',
              opacity: particleAnimation.interpolate({
                inputRange: [0, 0.3, 0.7, 1],
                outputRange: [0, 1, 1, 0],
              }),
              transform: [{
                translateY: particleAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -25],
                })
              }],
              zIndex: 20,
            }}>
              <Text style={{ fontSize: 6, color: theme.colors.secondary }}>{theme.particle}</Text>
            </Animated.View>
          </>
        )}

        {/* Content Container */}
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
          paddingHorizontal: 12,
        }}>
          {/* Icon Container */}
          <View style={{
            backgroundColor: `${theme.colors.primary}26`,
            borderRadius: 25,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
            borderWidth: 2,
            borderColor: `${theme.colors.secondary}66`,
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 8,
          }}>
            <Text style={{
              fontSize: 24,
              textShadowColor: theme.colors.primary,
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 6,
            }}>
              {icon}
            </Text>
          </View>

          {/* Achievement Title */}
          <Text style={{
            fontSize: 14,
            fontWeight: '700',
            color: theme.colors.accent,
            textAlign: 'center',
            marginBottom: 6,
            textShadowColor: 'rgba(0,0,0,0.8)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 3,
            letterSpacing: 0.5,
          }}>
            {title}
          </Text>

          {/* Achievement Description */}
          <Text style={{
            fontSize: 11,
            color: theme.colors.text,
            textAlign: 'center',
            lineHeight: 15,
            opacity: 0.9,
            textShadowColor: 'rgba(0,0,0,0.6)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }}>
            {description}
          </Text>

          {/* Rarity Badge */}
          <View style={{
            position: 'absolute',
            top: 6,
            left: 6,
            backgroundColor: theme.colors.primary,
            borderRadius: 8,
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderWidth: 1,
            borderColor: theme.colors.accent,
            shadowColor: theme.colors.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
          }}>
            <Text style={{
              fontSize: 8,
              color: '#000',
              fontWeight: '800',
            }}>
              {theme.name.toUpperCase()}
            </Text>
          </View>

          {/* Achievement Rank */}
        </View>

        {/* Animated glow overlay */}
        <Animated.View style={{
          position: 'absolute',
          top: -4,
          left: -4,
          right: -4,
          bottom: -4,
          borderRadius: 16,
          backgroundColor: glowAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [`${theme.colors.primary}00`, `${theme.colors.primary}${Math.round(theme.glowIntensity * 255).toString(16).padStart(2, '0')}`],
          }),
          zIndex: -1,
        }} />

        {/* Enhanced Gradient Background */}
        <EnhancedGradientBackground rarity={rarity} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Achievement;