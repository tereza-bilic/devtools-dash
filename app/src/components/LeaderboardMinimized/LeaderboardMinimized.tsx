// leaderboard component

import { useEffect, useState } from 'react';
import { useAxiosClient } from 'src/context/AxiosContext';
import styles from './LeaderboardMinimized.module.css';
import { LeaderboardUserEntry } from 'src/types/openapi';
import { useAuth } from 'src/context/AuthContext';


const LeaderboardMinimized = () => {
  const axiosClient = useAxiosClient();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUserEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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

  // Get current user's rank
  const currentUserIndex = leaderboard.findIndex(entry => user && entry.user_id === parseInt(user.user_id.toString()));
  const currentUserRank = currentUserIndex !== -1 ? currentUserIndex + 1 : null;
  const currentUserEntry = currentUserIndex !== -1 ? leaderboard[currentUserIndex] : null;

  // Get top 3 users
  const topThreeUsers = leaderboard.slice(0, 3);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Total Points</th>
        </tr>
      </thead>
      <tbody>
        {topThreeUsers.map((entry, index) => (
          <tr key={entry.user_id} className={user && entry.user_id === parseInt(user.user_id.toString()) ? styles.currentUser : ''}>
            <td>{index + 1}</td>
            <td>{entry.user_nickname}</td>
            <td>{Math.round(entry.total_points)}</td>
          </tr>
        ))}

        {/* If current user is not in top 3, show them separately */}
        {currentUserRank && currentUserRank > 3 && currentUserEntry && (
          <>
            {currentUserRank > 4 && (
              <tr className={styles.separator}>
                <td colSpan={3}>...</td>
              </tr>
            )}
            <tr className={styles.currentUser}>
              <td>{currentUserRank}</td>
              <td>{currentUserEntry.user_nickname}</td>
              <td>{Math.round(currentUserEntry.total_points)}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
};

export default LeaderboardMinimized;
