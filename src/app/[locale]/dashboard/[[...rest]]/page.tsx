"use client";
import AddJobForm from "@/components/AddJobForm";
import { AppSidebar } from "@/components/app-sidebar";
import { Board } from "@/components/Board";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useI18n } from "@/locales/client";
import { Status } from "@/types/Status";
import { UserProfile } from "@clerk/nextjs";
import { useState } from "react";

export default function Page() {
  const t = useI18n();
  const [showAccount, setShowAccount] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const handleShowAccount = () => {
    setShowAccount(true);
    setSelectedStatus(null);
  };

  const handleStatusClick = (status: Status) => {
    setSelectedStatus(status);
    setShowAccount(false);
  };
  return (
    <SidebarProvider>
      <AppSidebar
        onAccountClick={handleShowAccount}
        onStatusClick={handleStatusClick}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Job tracker</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {" "}
                    {showAccount ? t("account") : t("dashboard")}{" "}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {!showAccount && !selectedStatus ? (
            <Board />
          ) : showAccount ? (
            <div className="flex justify-center items-center">
              <UserProfile />
            </div>
          ) : (
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {selectedStatus && (
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-4xl font-bold">
                    Status {selectedStatus.name}
                  </h1>
                  <AddJobForm />
                </div>
              )}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
