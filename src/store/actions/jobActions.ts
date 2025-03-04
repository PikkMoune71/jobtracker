import { Job } from "@/types/Job";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Action asynchrone pour ajouter un job à la BDD
export const addJobToDatabase = createAsyncThunk(
  "job/addJobToDatabase",
  async (jobData: Job) => {
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l’ajout du job");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unknown error occurred";
    }
  }
);

// Action asynchrone pour récupérer les jobs de la BDD
export const fetchJobs = createAsyncThunk("job/fetchJobs", async () => {
  try {
    const response = await fetch("/api/jobs");

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des jobs");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return "An unknown error occurred";
  }
});
