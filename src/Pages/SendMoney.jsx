import { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { UserContext } from "../Context/UserContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const SendMoney = () => {
  const [sendMoneyEmail, setSendMoneyEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");

  const { userData } = useContext(UserContext);
  const axiosSecure = useAxiosSecure();

  const handleSendMoney = async (e) => {
    // setLoading(true);
    e.preventDefault();
    const form = e.target;
    const receiverEmail = form.elements.email ? form.elements.email.value : "";
    const phoneNumber = form.elements.phoneNumber
      ? form.elements.phoneNumber.value
      : "";
    const pin = form.elements.pin.value;

    const amount = parseFloat(form.elements.amount.value);
    if (amount > userData.balance) {
      setErrorMassage("you don't have sufficient balance");
      setLoading(false);
      return; // Stop further processing if the amount is too high
    }
    if (pin.length > 6) {
      setErrorMassage("pin must be six digit");
      setLoading(false);
      return; // Stop further processing if the amount is too high
    }
    const sendMoneyData = {
      userEmail: userData.email,
      receiverEmail,
      phoneNumber,
      amount,
      pin,
      type: "sendMoney",
    };
    console.log(sendMoneyData);
    const res = await axiosSecure.post(
      "http://localhost:4000/sendMoney",
      sendMoneyData
    );
    console.log(res.data);
  };
  return (
    <div className="relative min-h-screen bg-[#F1F8E8]">
      <div>
        <p
          className="text-5xl text-[#95D2B3] text-center font-semibold
                   uppercase pt-5"
        >
          Send Money
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

      <div className="flex items-center justify-center mt-5">
        <form
          action=""
          onSubmit={handleSendMoney}
          className="mt-6 w-2/4 bg-white p-2 rounded-lg"
        >
          {sendMoneyEmail ? (
            <>
              {" "}
              <label
                htmlFor="email"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                Receiver E-mail
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
                onClick={() => setSendMoneyEmail(false)}
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
                Receiver phone number
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
                onClick={() => setSendMoneyEmail(true)}
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
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            enter your pin
          </label>
          <input
            type="number"
            name="pin"
            placeholder="Enter pin "
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
            className="w-full py-3 mt-6 font-bold tracking-widest text-white uppercase rounded-lg bg-[#95D2B3] shadow-lg focus:outline-none hover:bg-[#95D2B3] hover:shadow-none"
          >
            {loading ? (
              <SyncLoader color="#fffefe" size={10} speedMultiplier={0.6} />
            ) : (
              "Send money"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;
