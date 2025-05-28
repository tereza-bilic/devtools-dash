import { Outlet } from "react-router-dom";
import { useAuth } from "@devtools-dash/context/AuthContext";
import { useAxiosClient } from "@devtools-dash/context/AxiosContext";
import Navigation from "@devtools-dash/components_temp/Navigation/Navigation";

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
