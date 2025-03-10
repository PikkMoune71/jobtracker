import { Job } from "@/types/Job";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Action asynchrone pour ajouter un job à la BDD
export const addJobToDatabase = createAsyncThunk(
  "job/addJobToDatabase",
  async (jobData: Job) => {
    try {
      const response = await axios.post<Job>("/api/jobs", jobData);

      if (!response.data) {
        throw new Error("Erreur lors de l’ajout du job");
      }

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  }
);

// Action asynchrone pour récupérer les jobs de la BDD
export const fetchJobs = createAsyncThunk("job/fetchJobs", async () => {
  try {
    const response = await axios.get("/api/jobs");

    console.log(response);

    if (!response.data) {
      throw new Error("Erreur lors de la récupération des jobs");
    }

    return await response.data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
    return "An unknown error occurred";
  }
});

// Action asynchrone pour récupérer les jobs de la BDD selon le statut
export const fetchJobsByStatus = createAsyncThunk(
  "job/fetchJobsByStatus",
  async (statusId: string) => {
    try {
      const response = await axios.get(`/api/jobs/status/${statusId}`);

      if (!response.data) {
        throw new Error("Erreur lors de la récupération des jobs");
      }

      return await response.data;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unknown error occurred";
    }
  }
);
