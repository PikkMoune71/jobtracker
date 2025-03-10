import { Job } from "@prisma/client";
import { LucideIcon } from "lucide-react";

export type Status = {
  Job?: Job[];
  id?: string;
  name: string;
  icon?: LucideIcon;
  color?: string;
};
