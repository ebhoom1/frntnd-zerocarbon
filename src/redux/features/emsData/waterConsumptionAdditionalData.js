import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../api/axios';

// 🔁 Async Thunk to fetch water consumption and carbon emission
export const fetchWaterConsumption = createAsyncThunk(
  'water/fetchWaterConsumption',
  async (userName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/additionaldata-water`, {
        params: { userName }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch data');
    }
  }
);

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    loading: false,
    totalConsumption: null,
    carbonEmission: null,
    error: null
  },
  reducers: {
    resetWaterData: (state) => {
      state.loading = false;
      state.totalConsumption = null;
      state.carbonEmission = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterConsumption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.totalConsumption = action.payload.totalConsumption;
        state.carbonEmission = action.payload.carbonEmission;
      })
      .addCase(fetchWaterConsumption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetWaterData } = waterSlice.actions;
export default waterSlice.reducer;
