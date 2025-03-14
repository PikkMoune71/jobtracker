import { createSlice } from "@reduxjs/toolkit";
import { Job } from "@/types/Job";
import {
  addJobToDatabase,
  fetchJobs,
  fetchJobsByStatus,
  updateJobInDatabase,
  updateJobStatus,
} from "../actions/jobActions";

export interface JobState {
  jobs: Job[];
  state: string;
  error: string | undefined;
}

const initialState: JobState = {
  jobs: [],
  state: "idle",
  error: "",
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addJobToDatabase.pending, (state) => {
        state.state = "loading";
      })
      .addCase(addJobToDatabase.fulfilled, (state, action) => {
        if (
          typeof action.payload !== "string" &&
          action.payload &&
          !("error" in action.payload)
        ) {
          state.jobs.push(action.payload as Job);
          state.state = "succeeded";
        } else {
          // Gère le cas d'erreur
          state.error =
            typeof action.payload === "object" && "error" in action.payload
              ? action.payload.error
              : "Erreur inconnue";
          state.state = "failed";
        }
      })
      .addCase(addJobToDatabase.rejected, (state, action) => {
        // Gère le cas où la requête échoue
        state.error =
          (action.payload as { error?: string })?.error ||
          action.error.message ||
          "Erreur inconnue";
        state.state = "failed";
      })
      .addCase(fetchJobs.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.state = "succeeded";
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(fetchJobsByStatus.pending, (state) => {
        state.state = "loading";
      })
      .addCase(fetchJobsByStatus.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.state = "succeeded";
      })
      .addCase(fetchJobsByStatus.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateJobStatus.pending, (state) => {
        state.state = "loading";
      })
      .addCase(updateJobStatus.fulfilled, (state, action) => {
        const updatedJobIndex = state.jobs.findIndex(
          (job) => job.id === action.payload.id
        );
        if (updatedJobIndex >= 0) {
          state.jobs[updatedJobIndex] = action.payload;
        }
        state.state = "succeeded";
      })
      .addCase(updateJobStatus.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateJobInDatabase.pending, (state) => {
        state.state = "loading";
      })
      .addCase(updateJobInDatabase.fulfilled, (state, action) => {
        if (
          action.payload &&
          typeof action.payload === "object" &&
          "id" in action.payload
        ) {
          if (typeof action.payload !== "string" && "id" in action.payload) {
            state.jobs = state.jobs.map((job) =>
              job.id === (action.payload as Job).id
                ? (action.payload as Job)
                : job
            );
          } else {
            state.error = "Données invalides reçues lors de la mise à jour";
            state.state = "failed";
          }
          state.state = "succeeded";
        } else {
          state.error = "Données invalides reçues lors de la mise à jour";
          state.state = "failed";
        }
      })
      .addCase(updateJobInDatabase.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default jobSlice.reducer;
