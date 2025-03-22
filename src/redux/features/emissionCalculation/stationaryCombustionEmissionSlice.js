import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

// 🔥 Fetch Stationary Combustion Emission Data for a user
export const fetchStationaryCombustionEmissions = createAsyncThunk(
  "stationaryCombustionEmissions/fetchStationaryCombustionEmissions",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/getstationarycombustionemission/${userId}`);
      return response.data?.data || {}; // ✅ returns { fuelType, fuelUnit, annualFuelConsumption, emission }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch stationary combustion emissions");
    }
  }
);

const stationaryCombustionEmissionSlice = createSlice({
  name: "stationaryCombustionEmissions",
  initialState: {
    emissionData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStationaryCombustionEmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStationaryCombustionEmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.emissionData = action.payload; // <-- array of emissions
      })
      .addCase(fetchStationaryCombustionEmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default stationaryCombustionEmissionSlice.reducer;
