import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState(true);
  localStorage.removeItem("access-token");
  const { setUserData, setLoading } = useContext(UserContext);

  const [loginWithEmail, setLoginWithEmail] = useState(true);
  const [errorMassage, setErrorMassage] = useState("");

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const phoneNumber = form.phoneNumber.value;
    const email = form.email.value;
    const pin = form.pin.value;
    const appliedRole = form.role.value;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;

    if (pin.length === 6) {
      const formData = {
        firstName,
        lastName,
        phoneNumber,
        email,
        pin,
        appliedRole,
        registrationDate: formattedDate,
      };

      try {
        const res = await axios.post(
          "http://localhost:4000/register",
          formData
        );

        if (res.data.acknowledged) {
          // localStorage.setItem("access-token", res.data.token);
          console.log(res.data);
          // Assuming you are using a modal library that requires a ref or similar to close
          const modal = document.getElementById("my_modal_3");
          if (modal) modal.close();
          toast.success(
            "Successfully created account now just wait until until user validate your profile "
          );
          form.reset();
        }
      } catch (err) {
        const modal = document.getElementById("my_modal_3");
        if (modal) modal.close();
        form.reset();
        // console.error("Error submitting form:", err.response.data);
        toast.error(err.response.data);
      }
    } else {
      setErrorMassage("Pin should be 6 digits");
    }
  };
  const handleLoginForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const phoneNumber = form.phoneNumber?.value;
    const email = form.email?.value;
    const pin = form.pin.value;
    const formData = {
      phoneNumber,
      email,
      pin,
    };
    if (pin.length === 6) {
      const formData = {
        phoneNumber,
        email,
        pin,
      };

      try {
        const res = await axios.post("http://localhost:4000/login", formData);
        console.log(res.data);
        if (res.data.email) {
          const userData = res.data;
          axios
            .post("http://localhost:4000/jwt", formData)
            .then((res) => {
              console.log(res.data);
              if (res.data.token) {
                setUserData(userData);
                localStorage.setItem("access-token", res.data.token);
                const modal = document.getElementById("my_modal_3");
                if (modal) modal.close();
                form.reset();
                toast.success("successfully logged in");
                navigate("/home");
                setLoading(false);
              }
            })
            .catch((err) => {
              console.log(err);
              toast.error(err.response.data);
            });
        }
      } catch (err) {
        const modal = document.getElementById("my_modal_3");
        if (modal) modal.close();
        form.reset();
        toast.error(err.response.data);
      }
    } else {
      setErrorMassage("Pin should be 6 digits");
    }

    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-[#F1F8E8] font-semibold flex items-center justify-center">
      <div className="text-center uppercase text-5xl ">
        Welcome to <br />{" "}
        <span className="text-[#55AD9B] text-6xl "> easy cash</span>
        <div className="flex gap-5 justify-center mt-5">
          <button
            onClick={() => {
              setRegister(true);
              document.getElementById("my_modal_3").showModal();
            }}
            className="btn bg-[#95D2B3]  font-bold capitalize hover:bg-[#95D2B3]"
          >
            Create an account{" "}
          </button>
          <button
            onClick={() => {
              setRegister(false);
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
          {register ? (
            <form onSubmit={handleRegisterForm} className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <p className="uppercase text-gray-600 ">register as a</p>
                <select
                  name="role"
                  required
                  className="select select-bordered select-sm bg-[#F1F8E8] "
                >
                  <option>user</option>
                  <option>agent</option>
                </select>
              </div>
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
            <form action="" onSubmit={handleLoginForm} className="mt-6">
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
                    name="phoneNumber"
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
                    use email
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
                placeholder="Enter your pin"
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
                Login
              </button>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default WelcomePage;
