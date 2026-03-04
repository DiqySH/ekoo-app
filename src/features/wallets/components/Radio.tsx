import type { RadioState } from "../types";

const Radio = ({ status }: { status: RadioState }) => (
  <div
    className={`w-4.5 h-4.5 rounded-full border bg-[#FAFAFA] ${status == "active" ? "border-[#228D57] border-4" : "border-[#8F8F8F]/30"}`}
  />
);

export default Radio;
