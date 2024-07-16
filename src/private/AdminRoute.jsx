import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext, useEffect } from "react";

const AdminRoute = ({ children }) => {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData) {
            navigate("/");
        }
    }, [userData, navigate]);

    if (!userData) {
        return null; // or a loading indicator
    }

    if (userData.role !== "admin") {
        navigate("/");
        return null; // or a "not authorized" message
    }

    return children;
};

export default AdminRoute;
