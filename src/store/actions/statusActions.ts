import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStatus = createAsyncThunk("status/fetchStatus", async () => {
  try {
    const response = await axios.get("/api/status");

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
