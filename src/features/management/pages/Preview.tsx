import ChartDemo from "../components/chart-demo";
import { useManagement } from "../contexts/management";

const Preview = () => {
  const { data } = useManagement();
  return (
    <div className="w-full min-h-screen flex flex-col">
      <h1 className="text-4xl">
        {data?.wallet_name} {">"} Preview
      </h1>
      <ChartDemo />
    </div>
  );
};

export default Preview;
