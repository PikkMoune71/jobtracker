import { useI18n } from "@/locales/client";
import { z } from "zod";
export const useJobSchema = () => {
  const t = useI18n();

  return z.object({
    title: z.string().min(3, t("jobSchemaValidate.title")),
    description: z.string().min(5, t("jobSchemaValidate.description")),
    company: z.string().min(2, t("jobSchemaValidate.company")),
    type: z.string().min(3, t("jobSchemaValidate.type")),
    location: z.string().min(2, t("jobSchemaValidate.location")),
    contactEmail: z.string().email(t("jobSchemaValidate.contactEmail")),
    salary: z.string().min(2, t("jobSchemaValidate.salary")),

    status: z.object({
      id: z.string().min(1, t("jobSchemaValidate.status.id")),
      name: z.string().min(1, t("jobSchemaValidate.status.name")),
    }),
  });
};

export type JobFormData = z.infer<ReturnType<typeof useJobSchema>>;
