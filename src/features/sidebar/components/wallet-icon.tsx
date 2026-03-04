const WalletIcon = ({ wallet_name }: { wallet_name: string }) => {
  const fl = wallet_name[0].toUpperCase();
  const sl = wallet_name[1].toLowerCase();
  return (
    <div className="w-12.5 h-12.5 rounded-[1rem] border border-[#F0F0F0]/65 grid place-items-center text-[18px] font-semibold bg-[#6D5DFF]/10 text-[#6D5DFF]">
      {fl}
      {sl}
    </div>
  );
};

export default WalletIcon;
