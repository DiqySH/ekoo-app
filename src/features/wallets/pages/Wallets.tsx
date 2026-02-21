import { UseWallets } from "../contexts/wallets";

const Wallets = () => {
  const { data, isLoading } = UseWallets();
  console.log(data);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="w-full min-h-screen grid place-items-center">
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold">Wallets</h1>
        <div>
          {data.map((w) => {
            return (
              <div key={w.id} className="w-75">
                {w.wallet_name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wallets;
