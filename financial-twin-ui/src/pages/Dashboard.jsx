import Sidebar from "../pages/Sidebar";
import StatCard from "../pages/StatCard";

function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-4 gap-6">
          <StatCard title="Balance" value="₹45,000" />
          <StatCard title="Monthly Income" value="₹30,000" />
          <StatCard title="Monthly Expense" value="₹18,500" />
          <StatCard title="Savings" value="₹11,500" />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
