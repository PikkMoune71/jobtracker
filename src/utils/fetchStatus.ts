import { Status } from "@/types/Status";

export const fetchStatus = async (): Promise<Status[]> => {
  try {
    const res = await fetch("/api/status");
    const data = await res.json();
    if (Array.isArray(data)) {
      return data.sort((a, b) => a.id.localeCompare(b.id));
    } else {
      console.error("Invalid API response:", data);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch status:", error);
    return [];
  }
};
