import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';

interface CustomModalProps {
  text: string;
  title: string;
  visible?: boolean;
  onPress?: () => void;
}

export default function CustomModal({text , title , visible  ,  onPress}:CustomModalProps) {

  const styles = StyleSheet.create({
  container: { flex: 0, justifyContent: 'center', alignItems: 'center' },
  openButton: { backgroundColor: '#F07900', padding: 12, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  alertBox: { width: 300, borderRadius: 16, padding: 40, gap:5, alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#F07900' },
  message: { fontSize: 14,textAlign: 'center', marginBottom: 20 },
  actions: { flexDirection: 'row', gap: 10 },
  cancelButton: { backgroundColor: '#ccc', padding: 1, borderRadius: 8 },
  confirmButton: { backgroundColor: '#F07900', padding: 10, borderRadius: 8 },
});


  return (
    <View style={styles.container}>
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.alertBox} className='bg-secondary'>
            <View style={styles.actions}  className='absolute right-2 top-2'>
              <TouchableOpacity onPress={onPress} style={styles.cancelButton}>
                <X size={24} color="black" />
              </TouchableOpacity>
              
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message} className='text-gray-400'>{text}</Text>
            
          </View>
        </View>
      </Modal>
    </View>
  );
}
