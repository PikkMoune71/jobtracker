import { AppDispatch, RootState } from "@/lib/store";
import { fetchJobsByStatus } from "@/store/actions/jobActions";
import { Status } from "@/types/Status";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "./ui/card";
import { statusNameFrench } from "@/hooks/useTranslateStatus";

interface StatusBoardProps {
  selectedStatus: Status;
}

export const StatusBoard = ({ selectedStatus }: StatusBoardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs } = useSelector((state: RootState) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobsByStatus(selectedStatus.id as string));
  }, [dispatch, selectedStatus]);

  return (
    <div>
      <h1>{statusNameFrench(selectedStatus.name)}</h1>
      {jobs.map((job) => (
        <Card key={job.id}>
          <p>{job.title}</p>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.description}</p>
          <p>{job.type}</p>
          <p>{job.contactEmail}</p>
          <p>{job.salary}</p>
        </Card>
      ))}
    </div>
  );
};
