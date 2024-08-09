import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { SyncLoader } from "react-spinners";
import { MdOutlineDelete, MdOutlineDone } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const TransactionManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { userData, setUserData } = useContext(UserContext);
  const [errorMassage, setErrorMassage] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const [approveId, setApproveId] = useState("");

  //   fetch the data
  const {
    data: transitionsData = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["pendingTransitions"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/agentPendingTransactions?email=${userData.email}&phoneNumber=${userData.phoneNumber}`
      );
      return res.data;
    },
    enabled: !!userData.email, // Only run the query if email exists
    // Disable automatic refetching by interval
  });

  // Use useEffect to refetch data when the component mounts

  const reversedTransitionsData = transitionsData.reverse();

  //   handle approve and delete button
  const handleApproveBtn = async (e) => {
    setApproveLoading(true);
    e.preventDefault();
    const pin = e.target.pin.value;
    if (pin.length !== 6) {
      setErrorMassage("PIN must be six digits");
      setApproveLoading(false);
      return;
    }
    const email = userData.email;
    const approveData = {
      pin,
      email,
      approveId,
    };
    try {
      const res = await axiosSecure.post("/agentApprove", approveData);
      console.log(res.data);
      if (res.data.deletedCount) {
        setApproveLoading(false);
        const currentUserData = { email: userData.email, pin };
        const loginRes = await axios.post(
          "https://easy-cash-server.vercel.app/login",
          currentUserData
        );
        setUserData(loginRes.data);
        if (loginRes.data) {
          e.target.reset();
          refetch();
          toast.success("Approved");
        }
      }
    } catch (error) {
      console.log(error);
      setApproveLoading(false);
    }
  };

  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    setDeleteLoading(true);

    const pin = e.target.pin.value;

    if (pin.length !== 6) {
      setErrorMassage("PIN must be six digits");
      setDeleteLoading(false);
      return;
    }

    console.log(deletedId, userData.email, pin);
    const res = await axios.delete(
      `https://easy-cash-server.vercel.app/deletePendingTransition?email=${userData.email}&id=${deletedId}&pin=${pin}`
    );
    console.log(res.data);
    if (res.data.deletedCount) {
      e.target.reset();
      refetch();
      setDeleteLoading(false);
      const modal = document.getElementById("my_modal_3");
      if (modal) modal.close();
    }
    const email = userData.email;

    setDeleteLoading(false); // Move this to after the async operation if applicable
    console.log(pin, email, deletedId);
  };

  //   console.log(reversedTransitionsData);
  return (
    <div className="relative min-h-screen bg-[#F1F8E8] pb-10">
      <div>
        <p
          className="text-4xl text-[#95D2B3] text-center font-semibold
                   uppercase pt-5"
        >
          Transaction Management{" "}
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

      {reversedTransitionsData.length > 0 ? (
        <div>
          {" "}
          {!loading ? (
            <div className="flex justify-center mt-10">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-xl">
                  <thead>
                    <tr className="bg-[#95D2B3]  text-white ">
                      <th className="py-3 px-4 text-left">Requestor</th>
                      <th className="py-3 px-4 text-left">Request for</th>
                      <th className="py-3 px-4 text-left">Amount</th>
                      <th className="py-3 px-4 text-left">Action</th>
                    </tr>
                  </thead>
                  {reversedTransitionsData.map((data) => (
                    <tbody key={data._id} className="text-blue-gray-900">
                      <tr className="border-b border-blue-gray-200">
                        <td className="py-3 px-4">{data.userEmail}</td>
                        <td className="py-3 px-4">{data.type}</td>
                        <td className="py-3 px-4">{data.amount}</td>

                        <td className="py-3 px-4 text-xl flex gap-3">
                          <button
                            onClick={() => {
                              setApproveId(data._id);
                              document.getElementById("my_modal_3").showModal();
                            }}
                            className="text-[#95D2B3]"
                          >
                            <MdOutlineDone />
                          </button>
                          <button
                            onClick={() => {
                              setDeletedId(data._id);
                              document.getElementById("my_modal_4").showModal();
                            }}
                            className="text-rose-500/40"
                          >
                            <MdOutlineDelete />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
              <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <form className="" onSubmit={handleApproveBtn}>
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
                      {approveLoading ? (
                        <SyncLoader
                          color="#fffefe"
                          size={10}
                          speedMultiplier={0.6}
                        />
                      ) : (
                        "Confirm"
                      )}
                    </button>
                  </form>
                </div>
              </dialog>
              <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <form className="" onSubmit={handleConfirmDelete}>
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
                        <SyncLoader
                          color="#fffefe"
                          size={10}
                          speedMultiplier={0.6}
                        />
                      ) : (
                        "Confirm"
                      )}
                    </button>
                  </form>
                </div>
              </dialog>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-20">
              {" "}
              <SyncLoader color="#95D2B3" size={10} speedMultiplier={0.6} />
            </div>
          )}
        </div>
      ) : (
        <div className="text-info text-2xl uppercase text-center mt-5 font-bold">
          No transitions pending{" "}
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;
