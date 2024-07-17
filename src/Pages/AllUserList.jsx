import axios from "axios";
import UserDetailsShowingTable from "../components/UserDetailsShowingTable";
import { FaHome } from "react-icons/fa";

const AllUserList = () => {
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/alluser");
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call the function to fetch data
  fetchData();
  return (
    <div className="relative">
      <div className="min-h-screen bg-[#F1F8E8]">
        <p
          className="text-5xl text-[#95D2B3] text-center font-semibold
                 uppercase pt-5"
        >
          all user
        </p>
        <UserDetailsShowingTable />
      </div>
      <div className="absolute top-7 left-7">
        <div className="flex items-center justify-center">
          <div className="  text-2xl text-[#95D2B3] p-2 border border-[#95D2B3] rounded-full">
            <FaHome />
          </div>
        </div>
        <p>home page</p>
      </div>
    </div>
  );
};

export default AllUserList;
