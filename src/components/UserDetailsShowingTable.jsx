import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import useLoadAllUser from "../Hooks/LoadAllUser";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
const UserDetailsShowingTable = ({ datas }) => {
  const [deletedId, setDeletedId] = useState("");
  console.log(deletedId)
  const { userData, loading } = useContext(UserContext);
  // console.log(userData);
  // console.log(datas);
  const [, refetch] = useLoadAllUser();
  const handleApproveBtn = (id) => {
    console.log(id);
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
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default UserDetailsShowingTable;
