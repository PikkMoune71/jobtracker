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

const AddJobForm = () => {
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
  const pathname = usePathname();
  const isFrench = pathname.startsWith("/fr");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  useEffect(() => {
    const getStatus = async () => {
      const statuses = await fetchStatus();
      setStatus(statuses);
    };
    getStatus();
  }, []);

  return (
    <form onSubmit={handleSubmit} role="form">
      <Label htmlFor="title">{t("job.title")}</Label>
      <Input
        id="title"
        name="title"
        value={job.title}
        onChange={handleChange}
        required
      />
      <Label htmlFor="company">{t("job.company")}</Label>
      <Input
        id="company"
        name="company"
        value={job.company}
        onChange={handleChange}
        required
      />
      <Label htmlFor="type">{t("job.type")}</Label>
      <Input
        id="type"
        name="type"
        value={job.type}
        onChange={handleChange}
        required
      />
      <Label htmlFor="location">{t("job.location")}</Label>
      <Input
        id="location"
        name="location"
        value={job.location}
        onChange={handleChange}
        required
      />
      <Label htmlFor="description">{t("job.description")}</Label>
      <Input
        id="description"
        name="description"
        value={job.description}
        onChange={handleChange}
        required
      />
      <Label htmlFor="contactEmail">{t("job.contactEmail")}</Label>
      <Input
        id="contactEmail"
        name="contactEmail"
        value={job.contactEmail}
        onChange={handleChange}
        required
      />
      <Label htmlFor="salary">{t("job.salary")}</Label>
      <Input
        id="salary"
        name="salary"
        value={job.salary}
        onChange={handleChange}
        required
      />
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
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            {Array.isArray(status) &&
              status.map((status) => (
                <SelectItem key={status.id} value={status.name}>
                  {isFrench ? statusNameFrench(status.name) : status.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button type="submit">{t("addJob")}</Button>
    </form>
  );
};

export default AddJobForm;
