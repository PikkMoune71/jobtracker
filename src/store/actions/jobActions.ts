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

// Action asynchrone pour mettre à jour le statut d'un job
export const updateJobStatus = createAsyncThunk(
  "job/updateJobStatus",
  async ({ jobId, statusId }: { jobId: string; statusId: string }) => {
    try {
      const response = await axios.put(`/api/jobs/${jobId}/status`, {
        jobId,
        statusId,
      });

      if (!response.data) {
        throw new Error("Erreur lors de la mise à jour du statut du job");
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

export const updateJobInDatabase = createAsyncThunk(
  "job/updateJobInDatabase",
  async (jobData: Job) => {
    try {
      const response = await axios.put<Job>(`/api/jobs/${jobData.id}`, jobData);

      if (!response.data) {
        throw new Error("Erreur lors de la mise à jour du job");
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

// Action asynchrone pour supprimer un job de la BDD
export const deleteJobToDatabase = createAsyncThunk(
  "job/deleteJobToDatabase",
  async ({ id }: { id: string }) => {
    try {
      const response = await axios.delete(`/api/jobs/${id}`);

      if (!response.data) {
        throw new Error("Erreur lors de la suppression du job");
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
