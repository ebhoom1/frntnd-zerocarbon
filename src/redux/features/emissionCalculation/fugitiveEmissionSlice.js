// redux/features/emissionCalculation/fugitiveEmissionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

export const fetchFugitiveEmissions = createAsyncThunk(
  "fugitiveEmissions/fetchFugitiveEmissions",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/getfugitiveemission/${userId}`);
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch fugitive emissions");
    }
  }
);

const fugitiveEmissionSlice = createSlice({
  name: "fugitiveEmissions",
  initialState: {
    emissionData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFugitiveEmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFugitiveEmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.emissionData = action.payload;
      })
      .addCase(fetchFugitiveEmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fugitiveEmissionSlice.reducer;
