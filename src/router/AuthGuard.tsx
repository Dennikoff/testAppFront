import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRoutePaths } from ".";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const getAuthInfo = (): string => {
    return localStorage["jwt"];
  };

  useEffect(() => {
    const isPublicRoute = publicRoutePaths.includes(location.pathname);

    if (getAuthInfo()) {
      if (isPublicRoute) {
        console.log("here");
        navigate("/");
      }
    } else {
      if (!isPublicRoute) {
        navigate("/login");
      }
    }
  }, [navigate, location.pathname]);

  return <>{children}</>;
}
