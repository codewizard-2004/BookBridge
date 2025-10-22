import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const openPdf = async (
  pdfUrl: string,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  try {
    // Use a unique name to avoid caching issues if the PDF content changes
    const fileName = `${new Date().getTime()}.pdf`;
    const filePath = FileSystem.documentDirectory + fileName;

    console.log(`Downloading PDF from: ${pdfUrl}`);
    const { uri } = await FileSystem.downloadAsync(pdfUrl, filePath);
    console.log("Downloaded to:", uri);

    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert("Sharing not available", "PDF sharing is not available on your device.");
      setLoading(false);
      return;
    }

    await Sharing.shareAsync(uri, { dialogTitle: "Open with..." });
  } catch (error) {
    console.error("Error opening PDF:", error);
    Alert.alert("Failed to open PDF", "An error occurred while downloading or opening the file.");
  } finally {
    setLoading(false);
  }
};