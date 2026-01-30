import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  User
} from "lucide-react";

function Sidebar() {
  return (
    <div className="w-64 h-screen fixed bg-black/40 backdrop-blur-xl
      border-r border-white/10 p-6 text-white">

      {/* LOGO */}
      <h2 className="text-2xl font-bold mb-10 text-indigo-400">
        Financial Twin
      </h2>

      {/* NAV */}
      <nav className="space-y-3">

        <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/query" icon={MessageSquare} label="Query" />

      </nav>

    </div>
  );
}

/* SINGLE NAV ITEM */
function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition
        ${isActive
          ? "bg-indigo-500 text-white"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}

export default Sidebar;
