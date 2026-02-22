import type { RouteObject } from "react-router";
import { Public } from "@/shared/components/public";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Public children={null} />,
  },
];
