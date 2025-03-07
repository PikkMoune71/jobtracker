"use client";
import * as React from "react";
import { Check, Clock, Forward, Send, X } from "lucide-react";
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

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects status={data.status} onStatusClick={onStatusClick} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} onShowAccount={onAccountClick} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
