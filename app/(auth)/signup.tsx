import CustomModal from '@/components/CustomModal'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { SignUpFormData } from '../../types/auth'

export default function SignUpScreen() {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [modelOpen , setModalOpen] = useState<boolean>(false);
  const [errorMessage , setErrorMessage] = useState<string>('');

  const handleInputChange = (field: keyof SignUpFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSignUp = async (): Promise<void> => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      // Alert.alert('Error', 'Please fill in all fields')
      setErrorMessage("Please fill in all the fields");
      setModalOpen(true);
      return
    }

    if (formData.password !== formData.confirmPassword) {
      // Alert.alert('Error', 'Passwords do not match')
      setErrorMessage("Passwords do not match");
      setModalOpen(true);
      return
    }

    if (formData.password.length < 6) {
      // Alert.alert('Error', 'Password must be at least 6 characters long')
      setErrorMessage("Password must be at least 6 characters long");
      setModalOpen(true);
      return
    }

    setLoading(true)
    router.push({
      pathname: "./genre",
      params: { formData: JSON.stringify(formData) }
    }
    );
    setLoading(false)

  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomModal 
        text={errorMessage} 
        title="Sign Up Failed" 
        visible={modelOpen} 
        onPress={() => setModalOpen(false)}
        />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our reading community</Text>
        
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="Enter email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
        
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          placeholder="Enter password (min 6 characters)"
          placeholderTextColor="#666"
          secureTextEntry
          editable={!loading}
        />
        
        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
          placeholder="Confirm password"
          placeholderTextColor="#666"
          secureTextEntry
          editable={!loading}
        />
        
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSignUp} 
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          disabled={loading}
          onPress={() => router.back()}
        >
          <Text style={styles.linkText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    paddingBottom:20
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#F07900',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#F07900',
    padding: 15,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#F07900',
    fontSize: 16,
  },
})
