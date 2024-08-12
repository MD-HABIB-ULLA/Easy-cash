import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllTransitions = () => {
  const [transitions, setTransitions] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchTransitions = async () => {
      try {
        const res = await axiosSecure.get(
          "https://easy-cash-server.vercel.app/allTransitions"
        );
        setTransitions(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching transitions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransitions();
  }, [axiosSecure]);

  if (!loading) {
    console.log(transitions);
  }
  return (
    <div className="relative min-h-screen bg-[#F1F8E8]">
      <div>
        <p
          className="md:text-5xl text-2xl text-[#95D2B3] text-center font-semibold
                 uppercase pt-5"
        >
          all Transitions
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

      {/* table for showing all transitions  */}

      {!loading ? (
        <div className="flex mt-10  items-center justify-center pb-10 px-5 ">
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-white shadow-md rounded-xl">
              <thead>
                <tr className="bg-[#95D2B3]  text-white">
                  <th className="py-3 px-4 text-left">From</th>
                  <th className="py-3 px-4 text-left">To</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Type</th>
                </tr>
              </thead>
              <tbody className="text-blue-gray-900">
                {transitions.map((transition) => (
                  <tr
                    key={transition._id}
                    className="border-b border-blue-gray-200"
                  >
                    <td className="py-3 px-4">
                      {transition.agentEmail ||
                        transition.phoneNumber ||
                        transition.receiverEmail}
                    </td>
                    <td className="py-3 px-4">{transition.userEmail}</td>
                    <td className="py-3 px-4">{transition.amount}</td>
                    <td className="py-3 px-4">{transition.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center mt-20">
          {" "}
          <SyncLoader color="#95D2B3" size={10} speedMultiplier={0.6} />
        </div>
      )}
    </div>
  );
};

export default AllTransitions;
