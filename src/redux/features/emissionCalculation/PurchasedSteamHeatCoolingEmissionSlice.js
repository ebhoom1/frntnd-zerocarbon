// redux/features/emissionCalculation/PurchasedSteamHeatCoolingEmissionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

// ✅ Async Thunk to fetch emission data
export const fetchPurchasedSteamHeatCoolingEmission = createAsyncThunk(
  "purchasedSteamHeatCoolingEmission/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/purchased-steam-heat-cooling/${userId}`);
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch steam/heat/cooling emissions"
      );
    }
  }
);

const PurchasedSteamHeatCoolingEmissionSlice = createSlice({
  name: "purchasedSteamHeatCoolingEmission",
  initialState: {
    emissionData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchasedSteamHeatCoolingEmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchasedSteamHeatCoolingEmission.fulfilled, (state, action) => {
        state.loading = false;
        state.emissionData = action.payload;
      })
      .addCase(fetchPurchasedSteamHeatCoolingEmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default PurchasedSteamHeatCoolingEmissionSlice.reducer;
