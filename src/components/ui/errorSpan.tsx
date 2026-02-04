import { cn } from "@/lib/utils";
import type React from "react";

const ErrorSpan = ({
  children,
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span className={cn("text-sm text-red-500", className)} {...props}>
    {children}
  </span>
);

export default ErrorSpan;
