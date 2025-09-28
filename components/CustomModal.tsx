import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface CustomModalProps {
  text: string;
  title: string;
  visible?: boolean;
  buttonText?: string;
  onPressOK?: () => void;
  onPress?: () => void;
  showCloseButton?: boolean;
}

export default function CustomModal({
  text,
  title,
  visible = false,
  onPress,
  buttonText,
  onPressOK,
  showCloseButton = true
}: CustomModalProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleButtonPress = () => {
    if (onPressOK) {
      onPressOK();
    } else if (onPress) {
      onPress();
    }
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    alertBox: {
      width: Math.min(width - 40, 320),
      backgroundColor: '#1F1F1F',
      borderRadius: 20,
      padding: 24,
      alignItems: 'center',
      shadowColor: '#F07900',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 10,
      borderWidth: 1,
      borderColor: '#2A2A2A',
    },
    closeButton: {
      position: 'absolute',
      right: 12,
      top: 12,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#2A2A2A',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#F07900',
      marginBottom: 12,
      marginTop: showCloseButton ? 16 : 0,
      textAlign: 'center',
    },
    message: {
      fontSize: 15,
      lineHeight: 22,
      color: '#B0B0B0',
      textAlign: 'center',
      marginBottom: 24,
      paddingHorizontal: 8,
    },
    button: {
      backgroundColor: '#F07900',
      paddingHorizontal: 32,
      paddingVertical: 12,
      borderRadius: 12,
      minWidth: 100,
      alignItems: 'center',
      shadowColor: '#F07900',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    closeButtonPressed: {
      backgroundColor: '#3A3A3A',
    },
    buttonPressed: {
      backgroundColor: '#E06900',
    },
  });

  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
      onRequestClose={onPress}
    >
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <TouchableOpacity
          style={{ flex: 1, width: '100%' }}
          activeOpacity={1}
          onPress={onPress}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity activeOpacity={1}>
              <Animated.View
                style={[
                  styles.alertBox,
                  {
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                {showCloseButton && (
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onPress}
                    activeOpacity={0.7}
                  >
                    <X size={18} color="#B0B0B0" />
                  </TouchableOpacity>
                )}

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{text}</Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleButtonPress}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>
                    {buttonText || 'OK'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}