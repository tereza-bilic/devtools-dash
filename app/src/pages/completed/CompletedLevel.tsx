import { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AuthGuard } from "@devtools-dash/guards/AuthGuard";
import { CompletedLevelResponse, LevelResponse, LevelSessionResponse } from "@devtools-dash/types/openapi";
import { useAxiosClient } from "@devtools-dash/context/AxiosContext";

import styles from "./CompletedLevel.module.css";
import Button from "@devtools-dash/components/form/button/Button";
import StarIcon from "@devtools-dash/components/StarIcon";
import BadgeAchievementPopup from "@devtools-dash/components/BadgeAchievementPopup/BadgeAchievementPopup";
import { Badge, BadgeType } from "@devtools-dash/consts/badge";
import { formatDistance } from "date-fns";
import { durationFormat } from "@devtools-dash/utils/date-functions";

const CompletedLevel = () => {
  const axiosClient = useAxiosClient();
  const [searchParams] = useSearchParams();
  const [completedLevel, setCompletedLevel] = useState<CompletedLevelResponse | null>(null);
  const [allLevels, setAllLevels] = useState<LevelResponse[]>([]);
  const [nextLevel, setNextLevel] = useState<LevelResponse | null>(null);

  const [levelSessions, setLevelSessions] = useState<LevelSessionResponse[]>([]);
  const [earnedBadge, setEarnedBadge] = useState<Badge | null>(null);
  const [showBadgePopup, setShowBadgePopup] = useState(false);

  const timeDelta = completedLevel
    ? (new Date(completedLevel.finished_at).getTime() - new Date(completedLevel.started_at).getTime())
    : 0;

  const stringTimeDelta = durationFormat(timeDelta);

  // Fetch all levels
  useEffect(() => {
    axiosClient.get_all_levels_api_level__get()
      .then((res) => {
        setAllLevels(res.data);
      })
      .catch((error: Error) => {
        console.error("Failed to fetch levels:", error);
      });
  }, [axiosClient]);

  // Determine next level when completed level and all levels are available
  useEffect(() => {
    if (completedLevel && allLevels.length > 0) {
      // Find the current level
      const currentLevel = allLevels.find(level => level.level_key === completedLevel.level_key);

      if (currentLevel) {
        // Filter levels in the same category and sort by order
        const categoryLevels = allLevels
          .filter(level => level.category === currentLevel.category)
          .sort((a, b) => a.order_in_category - b.order_in_category);

        // Find the index of current level
        const currentIndex = categoryLevels.findIndex(level => level.level_key === currentLevel.level_key);

        // If there's a next level in category, set it
        if (currentIndex >= 0 && currentIndex < categoryLevels.length - 1) {
          setNextLevel(categoryLevels[currentIndex + 1]);
        }
      }
    }
  }, [completedLevel, allLevels]);

  // Store the window proxy for the next level and the level session
  const [windowProxy, setWindowProxy] = useState<Window | null>(null);
  const [currentLevelSession, setCurrentLevelSession] = useState<LevelSessionResponse | null>(null);
  // Use a ref for interval to prevent it from causing re-renders
  const intervalRef = useRef<number | undefined>(undefined);

  // Monitor the opened window to detect when it's closed
  useEffect(() => {
    if (windowProxy) {
      // Clear any existing interval first
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Set up new interval
      intervalRef.current = setInterval(() => {
        if (windowProxy.closed) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
          }
          setWindowProxy(null);

          // When the window is closed, check if the level was completed
          // Using the same approach as in LevelGrid.tsx
          if (currentLevelSession?.id) {
            axiosClient.completed_api_level_session_completed__completed_id__get({
              completed_id: currentLevelSession.id
            }).then(() => {
              // Navigate to the completed page with the new session ID
              window.location.href = '/completed?completed_id=' + currentLevelSession.id;
            }).catch(error => {
              console.error('Error checking completed level:', error);
            });
          }
        }
      }, 500) as unknown as number;
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
  }, [windowProxy, currentLevelSession, axiosClient]);

  const transitionToNextLevel = async () => {
    if (nextLevel) {
      try {
        // This follows the same pattern as handleLevelClick in LevelGrid.tsx
        const startResponse = await axiosClient.api_start_level_api_level_session_start__level_key__post({
          level_key: nextLevel.level_key,
        });

        // Store the level session data for later reference
        setCurrentLevelSession(startResponse.data);

        // Open the level in a new tab and store the window reference
        // Make sure to use the same URL format as in LevelGrid.tsx
        const newWindow = window.open('/api/level_session/play/' + nextLevel.level_key, '_blank');

        // Set window proxy to enable monitoring
        setWindowProxy(newWindow);
      } catch (error) {
        console.error('Error starting next level:', error);
      }
    }
  }

  const stars = completedLevel?.difficulty;

  useEffect(() => {
    if (searchParams.has("completed_id")) {
      const completed_id = Number(searchParams.get("completed_id")) || -1;
      axiosClient.completed_api_level_session_completed__completed_id__get({completed_id}).then((res) => {
        setCompletedLevel(res.data);
      });
    }
  }, [searchParams, axiosClient]);

  // Fetch all level sessions to check badges
  useEffect(() => {
    axiosClient.get_level_sessions_api_level_session_all_get()
      .then((res) => {
        setLevelSessions(res.data);
      })
      .catch((error: Error) => {
        console.error("Failed to fetch level sessions:", error);
      });
  }, [axiosClient]);

  // Check if user earned a badge when completing this level
  useEffect(() => {
    if (completedLevel && allLevels.length > 0 && levelSessions.length > 0) {
      // Find the current level's category
      const currentLevel = allLevels.find(level => level.level_key === completedLevel.level_key);
      const levelSessionsOfCurrentLevel = levelSessions.filter(session => session.level_key === completedLevel.level_key && session.completed);
      if (levelSessionsOfCurrentLevel.length !== 1) {
        return;
      }

      if (currentLevel) {
        const category = currentLevel.category;

        // Get all levels in this category
        const categoryLevels = allLevels.filter(level => level.category === category);
        const completedCategoryLevels = categoryLevels.filter(level =>
          levelSessions.some(session =>
            session.level_key === level.level_key && session.completed
          )
        );

        // Calculate completion percentage
        const completedCount = completedCategoryLevels.length;
        const totalCount = categoryLevels.length;

        // Check badge conditions
        let badgeEarned: Badge | null = null;

        // Check if this is the first completed level in this category
        if (completedCount === 1) {
          badgeEarned = { type: BadgeType.BRONZE, category };
        }
        // Check if completed at least half of the levels in this category
        else if (completedCount == Math.floor(totalCount / 2)) {
          badgeEarned = { type: BadgeType.SILVER, category };
        }
        // Check if completed all levels in this category
        else if (completedCount === totalCount) {
          badgeEarned = { type: BadgeType.GOLD, category };
        }

        if (badgeEarned) {
          setEarnedBadge(badgeEarned);
          setShowBadgePopup(true);
        }
      }
    }
  }, [completedLevel, allLevels, levelSessions]);

    return (
      <AuthGuard>
          {/* Show the badge popup first if a badge was earned */}
          {earnedBadge && showBadgePopup ? (
            <BadgeAchievementPopup
              badge={earnedBadge}
              onClose={() => setShowBadgePopup(false)}
            />
          ) : (
            <div className={styles.container}>
                <div className={styles.starsContainer}>
                  {stars && Array.from({ length: Math.min(stars, 3) }, (_, index) => (
                    <div className={styles.starContainer} key={index}>
                      <StarIcon width="200px" height="200px"/>
                    </div>
                  ))}
                </div>

                <h1 className={styles.title}>Completed!</h1>
                <div className={styles.divider}></div>
                {completedLevel ? (
                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                          <span className={styles.stat}>LEVEL:</span>
                          <span className={styles.statValue}>{completedLevel.title}</span>
                        </div>
                        <div className={styles.statItem}>
                          <span className={styles.stat}>TIME:</span>
                          <span className={styles.statValue}>
                            <span className={styles.timeCounter}>
                              {stringTimeDelta}
                            </span>
                          </span>
                        </div>
                    </div>
                ) : (
                    <div className={styles.loadingContainer}>
                      <div className={styles.loading}></div>
                    </div>
                )}

                <div className={styles.buttonContainer}>
                    <Link to="/">
                        <Button type="button">Menu</Button>
                    </Link>

                    {nextLevel && (
                      <Button type="button" color="orange" onClick={transitionToNextLevel}>
                          Next Level
                      </Button>
                    )}
                </div>
            </div>
          )}
        </AuthGuard>
    );
}

export default CompletedLevel;
