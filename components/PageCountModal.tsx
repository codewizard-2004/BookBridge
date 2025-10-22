import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PageCountModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (pages: number) => void;
}

const PageCountModal: React.FC<PageCountModalProps> = ({ visible, onClose, onSubmit }) => {
  const [pagesRead, setPagesRead] = useState('');

  const handleSubmit = () => {
    const pages = parseInt(pagesRead, 10);
    if (!isNaN(pages) && pages > 0) {
      onSubmit(pages);
      setPagesRead('');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>How many pages have you read?</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPagesRead}
            value={pagesRead}
            keyboardType="numeric"
            placeholder="Enter page count"
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.textStyle}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#F07900',
    marginTop: 10,
    width: 150,
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#555',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: 200,
    textAlign: 'center',
    color: 'white',
    borderRadius: 10,
  },
});

export default PageCountModal;
