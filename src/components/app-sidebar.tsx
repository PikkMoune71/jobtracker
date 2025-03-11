"use client";
import { useEffect } from "react";
import { BookText } from "lucide-react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchStatus } from "@/store/actions/statusActions";

export function AppSidebar({
  onAccountClick,
  onStatusClick,
}: {
  onAccountClick: () => void;
  onStatusClick: (status: Status) => void;
}) {
  const t = useI18n();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.status);
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

  useEffect(() => {
    dispatch(fetchStatus());
  }, [dispatch]);

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
        <NavProjects status={status.status} onStatusClick={onStatusClick} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} onShowAccount={onAccountClick} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
