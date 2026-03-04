import { Sidebar } from "@/features/sidebar/components/sidebar";
import { Outlet } from "react-router";

const SidebarLayout = () => {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="sm:px-20 px-0 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
