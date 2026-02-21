/* eslint-disable react-refresh/only-export-components */
import type { SidebarContextValue } from "@/shared/types/sidebar";
import { createContext, useContext, useState, type ReactNode } from "react";

const SidebarContext = createContext<SidebarContextValue | null>(null);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);

  if (!ctx) {
    throw new Error("useSidebar must be used inside <SidebarProvider>");
  }

  return ctx;
};
