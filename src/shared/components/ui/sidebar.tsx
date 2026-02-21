import { useSidebar } from "@/shared/contexts/sidebar";
import { SidebarClose, SidebarOpen } from "lucide-react";
import { Activity, type ComponentProps } from "react";
import IconFrame from "./icon-frame";

export const Sidebar = () => {
  const { isOpen } = useSidebar();
  return (
    <Activity mode={isOpen ? "visible" : "hidden"}>
      <div className="max-w-20.5 w-full bg-[#FAFAFA] border bold-outline flex flex-col items-center pt-5">
        <IconFrame />
      </div>
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
