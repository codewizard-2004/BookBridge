import { useBooks } from "@/hooks/useBooks";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const boxSize = width * 0.7;

export default function BarcodeScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState<string>("");

  const { books, fetching } = useBooks({ type: "isbn", query: data });

  // Navigate when books are fetched after scanning
  useEffect(() => {
    if (scanned && books && books.length > 0) {
      const id = books[0].id;
      router.push({
        pathname: "/movies/[id]",
        params: { id, pagesRead: 0 },
      });
    }
  }, [books, scanned]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setData(data);
  };

  // Conditional rendering (no early returns!)
  let content: React.JSX.Element;

  if (!permission) {
    content = <View />;
  } else if (!permission.granted) {
    content = (
      <View style={styles.center}>
        <Text style={styles.text}>
          Camera permission is required to scan barcodes.
        </Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  } else {
    content = (
      <>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["ean13", "ean8"] }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />

        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity className="mt-5" onPress={() => router.back()}>
            <ArrowLeft size={32} color="#F07900" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle} className="text-primary">
            ISBN Scanner
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Scan area overlay */}
        <View style={styles.overlay}>
          <View style={styles.scanBox} />
        </View>

        {/* Optional result debug */}
        {fetching && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Searching book...</Text>
          </View>
        )}
      </>
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { color: "white", fontSize: 16, textAlign: "center" },

  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  topBarTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scanBox: {
    width: boxSize,
    height: boxSize * 0.5,
    borderColor: "#00FF00",
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  resultBox: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 16,
    borderRadius: 8,
  },
  resultText: { color: "white", fontSize: 16, textAlign: "center" },
});
