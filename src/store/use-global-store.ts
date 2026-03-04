import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WalletItem } from "@/shared/types/wallet";

interface GlobalState {
  activeWalletId: string | null;
  setActiveWalletId: (id: string | null) => void;
  wallets: WalletItem[];
  setWallets: (wallets: WalletItem[]) => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      activeWalletId: null,
      setActiveWalletId: (id) => set({ activeWalletId: id }),

      wallets: [],
      setWallets: (wallets) => set({ wallets }),
    }),
    {
      name: "ekoo-global-storage",
      partialize: (state) => ({ activeWalletId: state.activeWalletId }),
    },
  ),
);
