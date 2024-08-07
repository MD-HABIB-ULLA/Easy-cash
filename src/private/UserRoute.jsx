import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const UserRoute =({children}) => {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("access-token");


    useEffect(() => {
        if (!userData || !token) {
            navigate("/");
        }
    }, [userData, navigate, token]);

    if (!userData) {
        return null; // or a loading indicator
    }

    if (userData.role !== "user" ) {
        navigate("/");
        return null; // or a "not authorized" message
    }

    return children;
};

export default UserRoute;