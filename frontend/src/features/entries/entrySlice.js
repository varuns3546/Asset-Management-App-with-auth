import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import entryService from './entryService'
const initialState = {
  entries: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new entry
export const createEntry = createAsyncThunk(
  'entries/create',
  async (entryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await entryService.createEntry(entryData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user entries
export const getEntries = createAsyncThunk(
  'entries/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await entryService.getEntries(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user entry
export const deleteEntry = createAsyncThunk(
  'entries/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      data = await entryService.deleteEntry(id, token)
      console.log('delete entry result', data)
      return data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEntry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEntry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.entries.push(action.payload)
      })
      .addCase(createEntry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getEntries.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEntries.fulfilled, (state, action) => {
        console.log('get entries payload', action.payload.entries)
        state.isLoading = false
        state.isSuccess = true
        state.entries = action.payload.entries
      })
      .addCase(getEntries.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteEntry.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.entries = state.entries.filter(
          (entry) => entry._id !== action.payload.id
        )
        console.log('entries after filter', state.entries);

      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = entrySlice.actions
export default entrySlice.reducer