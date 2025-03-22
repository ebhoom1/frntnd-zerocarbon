import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

// 🔥 Async thunk to fetch total emissions
export const fetchTotalEmissions = createAsyncThunk(
  "emissions/fetchTotalEmissions",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/total-emissions/${userId}`);
      console.log("response:",response.data);
      return response.data.totalEmissions;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch total emissions");
    }
  }
);

const totalEmissionSlice = createSlice({
  name: "totalEmission",
  initialState: {
    emissions: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearEmissions: (state) => {
      state.emissions = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalEmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalEmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.emissions = action.payload;
      })
      .addCase(fetchTotalEmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEmissions } = totalEmissionSlice.actions;
export default totalEmissionSlice.reducer;
