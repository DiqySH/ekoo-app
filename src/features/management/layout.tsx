import type { ReactNode } from "react";
import { Protected } from "@/shared/components/protected";
import SidebarLayout from "@/layouts/sidebar-layout";
import { ManagementProvider } from "@/features/management/contexts/management";
import { RouteAccessProvider } from "./contexts/route-access";
import { RouteAccessGuard } from "./components/route-access-guard";

export const ManagementLayout = ({ children }: { children: ReactNode }) => (
  <Protected>
    <SidebarLayout>
      <ManagementProvider>
        <RouteAccessProvider>
          <RouteAccessGuard>{children}</RouteAccessGuard>
        </RouteAccessProvider>
      </ManagementProvider>
    </SidebarLayout>
  </Protected>
);
