import type { CreateWalletValues } from "../types";
import { createWallet } from "./create-wallet";
import { queryClient } from "@/core/query-client";

export const createWalletMutate = () => ({
  mutationFn: (body: CreateWalletValues) => createWallet(body),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["wallets"] });
  },
});
