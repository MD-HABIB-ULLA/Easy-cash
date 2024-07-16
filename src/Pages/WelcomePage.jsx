import { useState } from "react";

const WelcomePage = () => {
  const [login, setLogin] = useState(true);
  const [loginWithEmail, setLoginWithEmail] = useState(true);
  const [errorMassage, setErrorMassage] = useState("");

  const handleLoginForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const email = form.email.value;
    const pin = form.pin.value;
    console.log(pin.length);
    if (pin.length === 6) {
      const formData = {
        firstName,
        lastName,
        phoneNumber,
        email,
        pin,
      };
      console.log(formData);
      document.getElementById("my_modal_3").close();
    } else {
      setErrorMassage("Pin should be 6 digit");
    }
  };
  console.log(login);
  return (
    <div className="min-h-screen bg-[#F1F8E8] font-semibold flex items-center justify-center">
      <div className="text-center uppercase text-5xl ">
        Welcome to <br />{" "}
        <span className="text-[#55AD9B] text-6xl "> easy cash</span>
        <div className="flex gap-5 justify-center mt-5">
          <button
            onClick={() => {
              setLogin(true);
              document.getElementById("my_modal_3").showModal();
            }}
            className="btn bg-[#95D2B3]  font-bold capitalize hover:bg-[#95D2B3]"
          >
            Create an account{" "}
          </button>
          <button
            onClick={() => {
              setLogin(false);
              document.getElementById("my_modal_3").showModal();
            }}
            className="btn bg-transparent border-2 border-[#95D2B3] capitalize hover:bg-[#95D2B3] duration-500"
          >
            Log in your account{" "}
          </button>
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {login ? (
            <form onSubmit={handleLoginForm} className="mt-6">
              <div className="flex justify-between gap-3">
                <span className="w-1/2">
                  <label
                    htmlFor="firstname"
                    className="block text-xs font-semibold text-gray-600 uppercase"
                  >
                    Firstname
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    autoComplete="given-name"
                    className="block w-full p-3 mt-2 text-gray-700 bg-[#F1F8E8] rounded-lg appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                  />
                </span>
                <span className="w-1/2">
                  <label
                    htmlFor="lastname"
                    className="block text-xs font-semibold text-gray-600 uppercase"
                  >
                    Lastname
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    autoComplete="family-name"
                    className="block w-full p-3 mt-2 text-gray-700 bg-[#F1F8E8] rounded-lg appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                  />
                </span>
              </div>
              <label
                htmlFor="email"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                E-mail
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
                htmlFor="password"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                phone number
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
                htmlFor="password-confirm"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                enter a 6 digit pin
              </label>
              <input
                type="number"
                placeholder="Enter a strong pin"
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
                crate account
              </button>
            </form>
          ) : (
            <form action="" className="mt-6">
              {loginWithEmail ? (
                <>
                  {" "}
                  <label
                    htmlFor="email"
                    className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
                  >
                    E-mail
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
                    onClick={() => {
                      setLoginWithEmail(false);
                    }}
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
                    phone number
                  </label>
                  <input
                    id="password"
                    type="number"
                    name="number"
                    placeholder="Enter a valid phone number"
                    autoComplete="new-password"
                    className="block w-full p-3 mt-2 text-gray-700 bg-[#F1F8E8] rounded-lg appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                    required
                  />
                  <label
                    onClick={() => {
                      setLoginWithEmail(true);
                    }}
                    htmlFor="email"
                    className="block mt-2 text-xs font-semibold cursor-pointer text-right text-info  uppercase"
                  >
                    use eamil
                  </label>
                </>
              )}

              <label
                htmlFor="password-confirm"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                enter a 6 digit pin
              </label>
              <input
                type="number"
                name="pin"
                placeholder="Enter a strong pin"
                className="block w-full p-3 mt-2 text-gray-700 bg-[#F1F8E8] rounded-lg appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
              <button
                type="submit"
                className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase rounded-lg bg-[#95D2B3] shadow-lg focus:outline-none hover:bg-[#95D2B3] hover:shadow-none"
              >
                crate account
              </button>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default WelcomePage;



