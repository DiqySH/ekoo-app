import type { RouteObject } from "react-router";
import { Protected } from "@/shared/components/protected";
import SidebarLayout from "@/layouts/sidebar-layout";
import Wallets from "@/features/wallets/pages/Wallets";
import { WalletsProvider } from "@/features/wallets/contexts/wallets";
import Preview from "@/features/management/pages/Preview";
import { ManagementProvider } from "@/features/management/contexts/management";
import type { ReactNode } from "react";
// import Chat from "@/features/chat/pages/Chat";

// ============================================================================
// Protected Components
// ============================================================================

const ProtectedWallets = () => (
  <Protected>
    <WalletsProvider>
      <Wallets />
    </WalletsProvider>
  </Protected>
);

const ProtectedWalletPreview = () => (
  <Protected>
    <SidebarLayout>
      <ManagementProvider>
        <Preview />
      </ManagementProvider>
    </SidebarLayout>
  </Protected>
);

// const ProtectedChat = () => (
//   <Protected>
//     <SidebarLayout>
//       <Chat />
//     </SidebarLayout>
//   </Protected>
// );

// ============================================================================
// Protected Routes
// ============================================================================

export const protectedRoutes: RouteObject[] = [
  { path: "/wallets", element: <ProtectedWallets /> },
  { path: "/wallets/:walletId", element: <ProtectedWalletPreview /> },
  // { path: "/chat", element: <ProtectedChat /> },
];
