// (auth)/login.tsx
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { useAuth } from '../../contexts/AuthContext'
import { LoginFormData } from '../../types/auth'

export default function LoginScreen() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState<boolean>(false)
  const { signIn } = useAuth()

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLogin = async (): Promise<void> => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    setLoading(true)
    const result = await signIn(formData.email, formData.password)
    setLoading(false)

    if (result.success) {
      console.log('Login successful')
      // Navigation will be handled by auth state change
    } else {
      Alert.alert('Login Failed', result.error || 'Unknown error')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue reading</Text>
      
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
        placeholder="Enter password"
        placeholderTextColor="#666"
        secureTextEntry
        editable={!loading}
      />
      
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin} 
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        disabled={loading}
        onPress={() => router.push('./signup')}
      >
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#000',
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
