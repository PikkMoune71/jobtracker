import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Check, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { iconMap } from "@/hooks/useIconMap";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Status } from "@/types/Status";
import { Job } from "@/types/Job";

interface MoreActionsJobProps {
  job: Job;
  selectedStatus: Status;
  onStatusChange: (jobId: string, newStatus: Status) => void;
}

export const MoreActionsJob = ({
  job,
  selectedStatus,
  onStatusChange,
}: MoreActionsJobProps) => {
  const status = useSelector((state: RootState) => state.status?.status);

  const handleDeleteJob = () => {
    // Implement delete job
  };

  const handleStatusChange = (newStatus: Status) => {
    onStatusChange(job.id ?? "", newStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-expanded={true}
          aria-label="More options"
        >
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent role="menu">
        <DropdownMenuItem className="cursor-pointer">
          <Edit className="mr-2 text-black" />
          Modifier
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {handleDeleteJob && (
          <DropdownMenuItem
            onClick={() => handleDeleteJob()}
            className="text-red-500"
          >
            <Trash2 className="mr-2 text-red-500" /> Supprimer
          </DropdownMenuItem>
        )}
        {/* Dropdown for changing job status */}
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger role="menuitemStatus">
            Change status
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent role="dropdownStatus">
              {status &&
                Array.isArray(status) &&
                status.map((statusItem) => {
                  const Icon =
                    typeof statusItem.icon === "string"
                      ? iconMap[statusItem.icon]
                      : null;
                  return (
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(statusItem)}
                      key={statusItem.id}
                      style={{ backgroundColor: statusItem.color }}
                      className="mb-1"
                      role="optionStatus"
                    >
                      {Icon && <Icon className="w-5 h-5 text-black" />}
                      {statusItem.name}{" "}
                      {selectedStatus.id === statusItem.id && (
                        <Check className="text-black" />
                      )}
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
