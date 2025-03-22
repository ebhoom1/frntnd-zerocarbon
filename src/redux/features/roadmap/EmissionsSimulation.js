import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

// ✅ Async thunk to fetch simulations by userId
export const fetchUserSimulations = createAsyncThunk(
  "simulation/fetchUserSimulations",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/emissions-reduction/get/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching simulations");
    }
  }
);

// ✅ Slice definition
const simulationSlice = createSlice({
  name: "simulation",
  initialState: {
    simulations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSimulations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSimulations.fulfilled, (state, action) => {
        state.loading = false;
        state.simulations = action.payload;
      })
      .addCase(fetchUserSimulations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default simulationSlice.reducer;
