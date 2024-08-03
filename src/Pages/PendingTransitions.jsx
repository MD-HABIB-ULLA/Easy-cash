import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const PendingTransitions = () => {
  return (
    <div className="relative min-h-screen bg-[#F1F8E8]">
      <div>
        <p
          className="text-5xl text-[#95D2B3] text-center font-semibold
                   uppercase pt-5"
        >
          pending transitions
        </p>
      </div>
      <div className="absolute top-7 left-7">
        <div className="flex items-center justify-center">
          <Link
            to={"/home"}
            className="  text-2xl text-[#95D2B3] p-2 border border-[#95D2B3] rounded-full"
          >
            <FaHome />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PendingTransitions;
