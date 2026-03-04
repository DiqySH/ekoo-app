import { useWallets } from "@/features/wallets/hooks/use-wallets";
import { useGlobalStore } from "@/store/use-global-store";
import { useEffect } from "react";

export const GlobalDataFetcher = () => {
  // Fetch wallets as early as possible.
  // The hook already checks `enabled: !!user`, so it only fetches when logged in.
  const { data } = useWallets();
  const setWallets = useGlobalStore((state) => state.setWallets);

  useEffect(() => {
    if (data) {
      setWallets(data);
    }
  }, [data, setWallets]);

  return null;
};
