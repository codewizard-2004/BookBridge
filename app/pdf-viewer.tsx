import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PdfViewerScreen() {
  const { pdfUrl, title } = useLocalSearchParams<{ pdfUrl: string; title?: string }>();

  if (!pdfUrl) {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Error' }} />
            <Text style={styles.errorText}>No PDF URL was provided.</Text>
        </View>
    );
  }

  // For Google Docs viewer, which helps render PDFs consistently across platforms
  const pdfDisplayUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: title || 'Book Preview', headerTintColor: '#F07900', headerStyle: { backgroundColor: 'black' } }} />
      <WebView
        source={{ uri: pdfDisplayUrl }}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            color="#F07900"
            size="large"
            style={styles.loading}
          />
        )}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  webview: {
    flex: 1,
    backgroundColor: 'black',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  }
});