"use client";
import * as React from "react";
import { BookText, Check, Clock, Forward, Send, X } from "lucide-react";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { Logo } from "./Logo";
import { Status } from "@/types/Status";
import AddJobForm from "./AddJobForm";
import { DialogAction } from "./DialogAction";
import { useI18n } from "@/locales/client";

const data = {
  status: [
    {
      name: "Application Sent",
      icon: Send,
      color: "#60a5fa",
    },
    {
      name: "Interview Scheduled",
      icon: Clock,
      color: "#facc15",
    },
    {
      name: "Application Accepted",
      icon: Check,
      color: "#4ade80",
    },
    {
      name: "Application Rejected",
      icon: X,
      color: "#f87171",
    },
    {
      name: "Follow Up",
      icon: Forward,
      color: "#818cf8",
    },
  ],
};

export function AppSidebar({
  onAccountClick,
  onStatusClick,
}: {
  onAccountClick: () => void;
  onStatusClick: (status: Status) => void;
}) {
  const t = useI18n();
  const { user } = useUser();
  const userData = user
    ? {
        name: user.fullName || "",
        email: user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl,
      }
    : {
        name: "",
        email: "",
        avatar: "",
      };

  const addJob = t("addJob");
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col gap-4 m-2">
          <DialogAction
            title={addJob}
            icon={<BookText />}
            component={<AddJobForm />}
          />
        </div>
        <NavProjects status={data.status} onStatusClick={onStatusClick} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} onShowAccount={onAccountClick} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
