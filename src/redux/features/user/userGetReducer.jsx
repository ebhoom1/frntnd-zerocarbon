import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../api/axios';

// Async thunk for fetching users with userType 'user'
export const fetchUsersWithUserTypeUser = createAsyncThunk(
  'userFetch/fetchUsersWithUserTypeUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user/getuser'); // Adjust the endpoint if necessary
      console.log(response.data.data);
      return response.data.data; // Assuming response contains a `data` property with users
    } catch (error) {
      console.log("error:",error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

// User fetch slice
const userFetchSlice = createSlice({
  name: 'userFetch',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersWithUserTypeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersWithUserTypeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsersWithUserTypeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userFetchSlice.reducer;
