import { createSlice } from "@reduxjs/toolkit";
import { Job } from "@/types/Job";
import { addJobToDatabase, fetchJobs } from "../actions/jobActions";

export interface JobState {
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
        if (
          typeof action.payload !== "string" &&
          action.payload &&
          !("error" in action.payload)
        ) {
          state.jobs.push(action.payload as Job);
          state.status = "succeeded";
        } else {
          // Gère le cas d'erreur
          state.error =
            typeof action.payload === "object" && "error" in action.payload
              ? action.payload.error
              : "Erreur inconnue";
          state.status = "failed";
        }
      })
      .addCase(addJobToDatabase.rejected, (state, action) => {
        // Gère le cas où la requête échoue
        state.error =
          (action.payload as { error?: string })?.error ||
          action.error.message ||
          "Erreur inconnue";
        state.status = "failed";
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
