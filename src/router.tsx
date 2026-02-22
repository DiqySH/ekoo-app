import { createBrowserRouter } from "react-router";
import { authRoutes } from "@/features/auth/routes";
import { walletsRoutes } from "@/features/wallets/routes";
import { managementRoutes } from "@/features/management/routes";
import { publicRoutes } from "@/routes/public";

const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
  ...walletsRoutes,
  ...managementRoutes,
]);

export default router;
