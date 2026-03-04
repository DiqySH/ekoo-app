import { api } from "@/core/api";
import type { CreateWalletValues } from "../types";

export const createWallet = async (body: CreateWalletValues) => {
  const res = await api.post("/wallets/create", body);
  return res.data;
};
