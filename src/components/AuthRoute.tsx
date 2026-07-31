import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { TokenService } from "../services/token.service";
import { isTokenExpired } from "../utils/tokenUtils";

interface AuthRouteProps {
  type: "public" | "protected";
  redirectTo?: string;
}

export default function AuthRoute({ type, redirectTo }: AuthRouteProps) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = TokenService.getAccessToken();
        if (token && !isTokenExpired(token)) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    verifyToken();
  }, [location]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        <span className="text-slate-400 text-sm font-medium">Verifying session...</span>
      </div>
    );
  }

  if (type === "protected" && !isAuthenticated) {
    return <Navigate to={redirectTo || "/login"} replace />;
  }

  if (type === "public" && isAuthenticated) {
    return <Navigate to={redirectTo || "/author"} replace />; // Note: the application redirect page is /dashboard (or /)
  }

  return <Outlet />;
}
