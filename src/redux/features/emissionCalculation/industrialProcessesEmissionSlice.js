// redux/features/emissionCalculation/industrialProcessesEmissionSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

export const fetchIndustrialProcessesEmissions = createAsyncThunk(
  "industrialProcessesEmissions/fetchIndustrialProcessesEmissions",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/getindustrialprocessesemission/${userId}`);
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch industrial processes emissions");
    }
  }
);

const industrialProcessesEmissionSlice = createSlice({
  name: "industrialProcessesEmissions",
  initialState: {
    emissionData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndustrialProcessesEmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndustrialProcessesEmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.emissionData = action.payload;
      })
      .addCase(fetchIndustrialProcessesEmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default industrialProcessesEmissionSlice.reducer;
