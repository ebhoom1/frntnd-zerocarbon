// src/redux/slices/companyScopeSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

export const fetchCompanyScopeEmissions = createAsyncThunk(
  "companyScope/fetchData",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/companymonthlyscope-emission");
      console.log("response:",res.data.data);
      return res.data.data;
    } catch (err) {
        console.log("error:",err.response?.data?.message)
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const companyScopeSlice = createSlice({
  name: "companyScope",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyScopeEmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyScopeEmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanyScopeEmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default companyScopeSlice.reducer;
