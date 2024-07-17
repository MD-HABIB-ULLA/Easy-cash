// import axios from "axios";
import UserDetailsShowingTable from "../components/UserDetailsShowingTable";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useLoadAllUser from "../Hooks/LoadAllUser";
// import { UserContext } from "../Context/UserContext";
// import { UserDataContext } from "../Context/LoadDataContext";

const AllUserList = () => {
  // const [allData, setAllData] = useState({});
  const [userData, , isPending] = useLoadAllUser();
  console.log(userData,isPending);
  // useEffect(() => {
  //   setAllData(userData);
  // }, [userData]);

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
        {!isPending && (
          <div className=" mt-10 ">
            <div className="text-xl text-[#95D2B3] text-center uppercase mb-2">
              <p>Pending users</p>
            </div>
            <UserDetailsShowingTable datas={userData.pendingUsers} />
          </div>
        )}
        {!isPending && (
          <div className=" mt-10 ">
            <div className="text-xl text-[#95D2B3] text-center uppercase mb-2">
              <p>Valid users</p>
            </div>
            <UserDetailsShowingTable datas={userData.users} />
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

// const {userData} = useContext(UserContext)
// console.log(userData)
// const axiosSecure = useAxiosSecure();
// const [loading, setLoading] = useState(true);

// const fetchData = async () => {
//   try {
//     const res = await axiosSecure.get("/alluser");
//     const data = res.data;

//     setAllData(data);
//     setLoading(false);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
// if (!loading) {
//   console.log(allData);
// }
// // Call the function to fetch data
// useEffect(() => {
//   // Call the function to fetch data when the component mounts
//   fetchData();
// }, []);
// const { allData, loading, fetch, setFetch } = useContext(UserDataContext);
