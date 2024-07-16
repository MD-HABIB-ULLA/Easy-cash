// src/context/AppContext.js
import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create a Context
export const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
