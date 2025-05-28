// leaderboard component

import React, { useEffect, useState } from 'react';
import { useAxiosClient } from '@devtools-dash/context/AxiosContext';
import styles from './Leaderboard.module.css';
import { LeaderboardUserEntry, UserLevelPoints } from '@devtools-dash/types/openapi';
import { AuthGuard } from '@devtools-dash/guards/AuthGuard';
import { useAuth } from '@devtools-dash/context/AuthContext';


const Leaderboard = () => {
  const axiosClient = useAxiosClient();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUserEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);
  const { user } = useAuth();

  const toggleUserDetails = (userId: number) => {
    // Only allow toggling details for the current user
    if (user && userId === parseInt(user.user_id.toString())) {
      if (expandedUserId === userId) {
        setExpandedUserId(null);
      } else {
        setExpandedUserId(userId);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    axiosClient.get_leaderboard_endpoint_api_level_session_leaderboard_get()
      .then((response) => {
        setLeaderboard(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching leaderboard:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <AuthGuard>
      <div className={styles.leaderboard}>
        <h1>Leaderboard</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Total Points</th>
              <th>Levels Completed</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((userEntry, index) => {
              const isCurrentUser = user && userEntry.user_id === parseInt(user.user_id.toString());
              const rowClasses = [
                isCurrentUser ? styles.currentUser : '',
                expandedUserId === userEntry.user_id ? styles.expanded : '',
                isCurrentUser ? styles.clickable : ''
              ].filter(Boolean).join(' ');

              return (
                <React.Fragment key={userEntry.user_id}>
                  <tr
                    onClick={() => toggleUserDetails(userEntry.user_id)}
                    className={rowClasses}
                    title={isCurrentUser ? "Click to see your detailed stats" : ""}
                  >
                    <td>{index + 1}</td>
                    <td>{userEntry.user_nickname} {isCurrentUser && <span className={styles.youBadge}>YOU</span>}</td>
                    <td>{Math.round(userEntry.total_points)}</td>
                    <td>{userEntry.levels_completed}</td>
                  </tr>
                  {expandedUserId === userEntry.user_id && (
                    <tr className={styles.detailsRow}>
                    <td colSpan={4}>
                      <div className={styles.levelDetails}>
                        <h3>Level Details</h3>
                        <table className={styles.detailsTable}>
                          <thead>
                            <tr>
                              <th>Level</th>
                              <th>Difficulty</th>
                              <th>Points</th>
                              <th>Best Time</th>
                              <th>Your Time</th>
                              <th>Attempts</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userEntry.level_points.map((level: UserLevelPoints) => (
                              <tr key={level.level_key}>
                                <td>{level.level_name}</td>
                                <td>{level.difficulty}</td>
                                <td>{Math.round(level.points)}</td>
                                <td>{level.best_time.toFixed(2)}s</td>
                                <td>{level.user_best_time.toFixed(2)}s</td>
                                <td>{level.completed_sessions}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
            })}
          </tbody>
        </table>
      </div>
    </AuthGuard>
  );
};

export default Leaderboard;
