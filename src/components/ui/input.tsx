import { cn } from "@/lib/utils";
import type React from "react";

const Input = ({ className, ...props }: React.ComponentProps<"input">) => (
  <input
    {...props}
    className={cn(
      "focus:outline-0 px-4 py-2 border border-black/40 rounded-[0.5rem] bg-white",
      className
    )}
  />
);

export default Input;
