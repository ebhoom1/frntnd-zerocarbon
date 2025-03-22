// redux/features/emissionCalculation/totalEmissionScope3Slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

// 🔥 Async thunk to fetch total Scope 3 emissions
export const fetchTotalScope3Emissions = createAsyncThunk(
  "emissions/fetchTotalScope3Emissions",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/totalemission-scope3/${userId}`);
      return response.data.totalScope3Emissions;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch total Scope 3 emissions");
    }
  }
);

const totalEmissionScope3Slice = createSlice({
  name: "totalEmissionScope3",
  initialState: {
    emissions: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearScope3Emissions: (state) => {
      state.emissions = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalScope3Emissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalScope3Emissions.fulfilled, (state, action) => {
        state.loading = false;
        state.emissions = action.payload;
      })
      .addCase(fetchTotalScope3Emissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearScope3Emissions } = totalEmissionScope3Slice.actions;
export default totalEmissionScope3Slice.reducer;
