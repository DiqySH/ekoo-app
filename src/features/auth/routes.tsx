import type { RouteObject } from "react-router";
import { Unprotected } from "@/shared/components/unprotected";
import SignIn from "@/features/auth/pages/SignIn";
import SignUp from "@/features/auth/pages/SignUp";

export const authRoutes: RouteObject[] = [
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
];
