import axios from "axios";
import { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { UserContext } from "../Context/UserContext";
import toast from "react-hot-toast";

const CashIn = () => {
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [cashInWithEmail, setCashInWithEmail] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [agentDetails, setAgentDetails] = useState(null);
  const [errorMassage, setErrorMassage] = useState("");

  console.log(userData);
  const loadAllAgentDetails = async () => {
    setDetailsLoading(true);
    const res = await axios.get("http://localhost:4000/allAgent");
    setAgentDetails(res.data);
    setDetailsLoading(false);
  };
  const handleCashIn = async (e) => {
    setLoading(true)
    e.preventDefault();
    const form = e.target;
    const agentEmail = form.elements.email ? form.elements.email.value : "";
    const phoneNumber = form.elements.phoneNumber
      ? form.elements.phoneNumber.value
      : "";
    const amount = parseFloat(form.elements.amount.value);
    if (amount > 5000) {
      setErrorMassage("Your cash in amount above 5000 tk at a time.");
      setLoading(false)
      return; // Stop further processing if the amount is too high
    }

    const cashInData = {
      userEmail: userData.email,
      agentEmail,
      phoneNumber,
      amount,
      type: "cashIn",
    };
    try {
      const res = await axios.post("http://localhost:4000/cashIn", cashInData);
      console.log(res.data);

      if (res.data.acknowledged) {
        e.target.reset();
        setLoading(false)
        setErrorMassage("")
        toast.success("Wait until agent approves");
      } else {
        // Handle cases where the response is successful but acknowledged is false (if applicable)
        toast.error("Request not acknowledged. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Specific error handling for 400 status code (e.g., user already has a cash-in request)
        e.target.reset();
        setLoading(false)
        toast.error(error.response.data.error);
      } else {
        // General error handling for other errors
        e.target.reset();

        toast.error(
          "An error occurred during the cash-in operation. Please try again later."
        );
      }
      console.error("Error during cash-in operation:", error);
    }

    console.log(cashInData);
  };

  return (
    <div className="relative min-h-screen bg-[#F1F8E8]">
      <div>
        <p
          className="text-5xl text-[#95D2B3] text-center font-semibold
                 uppercase pt-5"
        >
          Cash in
        </p>
      </div>


      {/* agent details ---------------- */}
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
      <div className="flex justify-center">
        <h1
          onClick={() => {
            if (!showDetails) {
              loadAllAgentDetails();
            }
            setShowDetails(!showDetails);
          }}
          className="text-info rounded-lg mt-5 text-xl px-2 py-1 bg-gray-300/15 text-center font-bold capitalize cursor-pointer"
        >
          {showDetails ? "hide agent  details " : "Show all agent Details"}{" "}
        </h1>
      </div>
      <div className={`${showDetails ? "block" : "hidden"}`}>
        {detailsLoading ? (
          <div className="flex justify-center items-center mt-20">
            {" "}
            <SyncLoader color="#95D2B3" size={10} speedMultiplier={0.6} />
          </div>
        ) : (
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className=" flex justify-center  align-middle sm:px-6 lg:px-8 px-5">
                  <div className="w-2/3 flex justify-center p-2 rounded-lg bg-gray-50 overflow-x-auto">
                    <table className=" divide-y rounded-lg w-full  divide-gray-300">
                      <thead>
                        <tr className="">
                          <th
                            scope="col"
                            className="text-center py-3.5 pl-4 pr-3  text-sm font-semibold text-black sm:pl-0"
                          >
                            Name
                          </th>

                          <th
                            scope="col"
                            className="px-3 py-3.5  text-sm font-semibold text-orange-500 text-center"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-center  text-sm font-semibold text-blue-500"
                          >
                            Phone no.
                          </th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {agentDetails?.map((details) => (
                          <tr key={details._id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-center">
                              {details.firstName} {details.lastName}
                            </td>

                            <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-black">
                              {details.email}
                            </td>
                            <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-black">
                              {details.phoneNumber}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


      {/* cash in form  */}
      <div className="flex items-center justify-center mt-5">
        <form
          action=""
          onSubmit={handleCashIn}
          className="mt-6 w-2/4 bg-white p-2 rounded-lg"
        >
          {cashInWithEmail ? (
            <>
              {" "}
              <label
                htmlFor="email"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                Agent E-mail
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="john.doe@company.com"
                autoComplete="email"
                className="block w-full p-3 mt-2 text-gray-700 bg-[#F1F8E8] rounded-lg appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
              <label
                onClick={() => setCashInWithEmail(false)}
                htmlFor="email"
                className="block mt-2 text-xs font-semibold cursor-pointer text-right text-info  uppercase"
              >
                use number
              </label>
            </>
          ) : (
            <>
              <label
                htmlFor="phone number"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                Agent phone number
              </label>
              <input
                id="password"
                type="number"
                name="phoneNumber"
                placeholder="Enter a valid phone number"
                autoComplete="new-password"
                className="block w-full p-3 mt-2 text-gray-700 bg-[#F1F8E8] rounded-lg appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
              <label
                onClick={() => setCashInWithEmail(true)}
                htmlFor="email"
                className="block mt-2 text-xs font-semibold cursor-pointer text-right text-info  uppercase"
              >
                use email
              </label>
            </>
          )}

          <label
            htmlFor="password-confirm"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            enter amount
          </label>
          <input
            type="number"
            name="amount"
            placeholder="Enter cash in amount "
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
            {loading ? (
              <SyncLoader color="#fffefe" size={10} speedMultiplier={0.6} />
            ) : (
              "cash in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CashIn;
