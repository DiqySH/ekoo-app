import { api } from "@/core/api";
import type { Wallet } from "@/shared/types/wallet";

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export const getWalletById = async (id: string): Promise<Wallet> => {
  const res = await api.get<ApiResponse<Wallet>>(`/wallets/detail/${id}`);
  return res.data.data;
};
