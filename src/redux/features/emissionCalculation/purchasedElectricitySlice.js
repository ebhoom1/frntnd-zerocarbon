// redux/features/emissionCalculation/purchasedElectricitySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

// ✅ Async Thunk - Fetch Purchased Electricity Emission Data
export const fetchPurchasedElectricity = createAsyncThunk(
  "purchasedElectricity/fetchPurchasedElectricity",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/purchased-electricity/${userId}`);
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch purchased electricity emissions"
      );
    }
  }
);

// ✅ Slice
const purchasedElectricitySlice = createSlice({
  name: "purchasedElectricity",
  initialState: {
    emissionData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchasedElectricity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchasedElectricity.fulfilled, (state, action) => {
        state.loading = false;
        state.emissionData = action.payload;
      })
      .addCase(fetchPurchasedElectricity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default purchasedElectricitySlice.reducer;
