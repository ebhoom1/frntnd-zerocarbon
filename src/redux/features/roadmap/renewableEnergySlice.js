import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

// ✅ Async thunk to fetch renewable energy calculations by userId
export const fetchUserRenewableCalculations = createAsyncThunk(
  "renewable/fetchUserRenewableCalculations",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/renewable-energy/get/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error fetching renewable calculations");
    }
  }
);

// ✅ Slice definition
const renewableEnergySlice = createSlice({
  name: "renewable",
  initialState: {
    renewableCalculations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRenewableCalculations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRenewableCalculations.fulfilled, (state, action) => {
        state.loading = false;
        state.renewableCalculations = action.payload;
      })
      .addCase(fetchUserRenewableCalculations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default renewableEnergySlice.reducer;
