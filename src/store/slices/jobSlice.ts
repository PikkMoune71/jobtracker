import { createSlice } from "@reduxjs/toolkit";
import { Job } from "@/types/Job";
import { addJobToDatabase, fetchJobs } from "../actions/jobActions";

interface JobState {
  jobs: Job[];
  status: string;
  error: string | undefined;
}
const initialState: JobState = {
  jobs: [],
  status: "idle",
  error: "",
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addJobToDatabase.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addJobToDatabase.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(addJobToDatabase.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default jobSlice.reducer;
