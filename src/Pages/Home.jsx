import AdminHomePage from "../components/AdminHomePage";
import AgentHomePage from "../components/AgentHomePage";
import UserPageContent from "../components/HomePageContent";
import Navbar from "../components/Navbar";

const Home = () => {
  const role = "admin";
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
