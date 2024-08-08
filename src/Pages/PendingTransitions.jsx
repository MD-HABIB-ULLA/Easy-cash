import axios from "axios";
import { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { SyncLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

const PendingTransitions = () => {
  const { userData } = useContext(UserContext);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState("");
  const [errorMassage, setErrorMassage] = useState("");

  const {
    data: transitionsData = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["pendingTransitions"],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:4000/pendingTransitions?email=${userData.email}`
      );
      return res.data;
    },
    enabled: !!userData.email, // Only run the query if email exists
    staleTime: 0, // Data is considered stale immediately
    refetchOnWindowFocus: true, // Refetch data when the window regains focus
    refetchInterval: false, // Disable automatic refetching by interval
  });
  const reversedTransitionsData = [...transitionsData].reverse();


  const handleDelete = async (e) => {
    setDeleteLoading(true);
    e.preventDefault();
    const pin = e.target.pin.value;

    if (pin.length === 6) {
      console.log(deleteConfirmId, userData.email, pin);
      const res = await axios.delete(
        `http://localhost:4000/deletePendingTransition?email=${userData.email}&id=${deleteConfirmId}&pin=${pin}`
      );
      console.log(res.data);
      if (res.data.deletedCount) {
        e.target.reset();
        refetch();
        setDeleteLoading(false);
        const modal = document.getElementById("my_modal_3");
        if (modal) modal.close();
      }
    } else {
      setErrorMassage("Enter six digit pin");
    }
  };

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

      {!loading ? (
        <div>
          {transitionsData.length > 0 ? (
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
                                Agent details
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="text-left font-semibold">
                                Amount
                              </div>
                            </th>
                            <th className="p-2">
                              <div className="text-center font-semibold">
                                Action
                              </div>
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 text-sm">
                          {reversedTransitionsData?.map((data) => (
                            <tr
                              key={data._id}
                              className={`${
                                data.type === "cashIn"
                                  ? "bg-green-500/15"
                                  : "bg-red-500/15"
                              }`}
                            >
                              <td className="p-2">
                                <div>
                                  <div className="font-medium text-gray-800">
                                    {data.type === "cashIn" && "Cash in"}
                                    {data.type === "cashOut" && "Cash out"}
                                  </div>
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-left">
                                  {data.agentEmail
                                    ? data.agentEmail
                                    : data.phoneNumber}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-left font-medium text-green-500">
                                  {data.amount}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="flex justify-center">
                                  <button
                                    className=""
                                    onClick={() => {
                                      document
                                        .getElementById("my_modal_3")
                                        .showModal();

                                      setDeleteConfirmId(data._id);
                                    }}
                                  >
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
              No transitions pending{" "}
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-20">
          {" "}
          <SyncLoader color="#95D2B3" size={10} speedMultiplier={0.6} />
        </div>
      )}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form className="" onSubmit={handleDelete}>
            <label
              htmlFor="password-confirm"
              className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >
              Enter your pin
            </label>
            <input
              type="number"
              placeholder="Enter your pin"
              name="pin"
              className="block w-full p-3 mt-2 text-gray-700 bg-[#F1F8E8] rounded-lg appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />
            <label
              htmlFor="password-confirm"
              className="block mt-2 text-xs font-semibold text-red-500 uppercase"
            >
              {errorMassage}
            </label>
            <button
              type="submit"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase rounded-lg bg-[#95D2B3] shadow-lg focus:outline-none hover:bg-[#95D2B3] hover:shadow-none"
            >
              {deleteLoading ? (
                <SyncLoader color="#fffefe" size={10} speedMultiplier={0.6} />
              ) : (
                "Confirm"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default PendingTransitions;
