import { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const AgentRoute = ({children}) => {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("access-token");

    useEffect(() => {
        if (!userData) {
            navigate("/");
        }
    }, [userData, navigate]);

    if (!userData) {
        return null; // or a loading indicator
    }

    if (userData.role !== "agent" || !token) {
        navigate("/");
        return null; // or a "not authorized" message
    }

    return children;
};

export default AgentRoute;