function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6 fixed">

      <h2 className="text-2xl font-bold mb-10">
        Financial Twin
      </h2>

      <ul className="space-y-4">
        <li className="hover:bg-slate-700 p-2 rounded cursor-pointer">Dashboard</li>
        <li className="hover:bg-slate-700 p-2 rounded cursor-pointer">Transactions</li>
        <li className="hover:bg-slate-700 p-2 rounded cursor-pointer">Goals</li>
        <li className="hover:bg-slate-700 p-2 rounded cursor-pointer">Simulator</li>
        <li className="hover:bg-slate-700 p-2 rounded cursor-pointer">Chatbot</li>
      </ul>

    </div>
  );
}

export default Sidebar;
