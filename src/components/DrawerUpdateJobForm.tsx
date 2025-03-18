import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Edit, X } from "lucide-react";
import { useI18n } from "@/locales/client";
import UpdateJobForm from "./UpdateJobForm";
import { Job } from "@/types/Job";
import { useIsMobile } from "@/hooks/use-mobile";

interface DrawerUpdateJobFormProps {
  job: Job;
}

export const DrawerUpdateJobForm = ({ job }: DrawerUpdateJobFormProps) => {
  const t = useI18n();
  const isMobile = useIsMobile();

  const updateJob = t("updateJob");
  return (
    <Drawer shouldScaleBackground direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="xs">
          <Edit className="mr-2" />
          {updateJob}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full overflow-y-auto" autoFocus={false}>
        <div className="p-4 z-50">
          <DrawerClose asChild>
            <X />
          </DrawerClose>
          <DrawerHeader className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-normal">
              {t("updateJob")} <span className="font-bold">{job.title}</span>
            </DrawerTitle>
          </DrawerHeader>
          <UpdateJobForm job={job} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
