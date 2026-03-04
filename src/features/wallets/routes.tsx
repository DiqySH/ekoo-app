import type { RouteObject } from "react-router";
import Wallets from "@/features/wallets/pages/Wallets";
import CreateWallet from "@/features/wallets/pages/CreateWallet";
import Preview from "@/features/wallets/pages/Preview";
import { RouteErrorBoundary } from "@/errors/route-error-boundary";
import { WalletsLayout } from "@/features/wallets/layout";
import { WalletDetailLayout } from "@/features/wallets/layout/wallet-detail-layout";

export const createWalletRoute: RouteObject = {
  path: "/create-wallet",
  element: <CreateWallet />,
  errorElement: <RouteErrorBoundary />,
};

export const walletsRoutes: RouteObject[] = [
  {
    path: "/wallets",
    element: (
      <WalletsLayout>
        <Wallets />
      </WalletsLayout>
    ),
  },
  {
    path: "/wallets/:walletId",
    element: <WalletDetailLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Preview />,
      },
    ],
  },
];
