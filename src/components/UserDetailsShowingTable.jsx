import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import useLoadAllUser from "../Hooks/LoadAllUser";
const UserDetailsShowingTable = ({ datas }) => {
  console.log(datas);
  const [, refetch, ] = useLoadAllUser();
  const handleApproveBtn = (id) => {
    console.log(id)
  }
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
                  {/* {data.appliedRole && (
                    <td className="py-3 px-4">{data.appliedRole || "user"}</td>
                  )}
                  {data.role && (
                    <td className="py-3 px-4">{data.role || "user"}</td>
                  )} */}

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
                      <button onClick={()=> handleApproveBtn(data._id)} className="text-[#95D2B3]">
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
      </div>
    </div>
  );
};

export default UserDetailsShowingTable;
