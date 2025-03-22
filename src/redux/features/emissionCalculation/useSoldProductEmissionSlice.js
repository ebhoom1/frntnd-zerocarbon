import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

export const fetchUseSoldProductEmissions = createAsyncThunk(
  "useSoldProductEmissions/fetchUseSoldProductEmissions",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/getuseofsoldproducts/${userId}`);
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch use of sold product emissions");
    }
  }
);

const useSoldProductEmissionSlice = createSlice({
  name: "useSoldProductEmissions",
  initialState: {
    emissionData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUseSoldProductEmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUseSoldProductEmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.emissionData = action.payload;
      })
      .addCase(fetchUseSoldProductEmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default useSoldProductEmissionSlice.reducer;
