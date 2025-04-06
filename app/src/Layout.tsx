import { Outlet } from "react-router-dom";
import { useAuth } from "src/context/AuthContext";
import { axiosClient } from "src/util/axiosClient";
import Navigation from "src/components/Navigation/Navigation";

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
            <Navigation user={user} logout={logout} />
          </>
        ) : (
          <div></div>
        )}
        <Outlet />
    </div>
  );
}

export default Layout;
