import type { signInSchema, signUpSchema } from "@/schemas/auth";
import type zod from "zod";

export type SignInValues = zod.infer<typeof signInSchema>;
export type SignUpValues = zod.infer<typeof signUpSchema>;
