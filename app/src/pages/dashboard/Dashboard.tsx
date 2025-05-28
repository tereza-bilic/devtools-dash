import { useEffect, useState } from 'react';
import { AuthGuard } from '@devtools-dash/guards/AuthGuard';
import { LevelResponse, LevelSessionResponse } from '@devtools-dash/types/openapi';
import { useAxiosClient } from '@devtools-dash/context/AxiosContext';
import { intervalToDuration } from "date-fns";
import { RadarChart } from '@devtools-dash/components_temp/RadarChart/RadarChart';
import { CalendarChart } from '@devtools-dash/components_temp/CalendarChart/CalendarChart';
import CategoryProgressGrid from '@devtools-dash/components_temp/CategoryProgressGrid/CategoryProgressGrid';
import Achievements from '@devtools-dash/components_temp/Achievements/Achievements';

import styles from './dashboard.module.css';
import ProgressBar from '@devtools-dash/components_temp/progressBar/ProgressBar';
import { categories } from '@devtools-dash/consts/categories';
import StarIcon from '@devtools-dash/components_temp/StarIcon';
import PersonIcon from '@devtools-dash/components_temp/PersonIcon/PersonIcon';
import { useAuth } from '@devtools-dash/context/AuthContext';
import { Badge, BadgeType } from '@devtools-dash/consts/badge';
import LeaderboardMinimized from '@devtools-dash/components_temp/LeaderboardMinimized/LeaderboardMinimized';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const axiosClient = useAxiosClient();
  const { user } = useAuth();

  const [levels, setLevels] = useState<LevelResponse[]>([]);
  const [loadingLevels, setLoadingLevels] = useState(true);

  const [levelSessions, setLevelSessions] = useState<LevelSessionResponse[]>([]);
  const [, setLoadingLevelSessions] = useState(true);

  useEffect(() => {
    setLoadingLevels(true);
    axiosClient.get_all_levels_api_level__get()
      .then((response) => {
        setLevels(response.data);
        setLoadingLevels(false);
      })
      .catch((error) => {
        console.error('Error fetching level sessions:', error);
        setLoadingLevels(false);
      });
  }, []);

  useEffect(() => {
    setLoadingLevelSessions(true);
    axiosClient.get_level_sessions_api_level_session_all_get()
      .then((response) => {
        setLevelSessions(response.data);
        setLoadingLevelSessions(false);
      })
      .catch((error) => {
        console.error('Error fetching level sessions:', error);
        setLoadingLevelSessions(false);
      });
  }
  , []);


  // Calculate total levels completed and total time spent
  const completedSessions = levels.filter(levels => levels.completed);
  const totalLevelsCompleted = completedSessions.length;
  const totalLevels = levels.length;

  // Calculate time spent in minutes
  const totalTimeSpent = levelSessions.reduce((total, session) => {
    const startTime = new Date(session.started_at);
    if (!session.finished_at) {
      return total; // Skip sessions that are not finished
    }

    const endTime = new Date(session.finished_at);
    const duration = intervalToDuration({ start: startTime, end: endTime });

    return total + (duration.hours || 0) * 60 + (duration.minutes || 0);
  }, 0);

  const totalStars = levels.reduce((total, level) => {
    const stars = level.difficulty || 0;
    return total + stars;
  }
  , 0);

  const getProgressPerCategory = (category: string) => {
    const categoryLevels = levels.filter(level => level.category === category);
    const completedLevels = categoryLevels.filter(level => level.completed);
    const totalLevels = categoryLevels.length;

    return {
      completed: completedLevels.length,
      total: totalLevels,
    };
  };

  // user should have bronze badge of category if he completed 1 level, silver if completed 50% of levels, gold if completed all levels, they are added
  const userBadges = categories.reduce((acc: Badge[], category) => {
    const { completed, total } = getProgressPerCategory(category);
    if (completed === 0) {
      return acc;
    }

    if (completed >= 1) {
      acc.push({ type: BadgeType.BRONZE, category });
    }

    if (completed >= Math.floor(total / 2)) {
      acc.push({ type: BadgeType.SILVER, category });
    }

    if (completed === total) {
      acc.push({ type: BadgeType.GOLD, category });
    }

    return acc;
  }
  , []);




  return (
    <AuthGuard>
        <div className={styles.dashboard}>
          <div className={styles.leftDashboard}>
            <div className={styles.userIconWrapper}>
              <PersonIcon width='150px' height='150px'/>
            </div>
              {user && <div className={styles.userName}>{user.user_nickname}</div>}

            <div className={styles.divider} />

            <Achievements userBadges={userBadges} />

            <div className={styles.divider} />

            <div>
              <Link
                to="/leaderboard"
                className={styles.leaderboardLink}
                title="View Leaderboard"
                aria-label="View Leaderboard"
              >
                Leaderboard
                </Link>
              <LeaderboardMinimized />
            </div>

          </div>

          <div>
            completion
            {loadingLevels ? (
              <div className={styles.loading}>Loading...</div>
            ) : (
              <div className={styles.progressBarContainer}>
                <ProgressBar
                  completed={totalLevelsCompleted}
                  total={totalLevels}
                />
              </div>
            )}

            <div className={styles.flex}>
              <div className={styles.dataBox}>You've played for <div>{totalTimeSpent} minutes </div></div>
              <CalendarChart levelSessions={levelSessions} />
            </div>

            <div className={styles.flex}>
              <RadarChart levels={levels} />
              <div className={styles.dataBox}>
                You've collected
                <div>{totalStars}
                  <StarIcon />
                </div>
              </div>

              <div className={styles.dataBox}>
                Average time per level
                <div>{(totalTimeSpent / totalLevelsCompleted).toFixed(0)} minutes</div>
              </div>
            </div>

            <CategoryProgressGrid
              categories={categories}
              levels={levels}
              loading={loadingLevels}
            />

          </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
