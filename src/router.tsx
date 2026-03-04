import { createBrowserRouter } from "react-router";
import { authRoutes } from "@/features/auth/routes";
import { walletsRoutes, createWalletRoute } from "@/features/wallets/routes";
import { publicRoutes } from "@/routes/public";
import { chatRoutes } from "./features/chat/routes";
import NotFoundPage from "./errors/pages/NotFoundPage";
import SidebarLayout from "./features/sidebar/layout";

const router = createBrowserRouter([
  { path: "/*", element: <NotFoundPage /> },
  createWalletRoute,
  {
    element: <SidebarLayout />,
    children: [...walletsRoutes, ...chatRoutes],
  },
  ...publicRoutes,
  ...authRoutes,
]);

export default router;
