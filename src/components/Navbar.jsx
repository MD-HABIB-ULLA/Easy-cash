
import { useContext } from 'react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { UserContext } from '../Context/UserContext';

const Navbar = () => {
  const { userData, loading } = useContext(UserContext);
    return (
        <div className="navbar  container mx-auto">
        <div className="flex-1">
          <span className="text-[#55AD9B] text-2xl uppercase font-semibold">
            {" "}
            Easy cash
          </span>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end flex gap-3 items-center ">
            <div className="text-white px-3 py-2 bg-[#95D2B3] rounded-lg flex items-center gap-4 font-bold ">
              {" "}
              <FaBangladeshiTakaSign />
              0.000
            </div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar relative"
            >
              <div className="w-10 rounded-full ">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                />
              </div>
                <span className="absolute bg-[#95D2B3] -bottom-1    px-1 text-xs text-white rounded-sm">{userData?.role}</span>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-28 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
};

export default Navbar;