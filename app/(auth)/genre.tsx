import CustomModal from '@/components/CustomModal';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const genres = [
  'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi',
  'Fantasy', 'Biography', 'History', 'Self-Help', 'Business',
  'Health', 'Travel', 'Cooking', 'Art', 'Poetry', 'Drama',
  'Horror', 'Adventure'
];

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};


const GenreSelection = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [modelOpen , setModalOpen] = useState<boolean>(false);
  const [errorMessage , setErrorMessage] = useState<string>('');
  const [loading , setLoading] = useState<boolean>(false);
  const { signUp } = useAuth()
  const { formData } = useLocalSearchParams();
  const parsedFormData = formData ? JSON.parse(formData as string) as SignUpFormData : null;

  const toggleGenre = (genre: string) => { setSelectedGenres([...selectedGenres, genre]);
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleGenre = async() => {
    if (selectedGenres.length < 3){
      setErrorMessage("Please select at least 3 genres");
      setModalOpen(true);
      return;

    }
    setLoading(true);

    try {
      const result = await signUp(parsedFormData?.email ?? "", parsedFormData?.password ??"");
      if (result.success){
        router.back();
      }
    } catch (error: any) {
      setErrorMessage(error?.message || String(error) || "Unknown Error occurred!");
      setModalOpen(true);
    }finally {
      setLoading(false);
    }
  }

  const deselectAll = () => {
    setSelectedGenres([]);
  };
  const router = useRouter();

  return (
    <View className='flex-1 bg-background pt-10 pl-5'>
      {/* Header */}
      <View className="flex-row items-center mb-4 mt-5">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color="#F07900" size={28} />
        </TouchableOpacity>
        <Text className="text-white text-xl font-semibold ml-2">Select Genre</Text>
      </View>
    <ScrollView contentContainerStyle={styles.container}>
      
      <CustomModal
        text={errorMessage} 
        title="Invalid" 
        visible={modelOpen} 
        onPress={() => setModalOpen(false)}/>
      <Text style={styles.title}>What do you love to read?</Text>
      <Text style={styles.subtitle}>
        Select your favorite genres to get personalized recommendations.
        Select atleast 3 genres.
      </Text>

      <View style={styles.genresContainer}>
        {genres.map((genre) => (
          <TouchableOpacity
            key={genre}
            style={[
              styles.genreButton,
              selectedGenres.includes(genre) && styles.genreSelected,
            ]}
            onPress={() => toggleGenre(genre)}
          >
            <Text
              style={[
                styles.genreText,
                selectedGenres.includes(genre) && styles.genreTextSelected,
              ]}
            >
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.counter}>
        {selectedGenres.length} genres selected
      </Text>

      

      <TouchableOpacity 
          style={styles.continueButton} 
          onPress={handleGenre} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.continueText}>Continue</Text>
          )}
        </TouchableOpacity>

      {selectedGenres.length > 0 && (
        <TouchableOpacity style={styles.deselectButton} onPress={deselectAll} disabled={loading}>
          <Text style={styles.deselectText}>Deselect All</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  </View>
  );
};

export default GenreSelection;

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingBottom: 40,
    alignItems: 'center',
  },
  title: {
    marginTop: 50,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#99a1af',
    textAlign: 'center',
    marginBottom: 20,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    rowGap: 10,
  },
  genreButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
  },
  genreSelected: {
    backgroundColor: '#fffaf4ff',
    borderColor: '#f07900',
  },
  genreText: {
    color: '#333',
    fontSize: 14,
  },
  genreTextSelected: {
    color: '#f07900',
    fontWeight: 'bold',
  },
  counter: {
    marginTop: 20,
    color: '#888',
    fontSize: 14,
  },
  deselectButton: {
    marginTop: 20,
    backgroundColor: '#f07900',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    
  },
  deselectText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  continueButton: {
    backgroundColor: '#f07900',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
