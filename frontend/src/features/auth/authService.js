import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
// import {API_BASE_URL} from '@env'
const API_URL = 'https://cautious-capybara-69v6pgxx7p4rf5qgj-3000.app.github.dev/api/users/'

// Register user
const register = async (userData) => {
  
  console.log('=== REGISTER DEBUG ===')
  console.log('API_URL:', API_URL)
  console.log('userData:', userData)
  
  try {
    console.log('Making axios POST request...')
    const response = await axios.post(API_URL, userData)
    console.log('register response status:', response.status)
    console.log('register response headers:', response.headers)
    console.log('register response data:', response.data)
    
    if (response.data) {
      await AsyncStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  }
    catch(error){
      console.log('=== REGISTER ERROR ===')
      console.log('error.response?.status:', error.response?.status)
      console.log('error.response?.statusText:', error.response?.statusText)
      console.log('error.response?.headers:', error.response?.headers)
      console.log('error.response?.data:', error.response?.data)
      console.log('error.message:', error.message)
      console.log('error.config?.headers:', error.config?.headers)
      console.log('error.config?.url:', error.config?.url)
      console.log('error.config?.method:', error.config?.method)
      console.log('error.config?.data:', error.config?.data)
      throw error
    }
}

// Login user
const login = async (userData) => {

  const response = await axios.post(API_URL + 'login', userData)
  console.log('login response', response)

  if (response.data) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = async () => {
    await AsyncStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService