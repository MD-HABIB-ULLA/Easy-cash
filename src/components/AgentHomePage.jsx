import { Link } from "react-router-dom";

const AgentHomePage = () => {
  return (
    <div className="mt-4 grid lg:grid-cols-2 grid-cols-1 container mx-auto gap-4 px-3">
      <Link to={"/transactionManagement"} className="bg-yellow-500/50 text-2xl px-3 rounded-lg py-3 flex cursor-pointer items-center justify-between">
        <span className="text-white font-semibold text-4xl uppercase">
        Transaction Management
        </span>
        <img
          src="https://i.ibb.co/w05rB57/report.png"
          className="h-28 mr-3"
          alt=""
        />
      </Link>
      <Link to={"/agentTransaction"} className="bg-blue-500/50  text-2xl px-3 rounded-lg py-3 flex cursor-pointer items-center justify-between">
        <span className="text-white font-semibold text-4xl uppercase">
          Transactions History
        </span>
        <img
          src="https://i.ibb.co/xSyqzrL/transaction.png"
          className="h-28 mr-3"
          alt=""
        />
      </Link>
    </div>
  );
};

export default AgentHomePage;
