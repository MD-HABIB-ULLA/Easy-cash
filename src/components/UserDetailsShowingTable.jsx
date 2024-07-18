import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import useLoadAllUser from "../Hooks/LoadAllUser";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const UserDetailsShowingTable = ({ datas }) => {
  const axiosSecure = useAxiosSecure();
  const [deletedId, setDeletedId] = useState("");
  const [errorMassage, setErrorMassage] = useState("");
  const { userData, loading } = useContext(UserContext);

  const [, refetch] = useLoadAllUser();
  const handleApproveBtn = async (e) => {
    e.preventDefault();
    const pin = e.target.pin.value;
    console.log(deletedId, pin);
    const modal = document.getElementById("my_modal_3");
    if (modal) modal.close();
    if (pin.length === 6) {
      const res = await axiosSecure.delete(
        `/approve?id=${deletedId}&pin=${pin}`
      );
      console.log(res.data)
    } else {
      setErrorMassage("Pin should be 6 digits");
    }
  };
  return (
    <div>
      <div className="flex justify-center">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl">
            <thead>
              <tr className="bg-[#95D2B3]  text-white ">
                <th className="py-3 px-4 text-left">User Name</th>
                <th className="py-3 px-4 text-left">User email</th>
                <th className="py-3 px-4 text-left">Applied for</th>
                <th className="py-3 px-4 text-left">Data</th>
                {datas && datas[1] && !datas[1].role && (
                  <th className="py-3 px-4 text-left">Action</th>
                )}
              </tr>
            </thead>
            {datas.map((data) => (
              <tbody key={data.email} className="text-blue-gray-900">
                <tr className="border-b border-blue-gray-200">
                  <td className="py-3 px-4">
                    {data.firstName} {data.lastName}
                  </td>
                  <td className="py-3 px-4">{data.email}</td>

                  {data.role ? (
                    <td className="py-3 px-4">{data.role || "user"}</td>
                  ) : (
                    <td className="py-3 px-4">{data.appliedRole || "user"}</td>
                  )}

                  <td className="py-3 px-4">
                    {data.registrationDate
                      ? data.registrationDate
                      : "16/7/2024"}
                  </td>
                  {!data.role && (
                    <td className="py-3 px-4 text-xl flex gap-3">
                      <button
                        onClick={() => {
                          setDeletedId(data._id);
                          document.getElementById("my_modal_3").showModal();
                        }}
                        className="text-[#95D2B3]"
                      >
                        <MdOutlineDone />
                      </button>
                      <button className="text-rose-500/40">
                        <MdOutlineDelete />
                      </button>
                    </td>
                  )}
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
                Confirm
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default UserDetailsShowingTable;
