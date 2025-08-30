import CustomModal from '@/components/CustomModal';
import { SignUpFormData } from '@/types/auth';
import { supabase } from '@/utils/supabaseClient';
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
  { id: 1, name: "Fiction" },
  { id: 2, name: "Non-Fiction" },
  { id: 3, name: "Mystery" },
  { id: 4, name: "Thriller" },
  { id: 5, name: "Fantasy" },
  { id: 6, name: "Science Fiction" },
  { id: 7, name: "Romance" },
  { id: 8, name: "Horror" },
  { id: 9, name: "Biography" },
  { id: 10, name: "History" },
  { id: 11, name: "Poetry" },
  { id: 12, name: "Self-Help" },
  { id: 13, name: "Graphic Novel" },
  { id: 14, name: "Children's" },
  { id: 15, name: "Young Adult" },
  { id: 16, name: "Classic" },
  { id: 17, name: "Adventure" },
  { id: 18, name: "Philosophy" },
  { id: 19, name: "Religion" },
  { id: 20, name: "Science" }
];


const GenreSelection = () => {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp } = useAuth();
  const { formData } = useLocalSearchParams();
  const parsedFormData = formData ? JSON.parse(formData as string) as SignUpFormData : null;
  
  const router = useRouter();

  const toggleGenre = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genreId));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handleGenre = async () => {
    if (selectedGenres.length < 3) {
      setErrorMessage("Please select at least 3 genres");
      setModalOpen(true);
      return;
    }
    setLoading(true);

    try {
      const result = await signUp(parsedFormData?.email ?? "", parsedFormData?.password ?? "");
      if (result.success) {
        console.log("User ID: ",result.data.user?.id);
        console.log("Parsed Form Data: ", parsedFormData);
        const {data: userData , error: userError} = await supabase.from("USERS").insert([
          {
          id: result.data.user.id,
          name: parsedFormData?.name || "New User",
          profile_url : parsedFormData?.avatar || "https://avatar.iran.liara.run/public/1"
          }
        ]).select()
        console.log("Insert Response:", userData, userError);
        if (userError){
          throw userError;
        }
        let inserts = [];
        for (let i =0 ; i<selectedGenres.length; i++){
          inserts.push({userId: result.data.user?.id, genreId: selectedGenres[i]});
        }
        console.log("Inserts" , inserts);
        const {data , error} = await supabase.from("USER_GENRE").insert(inserts);
        if (error){
          throw error;
        }else{
          console.log(data);
        }
        router.push("/(tabs)");
      }
    } catch (error: any) {
      setErrorMessage(error?.message || String(error) || "Unknown Error occurred!");
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const deselectAll = () => {
    setSelectedGenres([]);
  };

  return (
    <View className="flex-1 bg-background pt-10 pl-5">
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
          title="Error"
          visible={modalOpen}
          onPress={() => setModalOpen(false)}
        />

        <Text style={styles.title}>What do you love to read?</Text>
        <Text style={styles.subtitle}>
          Select your favorite genres to get personalized recommendations.  
          Select at least 3 genres.
        </Text>

        <View style={styles.genresContainer}>
          {genres.map((genre) => (
            <TouchableOpacity
              key={genre.id}
              style={[
                styles.genreButton,
                selectedGenres.includes(genre.id) && styles.genreSelected,
              ]}
              onPress={() => toggleGenre(genre.id)}
            >
              <Text
                style={[
                  styles.genreText,
                  selectedGenres.includes(genre.id) && styles.genreTextSelected,
                ]}
              >
                {genre.name}
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
          <TouchableOpacity
            style={styles.deselectButton}
            onPress={deselectAll}
            disabled={loading}
          >
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
    backgroundColor: '#fffaf4',
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
