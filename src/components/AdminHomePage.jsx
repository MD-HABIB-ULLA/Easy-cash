import { Link } from "react-router-dom";

const AdminHomePage = () => {
  return (
    <div className="mt-4 grid lg:grid-cols-2 grid-cols-1 container mx-auto gap-4 px-3">
      <Link to={"/allusers"} className="bg-yellow-500/50 text-2xl px-3 rounded-lg py-3 flex cursor-pointer items-center justify-between">
        <span className="text-white font-semibold text-4xl uppercase">
          User Management
        </span>
        <img
        src="https://i.ibb.co/6sd0BNw/management-1.png"
          className="h-28 mr-3"
          alt=""
        />
      </Link>
      <div className="bg-blue-500/50  text-2xl px-3 rounded-lg py-3 flex cursor-pointer items-center justify-between">
        <span className="text-white font-semibold text-4xl uppercase">
         ALL Transactions History
        </span>
        <img
            src="https://i.ibb.co/Ct7MvtM/management-2.png"
          className="h-28 mr-3"
          alt=""
        />
      </div>
    </div>
  );
};

export default AdminHomePage;

