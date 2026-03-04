import Card from "../components/Card";
import CreateWalletForm from "../components/CreateWalletForm";

const CreateWallet = () => {
  return (
    <div className="w-full min-h-screen grid place-items-center">
      <Card className="px-5 py-7.5">
        <CreateWalletForm />
      </Card>
    </div>
  );
};

export default CreateWallet;
