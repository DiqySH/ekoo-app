import zod from "zod";

export const signInSchema = zod.object({
  email: zod.email("Email address is invalid"),
  password: zod
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = zod
  .object({
    email: zod.email("Email address is invalid"),
    password: zod
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });
