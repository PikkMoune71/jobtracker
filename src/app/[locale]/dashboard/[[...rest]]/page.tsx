"use client";
import AddJob from "@/components/AddJob";
import { AppSidebar } from "@/components/app-sidebar";
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
import { UserProfile } from "@clerk/nextjs";
import { useState } from "react";

export default function Page() {
  const t = useI18n();
  const [showAccount, setShowAccount] = useState(false);

  const handleShowAccount = () => {
    setShowAccount(true);
  };
  return (
    <SidebarProvider>
      <AppSidebar onAccountClick={handleShowAccount} />
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
          {showAccount ? (
            <div className="flex justify-center items-center">
              <UserProfile />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-4xl font-bold">Dashboard</h1>
              <AddJob />
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
