import { cn } from "@/shared/utils";
import type { ComponentProps } from "react";

const Card = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn("border border-[#8F8F8F]/30 rounded-[25px]", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
