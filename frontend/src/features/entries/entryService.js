import axios from 'axios'
import {API_BASE_URL} from '@env'
//const API_URL = API_BASE_URL+'/api/entries/'
const API_URL = 'https://asset-management-app-d48j.onrender.com/api/entries/'
// Create new entry
const createEntry = async (entryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, entryData, config)

  return response.data
}

// Get user entrys
const getEntries = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user entry
const deleteEntry = async (entryId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + entryId, config)
  return response.data
}

const entryService = {
  createEntry,
  getEntries,
  deleteEntry,
}

export default entryService