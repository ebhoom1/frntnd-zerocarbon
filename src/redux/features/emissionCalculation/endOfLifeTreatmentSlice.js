// redux/features/emissionCalculation/endOfLifeTreatmentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

// ✅ Async Thunk - Fetch End of Life Treatment Emission Data
export const fetchEndOfLifeTreatment = createAsyncThunk(
  "endOfLifeTreatment/fetchEndOfLifeTreatment",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/getendoflifetreatment/${userId}`);
      return response.data?.data || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch end of life treatment emissions"
      );
    }
  }
);

// ✅ Slice
const endOfLifeTreatmentSlice = createSlice({
  name: "endOfLifeTreatment",
  initialState: {
    emissionData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEndOfLifeTreatment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEndOfLifeTreatment.fulfilled, (state, action) => {
        state.loading = false;
        state.emissionData = action.payload;
      })
      .addCase(fetchEndOfLifeTreatment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default endOfLifeTreatmentSlice.reducer;
