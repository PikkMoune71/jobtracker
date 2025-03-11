import { AppDispatch, RootState } from "@/lib/store";
import { fetchJobsByStatus } from "@/store/actions/jobActions";
import { Status } from "@/types/Status";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statusNameFrench } from "@/hooks/useTranslateStatus";
import { iconMap } from "@/hooks/useIconMap";
import { Badge } from "./ui/badge";
import { JobItem } from "./JobItem";
import Loader from "./Loader";
import { usePathname } from "next/navigation";

interface StatusBoardProps {
  selectedStatus: Status;
}

export const StatusBoard = ({ selectedStatus }: StatusBoardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, state } = useSelector((state: RootState) => state.jobs);
  const pathname = usePathname();
  const isFrench = pathname && pathname.startsWith("/fr");

  const Icon =
    typeof selectedStatus.icon === "string"
      ? iconMap[selectedStatus.icon]
      : null;

  useEffect(() => {
    dispatch(fetchJobsByStatus(selectedStatus.id as string));
  }, [dispatch, selectedStatus]);

  return (
    <div>
      {state === "loading" ? (
        <Loader color={selectedStatus.color ?? "#111"} />
      ) : (
        <>
          <h1 className="text-3xl">
            <div className="flex items-center gap-2">
              {Icon && <Icon width={25} className="mt-1" />}
              {isFrench
                ? statusNameFrench(selectedStatus.name)
                : selectedStatus.name}
              <Badge
                className="text-black rounded-full w-10 mt-1 ml-2 text-sm"
                style={{ backgroundColor: selectedStatus.color }}
              >
                {(jobs ?? []).length}
              </Badge>
            </div>
          </h1>
          {jobs.map((job) => (
            <JobItem key={job.id} job={job} selectedStatus={selectedStatus} />
          ))}
        </>
      )}
    </div>
  );
};
