import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const AgentTransaction = () => {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [transactionData, setTransactionsData] = useState(null);
  const axiosSecure = useAxiosSecure();
  console.log(transactionData);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(
          `/agentTransaction?email=${userData.email}&phoneNumber=${userData.phoneNumber}`
        );
        setTransactionsData(res.data.reverse());
        // console.log(res);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        // Optionally handle the error, e.g., set an error state or show a toast message
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [axiosSecure, userData]);
  return  <div className="relative min-h-screen bg-[#F1F8E8] pb-10">
  <div>
    <p
      className="md:text-5xl text-3xl text-[#95D2B3] text-center font-semibold
               uppercase pt-5"
    >
      Transactions
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

  {!loading ? (
    <div>
      {transactionData.length > 0 ? (
        <div>
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
                          <div className="text-left font-semibold">
                            Receiver details
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="text-left font-semibold">
                            Agent details
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="text-left font-semibold">
                            Amount
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="text-left font-semibold">fee</div>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 text-sm">
                      {transactionData?.map((data) => (
                        <tr
                          key={data._id}
                          className={`${
                            data.type === "cashIn"
                              ? "bg-red-500/15"
                              : data.type === "sendMoney"
                              ? "bg-yellow-500/15"
                              : "bg-green-500/15"
                          }`}
                        >
                          <td className="p-2">
                            <div>
                              <div className="font-medium text-gray-800">
                                {data.type === "cashIn" && "Cash in"}
                                {data.type === "cashOut" && "Cash out"}
                                {data.type === "sendMoney" && "Send Money"}
                              </div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-left">
                              {data.userEmail
                                ? data.userEmail
                                : data.phoneNumber}
                            </div>
                          </td>
                          <td className="p-2">
                            {data.type === "cashOut" ||
                            data.type === "cashIn" ? (
                              <div className="text-left">
                                {data.agentEmail
                                  ? data.agentEmail
                                  : data.phoneNumber}
                              </div>
                            ) : (
                              "    -    "
                            )}
                          </td>
                          <td className="p-2">
                            <div
                              className={`text-left font-medium ${
                                data.type === "cashIn"
                                  ? "text-red-500"
                                  : "text-green-500"
                              } `}
                            >
                              {data.amount}
                            </div>
                          </td>
                          <td className="p-2">
                            <div
                              className={`text-left font-medium  text-green-500 ${
                                data.fee && "text-green-500"
                              } `}
                            >
                              {data.fee ? data.fee : 0}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="text-info text-2xl uppercase text-center mt-5 font-bold">
          No transitions{" "}
        </div>
      )}
    </div>
  ) : (
    <div className="flex justify-center items-center mt-20">
      {" "}
      <SyncLoader color="#95D2B3" size={10} speedMultiplier={0.6} />
    </div>
  )}
</div>;
};

export default AgentTransaction;
