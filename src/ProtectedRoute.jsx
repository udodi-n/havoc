import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./firebase";

const ProtectedRoute = () => {
  const user = auth.currentUser;
  console.log(user)

  if (!user) {
    return <Navigate to="/hero" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
