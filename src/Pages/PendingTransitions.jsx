import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const PendingTransitions = () => {
  const { userData } = useContext(UserContext);
  const [transitionsData, setTransitionData] = useState(null)
  console.log(userData.email);
  useEffect(() => {
    const fetchPendingTransitions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/pendingTransitions?email=${userData.email}`
        );
        setTransitionData(res.data)
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching pending transitions:", error);
      }
    };

    if (userData && userData.email) {
      fetchPendingTransitions();
    }
  }, [userData]);

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

     {
      transitionsData ?  <div>
      <section className=" rounded-lg mt-5 px-4 text-gray-600 antialiased">
        <div className="flex h-full flex-col justify-center">
          <div className="mx-auto w-full max-w-2xl rounded-lg border border-gray-200 bg-white shadow-lg">
            

            <div className="overflow-x-auto p-3">
              <table className="w-full table-auto">
                <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                  <tr>
                    
                    <th className="p-2">
                      <div className="text-left font-semibold">
                        Transition type 
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="text-left font-semibold">Agent details</div>
                    </th>
                    <th className="p-2">
                      <div className="text-left font-semibold">Amount</div>
                    </th>
                    <th className="p-2">
                      <div className="text-center font-semibold">Action</div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-sm">
                 

                {
                  transitionsData?.map(data=>(  <tr key={data._id} className={`${data.type === "cashIn" ? "bg-green-500/15" : "bg-red-500/15"}`}>
                    <td className="p-2">
                      <div>
                        <div className="font-medium text-gray-800">
                          {data.type === "cashIn" && "Cash in"}
                          {data.type === "cashOut" && "Cash out"}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-left">{data.agentEmail ? data.agentEmail : data.phoneNumber }</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left font-medium text-green-500">
                        {data.amount}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex justify-center">
                        <button>
                          <svg
                            className="h-8 w-8 rounded-full p-1 hover:bg-gray-100 hover:text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>))
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div> : <div className="text-info text-2xl uppercase text-center mt-5 font-bold">No transitions pending </div>
     }
    </div>
  );
};

export default PendingTransitions;
