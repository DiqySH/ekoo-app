import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { walletQuery } from "../api/wallet-query";
import ChartDemo from "../components/chart-demo";
import { useGlobalStore } from "@/store/use-global-store";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Loading,
} from "@/shared/components/ui";

const Preview = () => {
  const { walletId } = useParams<{ walletId: string }>();
  const wallets = useGlobalStore((state) => state.wallets);
  const preloadedWallet = wallets.find((w) => w.id === walletId);

  const { data: wallet, isLoading } = useQuery({
    ...walletQuery(walletId!, preloadedWallet),
    retry: false,
  });

  // Only show loading if we don't even have initial data
  if (isLoading && !wallet) return <Loading />;

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href=""
              className="text-[#228D57] hover:text-[#228D57] font-bold"
            >
              {wallet?.wallet_name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Preview</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <ChartDemo />
      <div className="w-full min-h-screen"></div>
    </div>
  );
};

export default Preview;
