import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { registerUser } from "../features/auth/authSlice";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, error, message } = useAppSelector((state) => state.auth);

  const [user_name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ user_name, email, password }));
  };

  useEffect(() => {
    if (status === "succeeded" && message) {
      const timer = window.setTimeout(() => navigate("/login"), 1200);
      return () => window.clearTimeout(timer);
    }
  }, [message, navigate, status]);

  const loading = status === "loading";

  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden lg:flex lg:w-1/2 bg-[#255D81] rounded-r-[3rem] items-center justify-center px-8">
        <div className="flex flex-col items-center text-center max-w-sm">
          <img src="/book_two.png" alt="Library logo" className="w-48 h-48 mb-4 opacity-80" />
          <h2 className="text-3xl font-bold text-white leading-tight">
            HSMSS
            <br />
            Library
          </h2>
          <p className="text-white/80 text-sm mt-6">Already have an account?</p>
          <p className="text-white font-semibold text-sm">Login Now</p>

          <Link
            to="/login"
            className="mt-6 px-8 py-3 rounded-full bg-white text-[#255D81] text-sm font-semibold hover:bg-slate-100 transition-all duration-200"
          >
            Log In
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center text-center mb-8">
            <img src="/book_one.png" alt="Library logo" className="w-64 h-64" />
            <h1 className="text-2xl font-bold text-slate-900">
              HSMSS Library Management System
            </h1>
            <p className="text-slate-500 text-sm mt-2">Create your account</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={user_name}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all duration-200"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all duration-200"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-full bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all duration-200"
            />

            {error && (
              <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            {message && (
              <p className="text-emerald-600 text-sm bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-[#255D81] text-white text-sm font-semibold hover:bg-[#184e63] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}