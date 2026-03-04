import zod from "zod";

export const CreateWalletSchema = zod.object({
  wallet_name: zod
    .string()
    .min(1, "Name is required")
    .max(16, "Max name total length is 16 characters"),
});
