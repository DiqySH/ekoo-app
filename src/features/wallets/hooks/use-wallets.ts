import { useQuery } from "@tanstack/react-query";
import { database } from "@/core/api";
import { useAuth } from "@/features/auth/contexts/auth";
import type { WalletItem } from "@/shared/types/wallet";

export const useWallets = () => {
  const { user } = useAuth();

  const query = useQuery<WalletItem[]>({
    queryKey: ["wallets"],
    queryFn: async () => {
      // Return early if no user to prevent errors, though 'enabled' handles this too
      if (!user) return [];

      const { data, error } = await database
        .from("wallets")
        .select("id, users_id, wallet_name, owner_id")
        .eq("owner_id", user.id);

      if (error) throw error;

      return data ?? [];
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!user, // Hanya fetch jika user sudah ada
  });

  return query;
};
