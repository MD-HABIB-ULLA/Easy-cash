const UserPageContent = () => {
  return (
    <div className="container grid lg:grid-cols-3 md:grid-cols-1 mx-auto gap-4 mt-4 px-3">
      <div className="bg-[#55AD9B]/50 text-2xl px-3 rounded-lg py-3 flex items-center  cursor-pointer justify-between">
        <span className="text-white font-semibold text-4xl  uppercase">Cash in</span>
        <img src="https://i.ibb.co/nfPm8J6/cash.png" className="h-28" alt="" />
      </div>
      <div className="bg-rose-500/50 text-2xl px-3 rounded-lg cursor-pointer py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-4xl uppercase">Cash out</span>
        <img src="https://i.ibb.co/xLqY5zw/cash-withdrawal.png" className="h-28" alt="" />
      </div>
      <div className="bg-yellow-500/50 text-2xl px-3 cursor-pointer rounded-lg py-3 flex items-center justify-between">
        <span className="text-white font-semibold text-4xl uppercase">Send money</span>
        <img src="https://i.ibb.co/CtLth3N/send-money.png" className="h-28" alt="" />
      </div>
      <div className="bg-blue-500/50 lg:col-span-3 text-2xl px-3 rounded-lg py-3 flex cursor-pointer items-center justify-between">
        <span className="text-white font-semibold text-4xl uppercase">Transactions History</span>
        <img src="https://i.ibb.co/xSyqzrL/transaction.png" className="h-28 mr-3" alt="" />
      </div>
   
    </div>
  );
};

export default UserPageContent;
//  
// 
// 
// https://i.ibb.co/kD06BfQ/21023024-removebg-preview.png