import axios from "axios";

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
    <div>
      <div className="min-h-screen bg-[#F1F8E8]">
        <p
          className="text-5xl text-[#95D2B3] text-center font-semibold
                 uppercase pt-5"
        >
          all user
        </p>
      </div>
    </div>
  );
};

export default AllUserList;
