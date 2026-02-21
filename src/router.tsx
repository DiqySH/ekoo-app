import { createBrowserRouter, type RouteObject } from "react-router";
import { Protected } from "@/shared/components/protected";
import { Public } from "@/shared/components/public";
import SignIn from "@/features/auth/pages/SignIn";
import SignUp from "@/features/auth/pages/SignUp";
import SidebarLayout from "@/layouts/sidebar-layout";
import Preview from "@/features/preview/pages/Preview";
import Chat from "@/features/chat/pages/Chat";
import { Unprotected } from "./shared/components/unprotected";
import Wallets from "./features/wallets/pages/Wallets";
import { WalletsProvider } from "./features/wallets/contexts/wallets";

const pages: RouteObject[] = [
  {
    path: "/wallets",
    element: (
      <Protected>
        <WalletsProvider>
          <Wallets />
        </WalletsProvider>
      </Protected>
    ),
  },
  {
    path: "/chat",
    element: (
      <Protected>
        <SidebarLayout>
          <Chat />
        </SidebarLayout>
      </Protected>
    ),
  },
  {
    path: "/preview",
    element: (
      <Protected>
        <SidebarLayout>
          <Preview />
        </SidebarLayout>
      </Protected>
    ),
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public children={null} />,
  },
  {
    path: "/sign-in",
    element: (
      <Unprotected>
        <SignIn />
      </Unprotected>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <Unprotected>
        <SignUp />
      </Unprotected>
    ),
  },
  ...pages,
]);

export default router;
