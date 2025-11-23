import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./firebase";

const AuthRedirect = () => {
  const user = auth.currentUser;

  if (user) {
    // Already signed in → send to /home
    return <Navigate to="/home" replace />;
  }

  // Not signed in → allow access
  return <Outlet />;
};

export default AuthRedirect;
