import type { ReactNode } from "react";
import { Protected } from "@/shared/components/protected";

export const WalletsLayout = ({ children }: { children: ReactNode }) => (
  <Protected>{children}</Protected>
);

