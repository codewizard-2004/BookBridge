import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const genres = [
  'Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi',
  'Fantasy', 'Biography', 'History', 'Self-Help', 'Business',
  'Health', 'Travel', 'Cooking', 'Art', 'Poetry', 'Drama',
  'Horror', 'Adventure'
];

const Test = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => { setSelectedGenres([...selectedGenres, genre]);
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else if (selectedGenres.length < 3) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const deselectAll = () => {
    setSelectedGenres([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>What do you love to read?</Text>
      <Text style={styles.subtitle}>
        Select your favorite genres to get personalized recommendations
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

      

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      {selectedGenres.length > 0 && (
        <TouchableOpacity style={styles.deselectButton} onPress={deselectAll}>
          <Text style={styles.deselectText}>Deselect All</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    marginTop: 50,
    fontSize: 20,
    color: '#000000ff',
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
    backgroundColor: '#f2f2f2',
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
