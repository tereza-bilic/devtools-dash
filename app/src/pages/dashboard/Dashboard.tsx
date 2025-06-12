import { useEffect, useState } from 'react';
import { AuthGuard } from '@devtools-dash/guards/AuthGuard';
import { CategoryEnum, LevelResponse, LevelSessionResponse } from '@devtools-dash/types/openapi';
import { useAxiosClient } from '@devtools-dash/context/AxiosContext';
import { RadarChart } from '@devtools-dash/components/RadarChart/RadarChart';
import { CalendarChart } from '@devtools-dash/components/CalendarChart/CalendarChart';
import CategoryProgressGrid from '@devtools-dash/components/CategoryProgressGrid/CategoryProgressGrid';
import Achievements from '@devtools-dash/components/Achievements/Achievements';
import Skeleton from '@devtools-dash/components/Skeleton/Skeleton';
import { ResponsiveBar } from '@nivo/bar'

import styles from './Dashboard.module.css';
import ProgressBar from '@devtools-dash/components/progressBar/ProgressBar';
import { categories } from '@devtools-dash/consts/categories';
import StarIcon from '@devtools-dash/components/StarIcon';
import PersonIcon from '@devtools-dash/components/PersonIcon/PersonIcon';
import { useAuth } from '@devtools-dash/context/AuthContext';
import { Badge, BadgeType } from '@devtools-dash/consts/badge';
import LeaderboardMinimized from '@devtools-dash/components/LeaderboardMinimized/LeaderboardMinimized';
import { Link } from 'react-router-dom';
import { durationFormat } from '@devtools-dash/utils/date-functions';

