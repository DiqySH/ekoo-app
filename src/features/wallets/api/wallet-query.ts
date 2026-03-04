import { getWalletById } from "./wallet";
import type { WalletItem, Wallet } from "@/shared/types/wallet";

export const walletQuery = (
  walletId: string,
  preloadedWallet?: WalletItem,
) => ({
  queryKey: ["wallet", walletId],
  queryFn: () => getWalletById(walletId),
  staleTime: 1000 * 60 * 5, // 5 menit
  initialData: preloadedWallet
    ? ({
        ...preloadedWallet,
        owner_id: "",
        users_id: [],
        created_at: new Date(),
        updated_at: new Date(),
      } as unknown as Wallet)
    : undefined,
});
