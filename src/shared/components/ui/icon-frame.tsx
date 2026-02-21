import { Link } from "react-router";

const IconFrame = () => {
  return (
    <Link to="/">
      <button
        className="w-12.5 h-12.5 grid place-items-center border-[1.1px] bold-outline rounded-[16.45px]"
        style={{
          background:
            "linear-gradient(217.84deg, #FEFFFE 66.45%, #3F9268 173.05%)",
        }}
      >
        <img src="/ekoo-icon.svg" alt="" className="max-w-[27.5px] w-full" />
      </button>
    </Link>
  );
};

export default IconFrame;
