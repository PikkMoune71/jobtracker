"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useI18n } from "@/locales/client";
import { usePathname } from "next/navigation";
import { Status } from "@/types/Status";
import { Badge } from "./ui/badge";
import { statusNameFrench } from "@/hooks/useTranslateStatus";

export function NavProjects({
  status,
  onStatusClick,
}: {
  status: {
    name: string;
    icon: LucideIcon;
    color: string;
  }[];
  onStatusClick: (status: Status) => void;
}) {
  const t = useI18n();
  const pathname = usePathname();
  const isFrench = pathname.startsWith("/fr");

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t("listOfJobs")}</SidebarGroupLabel>
      <SidebarMenu>
        {status.map((item, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton asChild>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onStatusClick(item);
                }}
                className="flex items-center gap-2 justify-between w-full"
              >
                <div className="flex items-center gap-2">
                  <item.icon width={15} />

                  <span>
                    {isFrench ? statusNameFrench(item.name) : item.name}
                  </span>
                </div>

                <Badge
                  className="text-black rounded-full w-10 "
                  style={{ backgroundColor: item.color }}
                >
                  0
                </Badge>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
