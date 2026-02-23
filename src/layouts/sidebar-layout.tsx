import { Sidebar } from "@/shared/components/ui/sidebar";
import type { ReactNode } from "react";

const SidebarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      {children}
    </div>
  );
};

export default SidebarLayout;
