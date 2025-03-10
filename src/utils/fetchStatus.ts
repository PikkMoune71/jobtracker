import { Status } from "@/types/Status";
import axios from "axios";

export const fetchStatus = async (): Promise<Status[]> => {
  try {
    const res = await axios.get<Status[]>("/api/status");
    return res.data.sort((a, b) => (a.id ?? "").localeCompare(b.id ?? ""));
  } catch (error) {
    console.error("Failed to fetch status:", error);
    return [];
  }
};
