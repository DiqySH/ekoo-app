import { cn } from "@/shared/utils";
import type React from "react";

const Input = ({ className, ...props }: React.ComponentProps<"input">) => (
  <input
    {...props}
    className={cn(
      "focus:outline-0 px-4 py-2 border border-[#8F8F8F]/30 rounded-[12px] bg-white text-[15px]",
      className,
    )}
  />
);

export default Input;
