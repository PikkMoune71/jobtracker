import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addJobToDatabase } from "@/store/actions/jobActions";
import { Job } from "@/types/Job";
import { AppDispatch } from "@/lib/store";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useI18n } from "@/locales/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Status } from "@/types/Status";
import { fetchStatus } from "@/utils/fetchStatus";
import { usePathname } from "next/navigation";
import { statusNameFrench } from "@/hooks/useTranslateStatus";
import { useJobSchema } from "@/hooks/useValidateJob";
import { Textarea } from "./ui/textarea";
import { iconMap } from "@/hooks/useIconMap";

interface AddJobFormProps {
  onClose?: () => void;
}

const AddJobForm = ({ onClose }: AddJobFormProps) => {
  const t = useI18n();
  const dispatch = useDispatch<AppDispatch>();
  const [job, setJob] = useState<Job>({
    title: "",
    description: "",
    company: "",
    type: "",
    location: "",
    contactEmail: "",
    salary: "",
    status: { id: "", name: "" },
  });
  const [status, setStatus] = useState<Status[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const pathname = usePathname();
  const isFrench = pathname && pathname.startsWith("/fr");

  useEffect(() => {
    const getStatus = async () => {
      const statuses = await fetchStatus();
      setStatus(statuses);
    };
    getStatus();
  }, []);

  const jobSchema = useJobSchema(); // On appelle la fonction ici pour obtenir le schema dynamique

  const validateJob = (jobData: Job) => {
    const result = jobSchema.safeParse(jobData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateJob(job)) {
      dispatch(addJobToDatabase(job));
      setJob({
        title: "",
        description: "",
        company: "",
        type: "",
        location: "",
        contactEmail: "",
        salary: "",
        status: { id: "", name: "" },
      });
      onClose?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} role="form" className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor="title">{t("job.title")}</Label>
          <Input
            id="title"
            name="title"
            placeholder="Software Engineer"
            value={job.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="type">{t("job.type")}</Label>
          <Input
            id="type"
            name="type"
            placeholder="CDI"
            value={job.type}
            onChange={handleChange}
          />
          {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="company">{t("job.company")}</Label>
        <Input
          id="company"
          name="company"
          placeholder="Job Tracker"
          value={job.company}
          onChange={handleChange}
        />
        {errors.company && (
          <p className="text-red-500 text-xs">{errors.company}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="location">{t("job.location")}</Label>
        <Input
          id="location"
          name="location"
          placeholder="Paris, France"
          value={job.location}
          onChange={handleChange}
        />
        {errors.location && (
          <p className="text-red-500 text-xs">{errors.location}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="description">{t("job.description")}</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="We are looking for a software engineer..."
          value={job.description}
          onChange={handleChange}
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="contactEmail">{t("job.contactEmail")}</Label>
        <Input
          id="contactEmail"
          name="contactEmail"
          placeholder="contact@company.com"
          value={job.contactEmail}
          onChange={handleChange}
        />
        {errors.contactEmail && (
          <p className="text-red-500 text-xs">{errors.contactEmail}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor="salary">{t("job.salary")}</Label>
          <Input
            id="salary"
            name="salary"
            placeholder="50000"
            value={job.salary}
            onChange={handleChange}
          />
          {errors.salary && (
            <p className="text-red-500 text-xs">{errors.salary}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="status">{t("job.status")}</Label>
          <Select
            name="status"
            onValueChange={(value) =>
              setJob((prevJob) => {
                const selectedStatus = status.find((s) => s.name === value);
                return {
                  ...prevJob,
                  status: selectedStatus || { id: "", name: "" },
                };
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent role="combobox">
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {Array.isArray(status) &&
                  status.map((status) => {
                    const Icon =
                      typeof status.icon === "string"
                        ? iconMap[status.icon]
                        : null;
                    return (
                      <SelectItem
                        key={status.id}
                        value={status.name}
                        style={{ backgroundColor: status.color }}
                        className="mb-1"
                      >
                        {Icon && <Icon className="w-5 h-5 text-black" />}
                        {isFrench ? statusNameFrench(status.name) : status.name}
                      </SelectItem>
                    );
                  })}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-red-500 text-xs">{errors.status}</p>
          )}
        </div>
      </div>
      <Button className="mt-4" type="submit">
        {t("addJob")}
      </Button>
    </form>
  );
};

export default AddJobForm;
