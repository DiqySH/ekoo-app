export type WalletItem = {
  id: string;
  wallet_name: string;
  users_id: string;
};

export type Wallet = {
  id: string;
  wallet_name: string;
  owner_id: string;
  users_id: string;
  created_at: Date;
  updated_at: Date;
};
