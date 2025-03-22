// redux/features/emissionCalculation/totalEmissionScope2Slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

// Thunk
export const fetchTotalScope2Emission = createAsyncThunk(
  "totalScope2Emission/fetch",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/totalemission-scope2/${userId}`);
      return response.data?.data || {};
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch total Scope 2 emission");
    }
  }
);

const totalEmissionScope2Slice = createSlice({
  name: "totalScope2Emission",
  initialState: {
    totalEmissionData: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalScope2Emission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalScope2Emission.fulfilled, (state, action) => {
        state.loading = false;
        state.totalEmissionData = action.payload;
      })
      .addCase(fetchTotalScope2Emission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default totalEmissionScope2Slice.reducer;
