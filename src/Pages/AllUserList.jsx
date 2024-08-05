import UserDetailsShowingTable from "../components/UserDetailsShowingTable";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import useLoadAllUser from "../Hooks/LoadAllUser";
import { SyncLoader } from "react-spinners";

const AllUserList = () => {
  const [userData, , isPending] = useLoadAllUser();
  console.log(userData, isPending);

  return (
    <div className="relative">
      <div className="min-h-screen bg-[#F1F8E8]">
        <div>
          <p
            className="text-5xl text-[#95D2B3] text-center font-semibold
                 uppercase pt-5"
          >
            all user
          </p>
        </div>
        {!isPending ? (
          <div>
            {!isPending && (
              <div className=" mt-10 ">
                <div className="text-xl text-[#95D2B3] text-center uppercase mb-2">
                  <p>Pending users</p>
                </div>
                <UserDetailsShowingTable datas={userData.pendingUsers} />
              </div>
            )}
            {!isPending && (
              <div className=" mt-10 pb-10 ">
                <div className="text-xl text-[#95D2B3] text-center uppercase mb-2">
                  <p>Valid users</p>
                </div>
                <UserDetailsShowingTable datas={userData.users} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-20">
            {" "}
            <SyncLoader color="#95D2B3" size={10} speedMultiplier={0.6} />
          </div>
        )}
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

export default AllUserList;
