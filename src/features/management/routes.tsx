import type { RouteObject } from "react-router";
import Preview from "@/features/management/pages/Preview";
import { ManagementLayout } from "@/features/management/layout";

export const managementRoutes: RouteObject[] = [
  {
    path: "/wallets/:walletId",
    element: (
      <ManagementLayout>
        <Preview />
      </ManagementLayout>
    ),
  },
];
