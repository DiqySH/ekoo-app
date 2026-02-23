import type { ReactNode } from "react";
import { Protected } from "@/shared/components/protected";
import SidebarLayout from "@/layouts/sidebar-layout";
import { ManagementProvider } from "@/features/management/contexts/management";
import { AccessGate } from "./components/access-gate";

export const ManagementLayout = ({ children }: { children: ReactNode }) => (
  <Protected>
    <SidebarLayout>
      <ManagementProvider>
        <AccessGate>{children}</AccessGate>
      </ManagementProvider>
    </SidebarLayout>
  </Protected>
);
