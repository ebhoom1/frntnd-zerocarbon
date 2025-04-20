import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch energy data
export const fetchEnergyConsumption = createAsyncThunk(
  'energy/fetchEnergyConsumption',
  async (userName, { rejectWithValue }) => {
    try {
        console.log("userName:",userName);
      const today = new Date();
      const dateString = today.toLocaleDateString('en-GB').split('/').join('-'); // e.g., 08-04-2025
      const response = await axios.get(`https://api.ocems.ebhoom.com/api/energyAndFlowData/${userName}/08-04-2025/08-04-2025`);
      const allData = response.data?.data || [];
    //   const stpEnergy = allData.find(item => item.stackName === 'STP-energy');
    //   return stpEnergy?.lastEnergy || 0;

      // 1. Filter STP-energy entries with lastEnergy
      const energyEntries = allData.filter(
        (entry) => entry.stackName === 'STP-energy' && entry.lastEnergy
      );

      // 2. Find the one with latest timestamp
      const latestEntry = energyEntries.reduce((latest, current) => {
        return new Date(current.timestamp) > new Date(latest.timestamp)
          ? current
          : latest;
      }, energyEntries[0]);
      return latestEntry?.lastEnergy || null;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const energySlice = createSlice({
  name: 'energy',
  initialState: {
    lastEnergy: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnergyConsumption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnergyConsumption.fulfilled, (state, action) => {
        state.loading = false;
        state.lastEnergy = action.payload;
      })
      .addCase(fetchEnergyConsumption.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default energySlice.reducer;
