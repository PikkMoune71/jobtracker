import { Status } from "./Status";

export type Job = {
  id?: string;
  title: string;
  description: string;
  company: string;
  type: string;
  location: string;
  contactEmail?: string;
  salary?: string;
  status: Status;
  createdAt?: string;
};
