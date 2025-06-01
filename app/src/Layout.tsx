import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@devtools-dash/context/AuthContext";
import { useAxiosClient } from "@devtools-dash/context/AxiosContext";
import Navigation from "@devtools-dash/components/Navigation/Navigation";
import OnboardingModal from "@devtools-dash/components/OnboardingModal";

const Layout = () => {
  const axiosClient = useAxiosClient();
  const { user, refresh } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user has any level sessions and hasn't seen the onboarding
  useEffect(() => {
    const checkUserLevelSessions = async () => {
      if (user) {
        try {
          // Check if the user has already seen the onboarding modal
          const hasViewedOnboarding = localStorage.getItem("onboardingCompleted") === "true";

          if (hasViewedOnboarding) {
            // If they've already seen it, don't show again regardless of level sessions
            setShowOnboarding(false);
          } else {
            // Otherwise, show only if they have no level sessions
            const response = await axiosClient.get_level_sessions_api_level_session_all_get();
            setShowOnboarding(response.data.length === 0);
          }
        } catch (error) {
          console.error("Failed to fetch user level sessions:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkUserLevelSessions();
  }, [user, axiosClient]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    // Optionally, store a flag in localStorage to prevent showing again
    localStorage.setItem("onboardingCompleted", "true");
  };

  const logout = async () => {
    await axiosClient.logout_api_user_logout_post()
    refresh();
  }

  return (
    <div>
      {user ? (
          <>
            <Navigation user={user} logout={logout} />
            {!isLoading && showOnboarding && (
              <OnboardingModal
                isFirstVisit={true}
                onComplete={handleOnboardingComplete}
              />
            )}
          </>
        ) : (
          <div></div>
        )}
        <Outlet />
    </div>
  );
}

export default Layout;
