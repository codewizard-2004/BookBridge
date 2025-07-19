// GradientBackground.tsx
import React from 'react';
import { Svg, Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

const GradientBackground = () => {
  return (
    <Svg height="100%" width="100%"  className='rounded-xl'>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#1c1c1c" stopOpacity="1" />
          <Stop offset="100%" stopColor="#3a3a3a" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" rx={5}  ry={5} />
    </Svg>
  );
};

export default GradientBackground;
