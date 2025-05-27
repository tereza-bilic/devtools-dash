import { Outlet } from "react-router-dom";
import { useAuth } from "src/context/AuthContext";
import { useAxiosClient } from "src/context/AxiosContext";
import Navigation from "src/components/Navigation/Navigation";

const Layout = () => {
  const axiosClient = useAxiosClient();
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
