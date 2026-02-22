import type { RouteObject } from "react-router";
import Wallets from "@/features/wallets/pages/Wallets";
import { WalletsLayout } from "@/features/wallets/layout";

export const walletsRoutes: RouteObject[] = [
  {
    path: "/wallets",
    element: (
      <WalletsLayout>
        <Wallets />
      </WalletsLayout>
    ),
  },
];
