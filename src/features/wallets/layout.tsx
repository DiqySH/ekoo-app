import type { ReactNode } from "react";
import { Protected } from "@/shared/components/protected";
import { WalletsProvider } from "@/features/wallets/contexts/wallets";

export const WalletsLayout = ({ children }: { children: ReactNode }) => (
  <Protected>
    <WalletsProvider>{children}</WalletsProvider>
  </Protected>
);
