import ReadCalendar from '@/components/ReadCalendar'
import { gifs } from '@/constants/gifs'
import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import React, { useEffect, useRef } from 'react'
import { Image, Text, View, Animated, Dimensions, ScrollView } from 'react-native'

const { width } = Dimensions.get('window')

// Animated Fire Component
const AnimatedFire = () => {
  const flameScale = useRef(new Animated.Value(1)).current
  const flameOpacity = useRef(new Animated.Value(0.8)).current
  const flame2Scale = useRef(new Animated.Value(0.9)).current
  const flame3Scale = useRef(new Animated.Value(1.1)).current

  useEffect(() => {
    // Main flame animation
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(flameScale, {
          toValue: 1.15,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(flameScale, {
          toValue: 0.95,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    )

    // Opacity flicker
    const opacityAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(flameOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(flameOpacity, {
          toValue: 0.7,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    )

    // Secondary flames
    const flame2Animation = Animated.loop(
      Animated.sequence([
        Animated.timing(flame2Scale, {
          toValue: 1.2,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(flame2Scale, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    )

    const flame3Animation = Animated.loop(
      Animated.sequence([
        Animated.timing(flame3Scale, {
          toValue: 0.9,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(flame3Scale, {
          toValue: 1.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    )

    scaleAnimation.start()
    opacityAnimation.start()
    flame2Animation.start()
    flame3Animation.start()

    return () => {
      scaleAnimation.stop()
      opacityAnimation.stop()
      flame2Animation.stop()
      flame3Animation.stop()
    }
  }, [])

  return (
    <View style={{ position: 'relative', width: 120, height: 150, alignItems: 'center', justifyContent: 'center' }}>
      {/* Background flames for depth */}
      <Animated.View
        style={{
          position: 'absolute',
          transform: [{ scale: flame3Scale }],
          opacity: 0.3,
        }}
      >
        <View style={{ width: 100, height: 130, backgroundColor: '#FF6B35', borderRadius: 50, opacity: 0.6 }} />
      </Animated.View>
      
      <Animated.View
        style={{
          position: 'absolute',
          transform: [{ scale: flame2Scale }],
          opacity: 0.5,
        }}
      >
        <View style={{ width: 80, height: 110, backgroundColor: '#FF8C42', borderRadius: 40, opacity: 0.7 }} />
      </Animated.View>

      {/* Main flame */}
      <Animated.View
        style={{
          position: 'absolute',
          transform: [{ scale: flameScale }],
          opacity: flameOpacity,
        }}
      >
        <Image source={gifs.FLAME} style={{ height: 150, width: 120 }} />
      </Animated.View>

      {/* Glowing base */}
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          width: 60,
          height: 20,
          backgroundColor: '#FFD700',
          borderRadius: 30,
          opacity: 0.8,
          shadowColor: '#FFD700',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 20,
        }}
      />
    </View>
  )
}

const index = () => {
  const read = new Set([
    '2025-09-01',
    '2025-09-02',
    '2025-09-03',
    '2025-09-05',
    '2025-09-09',
    '2025-09-11',
    '2025-09-17',
    '2025-09-23'
  ])

  return (
    <ScrollView className='flex-1 h-full w-full bg-background' contentContainerStyle={{paddingBottom: 50}}>
      {/* Header with gradient background */}
      <View style={{ 
        width: '100%', 
        paddingTop: 40, 
        paddingBottom: 20, 
        background: 'linear-gradient(135deg, #F07900 0%, #FF6B35 100%)',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
      }}>
        <View className='w-full ml-5 gap-2 flex flex-row items-center'>
          <ArrowLeft size={32} color="#FFFFFF" onPress={() => router.back()} />
          <Text className='text-white text-2xl font-bold'>Streak Society</Text>
        </View>
      </View>

      <View className='flex-1 items-center px-4'>
        {/* Enhanced Streak Card */}
        <View style={{
          width: '100%',
          height: 380,
          backgroundColor: '#1F2937',
          borderRadius: 24,
          marginTop: 20,
          shadowColor: '#F07900',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        }}>
          {/* Main Content */}
          <View className='w-full flex flex-row h-[60%]'>
            <View className='w-[50%] items-center justify-center'>
              <View style={{
                backgroundColor: '#374151',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                marginBottom: 10,
              }}>
                <Text className='text-orange-400 text-sm font-semibold text-center'>CURRENT STREAK</Text>
              </View>
              <Text className='text-white text-5xl font-bold'>105</Text>
              <Text className='text-orange-300 text-xl font-semibold mt-2'>Days Strong!</Text>
            </View>
            
            <View className='w-[50%] items-center justify-center'>
              <AnimatedFire />
            </View>
          </View>

          {/* Motivation Card */}
          <View style={{
            height: '30%',
            width: '90%',
            marginTop: 12,
            alignSelf: 'center',
            backgroundColor: '#374151',
            borderRadius: 16,
            padding: 16,
            borderWidth: 2,
            borderColor: '#F59E0B',
          }}>
            <View className='flex flex-row items-center mb-2 bg-background'>
            </View>
            <Text className='text-white font-medium text-sm leading-5'>
              Keep the fire burning! Read daily to maintain your streak. Missing a day resets your progress to zero.
            </Text>
          </View>
        </View>

        {/* Calendar Section */}
        <View className='w-full mt-8 bg-background'>
            <Text className='text-2xl font-semibold mb-4  ml-5 text-white'>Streak Calendar</Text>
            <View className='w-[100%]'>
               <ReadCalendar 
                readDates={read} // Example read dates
                startDate="2025-01-01" // Example start date
                endDate="2025-12-31" // Example end date
            /> 
            </View>
            
        </View>
      </View>
    </ScrollView>
  )
}

export default index