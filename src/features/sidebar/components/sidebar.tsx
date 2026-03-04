import IconFrame from "../../../shared/components/ui/icon-frame";
import WalletDropdown from "./wallet-dropdown";

export const Sidebar = () => {
  return (
    <div className="max-w-20.5 w-full bg-[#FAFAFA] border bold-outline flex-col items-center pt-5 gap-4 h-screen fixed left-0 top-0 sm:flex hidden">
      <div className="flex flex-col gap-6">
        <IconFrame />
        <WalletDropdown />
      </div>
    </div>
  );
};
