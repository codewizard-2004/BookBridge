import PageCountModal from '@/components/PageCountModal';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/utils/supabaseClient';
import { Stack, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PdfViewerScreen() {
  const { pdfUrl, title, bookId } = useLocalSearchParams<{ pdfUrl: string; title?: string, bookId?: string }>();
  const navigation = useNavigation();
  const router = useRouter();
  const { userData } = useUser() ?? {};
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e: any) => {
      // If we are already submitting, let the navigation happen
      if (isSubmitting) {
        return;
      }
      // Prevent default behavior of leaving the screen
      e.preventDefault();
      // Open the modal
      setModalVisible(true);
    });

    return unsubscribe;
  }, [navigation, isSubmitting]);

  if (!pdfUrl) {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Error' }} />
            <Text style={styles.errorText}>No PDF URL was provided.</Text>
        </View>
    );
  }

  const handlePageCountSubmit = async (pages: number) => {
    if (!userData?.id || !bookId) {
      Alert.alert("Error", "Could not update page count. User or book not found.");
      setModalVisible(false);
      navigation.dispatch(e.data.action);
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.rpc('update_reading_progress', {
        p_user_id: userData.id,
        p_book_id: bookId,
        p_pages_read: pages
      });

      if (error) {
        throw error;
      }

      Alert.alert("Success", "Your reading progress has been updated.");
    } catch (error: any) {
      console.error("Error updating reading progress:", error);
      Alert.alert("Error", "Failed to update your reading progress: " + error.message);
    } finally {
      setModalVisible(false);
      // After submission, go back to the previous screen
      router.back();
    }
  };

  // For Google Docs viewer, which helps render PDFs consistently across platforms
  const pdfDisplayUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: title || 'Book Preview', headerTintColor: '#F07900', headerStyle: { backgroundColor: 'black' } }} />
      <PageCountModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          // If the user closes the modal, just go back
          router.back();
        }}
        onSubmit={handlePageCountSubmit}
      />
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