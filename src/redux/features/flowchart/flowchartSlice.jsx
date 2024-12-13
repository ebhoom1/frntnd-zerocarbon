
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../../api/axios";

// // Async thunk for fetching flowchart
// export const fetchFlowchart = createAsyncThunk(
//   "flowchart/fetchFlowchart",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`/api/flowchart/get/${userId}`);
//       return response.data; // Nodes and edges already in the correct format
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Error fetching flowchart");
//     }
//   }
// );


// // Async thunk for saving flowchart
// export const saveFlowchart = createAsyncThunk(
//   "flowchart/saveFlowchart",
//   async ({userId, flowchartData}, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('/api/flowchart/save', {userId,flowchartData});
      
//       console.log(response.data)
//       return response.data;
//     } catch (error) {
//       console.log("errorfrntnd:",error)
//       return rejectWithValue(error.response?.data || "Error saving flowchart");
//     }
//   }
// );


// const flowchartSlice = createSlice({
//   name: "flowchart",
//   initialState: {
//     nodes: [],
//     edges: [],
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     setNodes(state, action) {
//       state.nodes = action.payload;
//     },
//     setEdges(state, action) {
//       state.edges = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchFlowchart.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchFlowchart.fulfilled, (state, action) => {
//         state.isLoading = false;
//         const { nodes, edges } = action.payload;
//         state.nodes = nodes;
//         state.edges = edges;
//       })
//       .addCase(fetchFlowchart.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(saveFlowchart.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(saveFlowchart.fulfilled, (state) => {
//         state.isLoading = false;
//       })
//       .addCase(saveFlowchart.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setNodes, setEdges } = flowchartSlice.actions;
// export default flowchartSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";

// Async thunk for fetching flowchart
export const fetchFlowchart = createAsyncThunk(
  "flowchart/fetchFlowchart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/flowchart/get/${userId}`);
      return response.data; // Nodes and edges already in the correct format
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching flowchart");
    }
  }
);


// Async thunk for saving flowchart
export const saveFlowchart = createAsyncThunk(
  "flowchart/saveFlowchart",
  async ({userId, flowchartData}, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/flowchart/save', {userId,flowchartData});
      
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log("errorfrntnd:",error)
      return rejectWithValue(error.response?.data || "Error saving flowchart");
    }
  }
);

// Async thunk for updating flowchart
export const updateFlowchart = createAsyncThunk(
  "flowchart/updateFlowchart",
  async ({ nodes, edges }, { rejectWithValue }) => {
    try {
      const response = await axios.put('/api/flowchart/user/update', { nodes, edges });
      return response.data; // Assuming the updated flowchart is returned
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating flowchart");
    }
  }
);


const flowchartSlice = createSlice({
  name: "flowchart",
  initialState: {
    nodes: [],
    edges: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setNodes(state, action) {
      state.nodes = action.payload;
    },
    setEdges(state, action) {
      state.edges = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlowchart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFlowchart.fulfilled, (state, action) => {
        state.isLoading = false;
        const { nodes, edges } = action.payload;
        state.nodes = nodes;
        state.edges = edges;
      })
      .addCase(fetchFlowchart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(saveFlowchart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveFlowchart.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(saveFlowchart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateFlowchart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateFlowchart.fulfilled, (state, action) => {
        state.isLoading = false;
        const { nodes, edges } = action.payload; // Ensure the backend sends back updated data
        state.nodes = nodes;
        state.edges = edges;
      })
      .addCase(updateFlowchart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setNodes, setEdges } = flowchartSlice.actions;
export default flowchartSlice.reducer;








