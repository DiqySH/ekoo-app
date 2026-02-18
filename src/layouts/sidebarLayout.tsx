import { Sidebar } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

const SidebarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full">
      <Sidebar />
      {children}
    </div>
  );
};

export default SidebarLayout;
