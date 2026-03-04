import { Loading } from "@/shared/components/ui";
import { useGlobalStore } from "@/store/use-global-store";

const Wallets = () => {
  const wallets = useGlobalStore((state) => state.wallets);

  if (wallets.length === 0) return <Loading />;

  return (
    <div className="w-full min-h-screen grid place-items-center">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold">Wallets</h1>
        <div>
          {wallets.map((w) => (
            <div key={w.id} className="w-75">
              {w.wallet_name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallets;
