import { BarCodeScannedCallback } from 'expo-barcode-scanner';
import { BarcodeType, Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Button, Linking, StyleSheet, Text, View } from 'react-native';

// Type for scanned data state
interface ScannedData {
  type: BarcodeType;
  data: string;
}

const App: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Explicitly type the parameter as BarCodeScannerResult
  const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
    setScanned(true);
    setScannedData({ type, data });
    console.log(`Barcode with type ${type} and data ${data} has been scanned!`);

    if (data.startsWith('http')) {
      Linking.openURL(data).catch((err) => console.error("Couldn't load page", err));
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting for camera permission...</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera.</Text>
        <Button
          title={'Allow Camera'}
          onPress={async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeScannerSettings={{
          barCodeTypes: ['qr', 'pdf417', 'ean13', 'code128'],
        }}
      />

      <View style={styles.overlay}>
        <View style={styles.scanBox} />
      </View>

      {scanned && (
        <View style={styles.scannedDataContainer}>
          <Text style={styles.scannedDataText}>Type: {scannedData?.type}</Text>
          <Text style={styles.scannedDataText} selectable>
            Data: {scannedData?.data}
          </Text>
          <View style={styles.buttonContainer}>
            <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} color="#fff" />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 12,
    opacity: 0.7,
  },
  scannedDataContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  scannedDataText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default App;
