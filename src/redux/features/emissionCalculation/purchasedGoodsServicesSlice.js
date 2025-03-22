// redux/features/emissionCalculation/purchasedGoodsServicesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

// ✅ Async Thunk - Fetch Purchased Goods & Services Emission Data
export const fetchPurchasedGoodsServices = createAsyncThunk(
  "purchasedGoodsServices/fetchPurchasedGoodsServices",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/getPurchasedGoodsServices/${userId}`);
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch purchased goods & services emissions"
      );
    }
  }
);

// ✅ Slice
const purchasedGoodsServicesSlice = createSlice({
  name: "purchasedGoodsServices",
  initialState: {
    emissionData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchasedGoodsServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchasedGoodsServices.fulfilled, (state, action) => {
        state.loading = false;
        state.emissionData = action.payload;
      })
      .addCase(fetchPurchasedGoodsServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default purchasedGoodsServicesSlice.reducer;
