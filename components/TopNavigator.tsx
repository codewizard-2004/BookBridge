import { images } from '@/constants/images';
import { useUser } from '@/contexts/UserContext';
import { useReadingStreak } from '@/hooks/useReadingStreak';
import { useRouter } from 'expo-router';
import { Bell, BellDot, ChevronDown, ChevronUp, CircleUserRound, Search } from 'lucide-react-native';
import React, { useState, useRef } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  Pressable,
  findNodeHandle
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const TopNavigator = () => {
  const router = useRouter();
  const userContext = useUser();
  const userData = userContext?.userData;

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const avatarRef = useRef<View>(null);
  const { streak, loading } = useReadingStreak();

  const handleAvatarPress = () => {
    // Measure avatar's position
    avatarRef.current?.measureInWindow((x, y, w, h) => {
      setMenuPosition({ x, y: y + h }); // place menu just below avatar
      setMenuVisible(true);
    });
  };

  return (
    <View className="flex-row items-center justify-between px-4 pt-8 bg-background shadow">
      {/* Left side */}
      <View className="flex-row items-center gap-2">
        <Image source={images.LOGO} style={{ width: 30, height: 70 }} />
        <Text className="text-lg font-semibold text-primary">
          BOOKBRIDGE
        </Text>
      </View>

      {/* Right side */}
      <View className="flex flex-row gap-3 items-center">
        {/* Streak button */}
        <TouchableOpacity
          className="bg-accent w-12 h-9 justify-center items-center rounded-full"
          onPress={() => router.push('/streak')}
        >
          {streak > 0? (
            <Text className="text-white font-semibold">🔥{streak}</Text>
          ):(
            <Text className="text-white font-semibold">❄️0</Text>
          )}
          
        </TouchableOpacity>

        {/* Search button */}
        <TouchableOpacity onPress={() => router.push('/search')}>
          <Search size={24} color="#F07900" />
        </TouchableOpacity>

        {/* Avatar button */}
        <TouchableOpacity ref={avatarRef} onPress={handleAvatarPress}>
          {userData?.profile_url ? (
            <View className='bg-gray-800 rounded-full w-[50px] flex flex-row items-center'>
              <Image
                source={{ uri: userData.profile_url }}
                style={{ width: 32, height: 32, borderRadius: 16 }}
              />{menuVisible?
                <ChevronUp size={17} color={"white"}/>:
                <ChevronDown size={17} color={"white"}/>}
              
            </View>
          ) : (
            <CircleUserRound size={24} color="#F07900" />
          )}
        </TouchableOpacity>
      </View>

      {/* Modal Dropdown Menu */}
      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        {/* Background overlay to close menu on outside tap */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setMenuVisible(false)}
        >
          <View />
        </Pressable>

        {/* Dropdown menu */}
        <View
          style={[
            styles.menu,
            {
              top: menuPosition.y + 5, // 5px gap below avatar
              left: Math.min(menuPosition.x, screenWidth - 160), // prevent overflow
            },
          ]}
        >
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              router.push('/friends');
            }}
          >
            <Text style={styles.menuText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              router.push({
                pathname: '/(tabs)/profile',
                params: { userId: userData?.id },
              });
            }}
          >
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              router.push('/notification');
            }}
          >
            <Text style={styles.menuText}>Notifications</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    backgroundColor: '#151515',
    borderRadius: 8,
    paddingVertical: 6,
    width: 150,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    color: 'white',
  },
});

export default TopNavigator;
