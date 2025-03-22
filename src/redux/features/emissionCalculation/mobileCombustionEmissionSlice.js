import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

// 🔥 Fetch Mobile Combustion Emission Data for a user
export const fetchMobileCombustionEmissions = createAsyncThunk(
  "mobileCombustionEmissions/fetchMobileCombustionEmissions",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/getMobileCombustionEmissions/${userId}`);
      return response.data.emissions; // ✅ returning only emissions array
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch mobile combustion emissions");
    }
  }
);

const mobileCombustionEmissionSlice = createSlice({
  name: "mobileCombustionEmissions",
  initialState: {
    emissions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMobileCombustionEmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMobileCombustionEmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.emissions = action.payload;
      })
      .addCase(fetchMobileCombustionEmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mobileCombustionEmissionSlice.reducer;
