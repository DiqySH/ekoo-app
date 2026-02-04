import { cn } from "@/lib/utils";
import type React from "react";

const Label = ({
  children,
  className,
  ...props
}: React.ComponentProps<"label">) => (
  <label {...props} className={cn("text-sm", className)}>
    {children}
  </label>
);

export default Label;
