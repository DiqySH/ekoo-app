import { Outlet, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { walletQuery } from "../api/wallet-query";
import { useGlobalStore } from "@/store/use-global-store";
import { useAuth } from "@/features/auth/contexts/auth";
import { Loading } from "@/shared/components/ui";

export const WalletDetailLayout = () => {
  const { user } = useAuth();
  const { walletId } = useParams<{ walletId: string }>();
  const wallets = useGlobalStore((state) => state.wallets);
  const preloadedWallet = wallets.find((w) => w.id === walletId);

  // Early client-side validation using preloaded data (from Sidebar)
  const isAuthorizedClientSide = preloadedWallet
    ? preloadedWallet.owner_id === user?.id ||
      preloadedWallet.users_id.includes(user?.id || "")
    : true; // If not in global store, defer to backend fetch

  const {
    data: wallet,
    isLoading,
    isError,
  } = useQuery({
    ...walletQuery(walletId!, preloadedWallet),
    retry: false, // Do not retry on 403/404
  });

  if (!isAuthorizedClientSide) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-2">404 - Not Found</h1>
        <p className="text-[#8F8F8F]">
          You do not have access to this wallet or it does not exist.
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-2">Wallet Not Found</h1>
        <p className="text-[#8F8F8F]">
          You do not have permission to view this wallet or it was deleted.
        </p>
      </div>
    );
  }

  // Only show loading if we don't even have initial data
  if (isLoading && !wallet) return <Loading />;

  // Render child routes once authorization clears and data starts caching
  return <Outlet />;
};
