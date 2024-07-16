import { useContext, useEffect } from "react";
import AdminHomePage from "../components/AdminHomePage";
import AgentHomePage from "../components/AgentHomePage";
import UserPageContent from "../components/HomePageContent";
import Navbar from "../components/Navbar";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { userData, loading } = useContext(UserContext);
  
  useEffect(() => {
    if (userData === undefined || userData === null) {
      navigate("/");
    }
  }, [userData, navigate]);
  const role = userData?.role
  // console.log(userData)
if(loading){
  return <div>loading...</div>
}
  return (
    <div className="bg-[#F1F8E8] min-h-screen">
      <Navbar />
      {role === "user" && <UserPageContent />}
      {role === "agent" && <AgentHomePage />}
      {role === "admin" && <AdminHomePage />}
    </div>
  );
};

export default Home;
