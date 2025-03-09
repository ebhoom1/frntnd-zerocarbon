import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

// Fetch roadmaps for a specific user
export const fetchUserRoadmaps = createAsyncThunk(
  "userRoadmap/fetchUserRoadmaps",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/analyse-roadmap/get/${userId}`);
      return response.data.roadmaps;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch roadmaps");
    }
  }
);

const userRoadmapSlice = createSlice({
  name: "userRoadmap",
  initialState: {
    roadmaps: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRoadmaps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRoadmaps.fulfilled, (state, action) => {
        state.loading = false;
        state.roadmaps = action.payload;
      })
      .addCase(fetchUserRoadmaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userRoadmapSlice.reducer;
