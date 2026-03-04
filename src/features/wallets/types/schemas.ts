import type zod from "zod";
import type { CreateWalletSchema } from "../schemas/create-wallet";

export type CreateWalletValues = zod.infer<typeof CreateWalletSchema>;
