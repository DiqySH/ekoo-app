import type { RouteObject } from "react-router";
import Chat from "./pages/Chat";

export const chatRoutes: RouteObject[] = [
  {
    path: "/chat",
    element: <Chat />,
  },
];
