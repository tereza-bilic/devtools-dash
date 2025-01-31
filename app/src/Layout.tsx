import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { axiosClient } from "./util/axiosClient";

const Layout = () => {
  const { user, refresh } = useAuth();
  const logout = async () => {
    await axiosClient.logout_api_user_logout_post()
    refresh();
  }

  return (
    <div>
      {user ? (
          <>
            <div>Welcome {user.user_nickname}</div>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <div>Please login or signup</div>
      )}
        <Outlet />
    </div>
  );
}

export default Layout;
