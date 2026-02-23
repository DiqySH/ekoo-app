import { createContext, useContext, type ReactNode } from "react";
import type { WalletsContextValue } from "../types";
import { useQuery } from "@tanstack/react-query";
import { database } from "@/core/api";
import { useAuth } from "@/features/auth/contexts/auth";
import type { WalletItem } from "@/shared/types/wallet";

const WalletsContext = createContext<WalletsContextValue | null>(null);

export const WalletsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const query = useQuery<WalletItem[]>({
    queryKey: ["wallets"],
    queryFn: async () => {
      const { data, error } = await database
        .from("wallets")
        .select("id, users_id, wallet_name")
        .eq("owner_id", user!.id);

      if (error) throw error;

      return data ?? [];
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <WalletsContext.Provider value={query}>{children}</WalletsContext.Provider>
  );
};

export const UseWallets = () => {
  const ctx = useContext(WalletsContext);

  if (!ctx) {
    throw new Error("useWallets must be used inside <WalletsProvider>");
  }

  return ctx;
};
