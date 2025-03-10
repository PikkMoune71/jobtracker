"use client";

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
import { iconMap } from "@/hooks/useIconMap";

export function NavProjects({
  status,
  onStatusClick,
}: {
  status: Status[];
  onStatusClick: (status: Status) => void;
}) {
  const t = useI18n();
  const pathname = usePathname();
  const isFrench = pathname.startsWith("/fr");

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t("listOfJobs")}</SidebarGroupLabel>
      <SidebarMenu>
        {Array.isArray(status) &&
          status.map((status, index) => {
            const Icon =
              typeof status.icon === "string" ? iconMap[status.icon] : null;
            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onStatusClick(status);
                    }}
                    className="flex items-center gap-2 justify-between w-full"
                  >
                    <div className="flex items-center gap-2">
                      {Icon && <Icon width={15} />}

                      <span>
                        {isFrench ? statusNameFrench(status.name) : status.name}
                      </span>
                    </div>

                    <Badge
                      className="text-black rounded-full w-10 "
                      style={{ backgroundColor: status.color }}
                    >
                      {(status.Job ?? []).length}
                    </Badge>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
