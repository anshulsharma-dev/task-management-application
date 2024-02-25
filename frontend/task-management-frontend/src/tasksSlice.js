import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fetch("http://localhost:5000/api/tasks");
  const data = await response.json();
  return data;
});

// Async thunk for adding a new task
export const addTask = createAsyncThunk("tasks/addTask", async (newTask) => {
  const response = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  const data = await response.json();
  return data; // This will be the new task added to the database
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: "idle", // Possible values: 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    // Define any reducers for manipulating tasks state here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Replace the existing tasks with the fetched tasks
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add the new task to the list of tasks
        state.items.push(action.payload);
      });
    // Include handling for pending and rejected states of addTask if needed
  },
});

export default tasksSlice.reducer;
