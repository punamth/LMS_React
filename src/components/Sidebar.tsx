import { NavLink, useNavigate } from "react-router-dom";
import {
  Settings,
  User,
  BookOpen,
  Users,
  ArrowLeftRight,
  Send,
  LogOut,
} from "lucide-react";

import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

const navItems = [
  { to: "/setting", label: "Setting", icon: Settings },
  { to: "/author", label: "Author", icon: User },
  { to: "/books", label: "Books", icon: BookOpen },
  { to: "/students", label: "Students", icon: Users },
  { to: "/transaction", label: "Transaction", icon: ArrowLeftRight },
  { to: "/issuing", label: "Issuing", icon: Send },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="w-64 min-h-screen bg-[#255D81] text-white flex flex-col">
      <div className="px-6 py-6 border-b border-white/10">
        <h1 className="text-2xl font-md leading-tight">
          HSMSS
          <br />
          LIBRARY
        </h1>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-8 py-3 text-md ${
                isActive
                  ? "bg-white text-[#255D81] font-semibold"
                  : "text-white/90 hover:bg-white/10"
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-5 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm text-white/90 hover:text-white transition-colors duration-150 cursor-pointer"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}