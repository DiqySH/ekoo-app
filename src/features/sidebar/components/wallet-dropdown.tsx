import { Button } from "@/shared/components/ui";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/shared/components/ui";
import { useGlobalStore } from "@/store/use-global-store";
import WalletIcon from "./wallet-icon";
import { PlusIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";

const WalletDropdown = () => {
  const navigate = useNavigate();
  const activeWalletId = useGlobalStore((state) => state.activeWalletId);
  const wallets = useGlobalStore((state) => state.wallets);
  const setActiveWalletId = useGlobalStore((state) => state.setActiveWalletId);

  if (!activeWalletId && wallets.length > 0) {
    setActiveWalletId(wallets[0].id);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="p-0! border-0 bg-transparent!">
          <WalletIcon
            wallet_name={
              wallets.find((wallet) => wallet.id === activeWalletId)
                ?.wallet_name || "??"
            }
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        className="rounded-[25px] p-[15px] min-w-[300px]"
      >
        <DropdownMenuGroup>
          <div className="w-full flex justify-between items-center">
            <span className="text-[20px] font-semibold">Wallets</span>
            <Link to="create-wallet">
              <Button
                variant="secondary"
                className="w-9 h-9 grid place-items-center p-0! border-[#8F8F8F]/30! bg-[#FAFAFA]!"
              >
                <PlusIcon size={20} />
              </Button>
            </Link>
          </div>
          {wallets.length === 0 ? (
            <span className="text-xs text-center px-1">Loading wallets...</span>
          ) : (
            wallets.map((wallet) => (
              <DropdownMenuItem
                className="mt-2.5 p-0 gap-2.5 cursor-pointer"
                onClick={() => {
                  setActiveWalletId(wallet.id);
                  navigate(`/wallets/${wallet.id}`);
                }}
              >
                <WalletIcon wallet_name={wallet.wallet_name} />
                <span className="text-[18px]">{wallet.wallet_name}</span>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletDropdown;
