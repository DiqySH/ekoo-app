import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

const buttonVariants = cva("px-[13px] py-[7px] rounded-[13px] cursor-pointer", {
  variants: {
    variant: {
      primary: "border-[#8F8F8F]/30 border bg-black text-white",
      secondary: "border-black/40 border bg-white text-black/75",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) => (
  <button {...props} className={buttonVariants({ variant, className })}>
    {children}
  </button>
);

export default Button;
