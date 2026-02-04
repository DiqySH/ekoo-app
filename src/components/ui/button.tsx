import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

const buttonVariants = cva("px-4 py-2 rounded-[0.5rem] cursor-pointer", {
  variants: {
    variant: {
      primary: "border-black/40 border bg-[#228D57] text-white",
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
