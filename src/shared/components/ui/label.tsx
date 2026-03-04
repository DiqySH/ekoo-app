import { cn } from "@/shared/utils";
import type React from "react";

const Label = ({
  children,
  className,
  ...props
}: React.ComponentProps<"label">) => (
  <label {...props} className={cn("text-[17px] font-medium", className)}>
    {children}
  </label>
);

export default Label;
