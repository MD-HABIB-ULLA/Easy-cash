
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
const UserDetailsShowingTable = ({ data }) => {
    console.log(data)
  return (
    <div>
      <div className="flex  mt-10 justify-center">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl">
            <thead>
              <tr className="bg-[#95D2B3]  text-white ">
                <th className="py-3 px-4 text-left">User Name</th>
                <th className="py-3 px-4 text-left">Applied for</th>
                <th className="py-3 px-4 text-left">Time</th>
              
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              <tr className="border-b border-blue-gray-200">
                <td className="py-3 px-4">Company A</td>
                <td className="py-3 px-4">$50.25</td>
     
                <td className="py-3 px-4">$5025.00</td>
                <td className="py-3 px-4 text-xl flex gap-3">
                  <button className="text-[#95D2B3]"><MdOutlineDone /></button>
                  <button className="text-rose-500/40"><MdOutlineDelete /></button>
                </td>
              </tr>

              <tr className="border-b border-blue-gray-200">
                <td className="py-3 px-4 font-medium">Total Wallet Value</td>
                <td className="py-3 px-4"></td>
       
                <td className="py-3 px-4 font-medium">$22525.00</td>
                <td className="py-3 px-4"></td>
              </tr>
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
  );
};

export default UserDetailsShowingTable;