const Dashboard = () => {
  const axiosClient = useAxiosClient();
  const { user } = useAuth();

  const [levels, setLevels] = useState<LevelResponse[]>([]);
  const [loadingLevels, setLoadingLevels] = useState(true);

  const [levelSessions, setLevelSessions] = useState<LevelSessionResponse[]>([]);
  const [loadingLevelSessions, setLoadingLevelSessions] = useState(true);
  const [loadingUser, setLoadingUser] = useState(!user);

  // Combined loading state to coordinate animations
  const isLoading = loadingLevels || loadingLevelSessions || loadingUser;

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
  }, [axiosClient]);

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
  }, [axiosClient]);

  // Update loading state when user becomes available
  useEffect(() => {
    if (user) {
      setLoadingUser(false);
    }
  }, [user]);


  // Calculate total levels completed and total time spent
  const completedSessions = levels.filter(levels => levels.completed);
  const totalLevelsCompleted = completedSessions.length;
  const totalLevels = levels.length;

  // Calculate time s
  const totalTimeDelta = levelSessions.reduce((total, session) => {
    const startTime = new Date(session.started_at);
    if (!session.finished_at) {
      return total; // Skip sessions that are not finished
    }

    const endTime = new Date(session.finished_at);
    const duration = endTime.getTime() - startTime.getTime();
    return total + duration;
  }, 0);

  const totalTimeSpent = durationFormat(totalTimeDelta, {isMinFormat: true});

  const averageTimePerLevel = durationFormat(totalTimeDelta / totalLevelsCompleted, {isMinFormat: true});

  const totalStars = levels.filter(l => l.completed).reduce((total, level) => {
    const stars = level.difficulty || 0;
    return total + stars;
  }, 0);

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

  type BarData = {
    category: CategoryEnum;
    easy: number;
    medium: number;
    hard: number;
  }

  const solvedLevelsByCategoryAndDifficulty = levels.reduce((acc: BarData[], level) => {
    if (!level.completed) {
      return acc;
    }

    const categoryIndex = acc.findIndex(item => item.category === level.category);
    if (categoryIndex === -1) {
      // If category doesn't exist, create a new entry
      acc.push({
        category: level.category,
        easy: level.difficulty === 1 ? 1 : 0,
        medium: level.difficulty === 2 ? 1 : 0,
        hard: level.difficulty === 3 ? 1 : 0
      });
    } else {
      // If category exists, update the counts
      acc[categoryIndex].easy += level.difficulty === 1 ? 1 : 0;
      acc[categoryIndex].medium += level.difficulty === 2 ? 1 : 0;
      acc[categoryIndex].hard += level.difficulty === 3 ? 1 : 0;
    }

    return acc;
  }
  , []);

  console.log('Solved levels by category and difficulty:', solvedLevelsByCategoryAndDifficulty);



  return (
    <AuthGuard>
        <div className={`${styles.dashboard} ${isLoading ? styles.loading : ''}`}>
          <div className={styles.leftDashboard}>
            <div className={styles.userIconWrapper}>
              {!loadingUser ? (
                <PersonIcon width='150px' height='150px'/>
              ) : (
                <Skeleton variant="circular" width="150px" height="150px" />
              )}
            </div>
            {!loadingUser && user ? (
              <div className={styles.userName}>{user.user_nickname}</div>
            ) : (
              <Skeleton variant="text" width="120px" height="24px" />
            )}

            <div className={styles.divider} />

              <div className={styles.leaderboardWrapper}>
                <div className={styles.sectionTitle}>Leaderboard</div>
                <Link
                  to="/leaderboard"
                  className={styles.leaderboardLink}
                  title="View Leaderboard"
                  aria-label="View Leaderboard"
                >
                  View full leaderboard
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                {loadingLevels ? (
                  <div style={{ padding: '10px' }}>
                    <Skeleton height="120px" />
                  </div>
                ) : (
                  <LeaderboardMinimized />
                )}
              </div>

            <div className={styles.divider} />

            <div className={styles.sectionTitle}>My Achievements</div>
            {loadingLevels ? (
              <div style={{ padding: '10px' }}>
                <Skeleton height="180px" />
              </div>
            ) : (
              <Achievements userBadges={userBadges} />
            )}
          </div>

          <div>
            <div className={styles.sectionTitle}>
              {loadingLevels ? <Skeleton variant="text" width="120px" /> : "Dashboard Overview"}
            </div>

            {loadingLevels ? (
              <div className={styles.progressBarContainer}>
                <Skeleton height="24px" />
              </div>
            ) : (
              <div className={styles.progressBarContainer}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>Progress</h3>
                <ProgressBar
                  completed={totalLevelsCompleted}
                  total={totalLevels}
                />
              </div>
            )}

            {/* First row - Time played and Calendar */}
            <div className={styles.flex}>
              {loadingLevelSessions ? (
                <div className={styles.dataBox}>
                  <Skeleton variant="text" width="120px" />
                  <div><Skeleton variant="text" width="80px" /></div>
                </div>
              ) : (
                <div className={styles.dataBox}>
                  <span>Time played</span>
                  <div>{totalTimeSpent}</div>
                </div>
              )}

              {loadingLevelSessions ? (
                <div className={styles.dataBox}>
                  <Skeleton variant="text" width="150px" />
                  <div><Skeleton variant="text" width="80px" /></div>
                </div>
              ) : (
                <div className={styles.dataBox}>
                  <span>Average time per level</span>
                  <div>{totalLevelsCompleted > 0 ? averageTimePerLevel : 0}</div>
                </div>
              )}

              {loadingLevels ? (
                <div className={styles.dataBox}>
                  <Skeleton variant="text" width="120px" />
                  <div>
                    <Skeleton variant="text" width="60px" />
                  </div>
                </div>
              ) : (
                <div className={styles.dataBox}>
                  <span>Stars collected</span>
                  <div>{totalStars}
                    <StarIcon />
                  </div>
                </div>
              )}
            </div>

            {/* Second row - Calendar chart */}
            <div className={styles.flex}>
              {loadingLevelSessions ? (
                <div className={styles.calendarPlaceholder}>
                  <Skeleton variant="chart" height="180px" />
                </div>
              ) : (
                <CalendarChart levelSessions={levelSessions} />
              )}
            </div>

            {/* Category progress grid */}
            <div className={styles.sectionTitle}>
              {loadingLevels ? <Skeleton variant="text" width="120px" /> : "Category Progress"}
            </div>
            <CategoryProgressGrid
              categories={categories}
              levels={levels}
              loading={loadingLevels}
            />

              {/* Third row - Radar chart */}
            <div className={styles.flex} style={{ justifyContent: 'space-evenly' }}>
              {loadingLevels ? (
                <div className={styles.radarPlaceholder}>
                  <Skeleton variant="chart" height="240px" width="240px" />
                </div>
              ) : (
                <RadarChart levels={levels} />
              )}

            {loadingLevels ? (
              <div style={{ padding: '10px' }}>
                <Skeleton height="180px" />
              </div>
            ) : (
              <div style={{ height: '300px', width: '400px' }}>
                <ResponsiveBar
                  data={solvedLevelsByCategoryAndDifficulty}
                  keys={['easy', 'medium', 'hard']}
                  indexBy="category"
                  margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                  padding={0.3}
                  colors={{ scheme: 'nivo' }}
                  axisLeft={{
                    legend: 'Levels',
                    legendPosition: 'middle',
                    legendOffset: -40
                  }}
                />
              </div>
            )}
            </div>

          </div>
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
