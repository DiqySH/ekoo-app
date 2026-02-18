import { useSidebar } from "@/context/sidebar";
import { SidebarClose, SidebarOpen } from "lucide-react";
import { Activity, type ComponentProps } from "react";

export const Sidebar = () => {
  const { isOpen } = useSidebar();
  return (
    <Activity mode={isOpen ? "visible" : "hidden"}>
      <div className="max-w-75 w-full block bg-white border border-black/40"></div>
    </Activity>
  );
};

export const SidebarButton = ({ ...props }: ComponentProps<"button">) => {
  const { isOpen, setIsOpen } = useSidebar();
  const handleClick = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);
  };
  return (
    <button {...props} onClick={handleClick}>
      {!isOpen ? <SidebarOpen /> : <SidebarClose />}
    </button>
  );
};
