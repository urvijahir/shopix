import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo?.email === "admin29@gmail.com" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}

export default AdminRoute;
