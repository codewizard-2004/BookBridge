import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

// Custom views (define each separately or inline)
const FirstSlide = () => (
  <View className="w-[95%] h-[200px] bg-primary rounded-3xl" />
);

const SecondSlide = () => (
  <View className="w-[95%] h-[200px] bg-secondary rounded-3xl justify-center items-center">
    <View className="flex justify-between w-[90%] flex-row">
      <Text className="text-xl font-semibold text-primary">Weekly Goal</Text>
      <Text className='text-textSecondary'>3 days left</Text>
    </View>
    <View className='w-[100px] h-[100px] rounded-full bg-primary flex flex-col justify-center items-center'>
        <Text className='text-3xl text-white font-semibold'>110</Text>
        <Text className='text-white'>/ 150</Text>
    </View>
    <Text className='text-textSecondary'>pages read</Text>
  </View>
);

const ThirdSlide = () => (
  <View className="w-[95%] h-[200px] bg-accent rounded-3xl" />
);

const { width } = Dimensions.get('window');

const slides = [0, 1, 2];


const ParallaxCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const colorMap: { [key: number]: string } = {
    0: "#F07900",
    1: "#F07900",
    2: "#FF9933"
  }

  const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    position:"absolute",
    
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    
  },
  activeDot: {
    backgroundColor: colorMap[currentIndex],
    width: 12,
    
  },
  inactiveDot: {
    backgroundColor: '#444444', // Dark gray for inactive dots
  },
});


  const renderPagination = () => (
    <View style={styles.pagination}>
      {slides.map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === currentIndex ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        loop={false}
        width={width}
        height={250}
        autoPlay={false}
        data={slides}
        scrollAnimationDuration={800}
        onSnapToItem={setCurrentIndex}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 60,
          parallaxAdjacentItemScale: 0.8,
        }}
        renderItem={({ index }) => {
          if (index === 0) return <FirstSlide />;
          if (index === 1) return <SecondSlide />;
          return <ThirdSlide />;
        }}
      />

      {renderPagination()}
    </View>
  );
};


export default ParallaxCarousel;
