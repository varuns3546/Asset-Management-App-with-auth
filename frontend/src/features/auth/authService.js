import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
// import {API_BASE_URL} from '@env'
const API_URL = 'https://cautious-capybara-69v6pgxx7p4rf5qgj-3000.app.github.dev/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  console.log('register response', response)
  if (response.data) {
    await AsyncStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
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