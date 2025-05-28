import styles from './LevelGrid.module.css';

import { AuthGuard } from '@devtools-dash/guards/AuthGuard';
import { useAxiosClient } from '@devtools-dash/context/AxiosContext';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryEnum, LevelResponse, LevelSessionResponse } from '@devtools-dash/types/openapi';
import { useEffect, useState } from 'react';
import Button from '@devtools-dash/components/form/button/Button';
import StarIcon from '../StarIcon';

const LevelGrid = () => {
  const axiosClient = useAxiosClient();
  const navigate = useNavigate();
  const { category } = useParams<{ category: CategoryEnum }>();
  const [levels, setLevels] = useState<LevelResponse[]>([]);

  const [currentLevel, setCurrentLevel] = useState<LevelSessionResponse | null>(null);
  const [windowProxy, setWindowProxy] = useState<Window | null>(null);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (windowProxy) {
      const interval =
      setInterval(() => {
        if (windowProxy.closed) {
          clearInterval(interval);
          setWindowProxy(null);
          axiosClient.completed_api_level_session_completed__completed_id__get({completed_id: currentLevel?.id || -1}).then(() => {
            navigate('/completed?completed_id=' + currentLevel?.id);
          });
        }
      }, 500) as unknown as number
      setIntervalId(interval);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [windowProxy]);
  const fetchLevels = async () => {
    if (!category) {
      return;
    }
    const response = await axiosClient.get_by_category_api_level__level_category__get({level_category: category});
    const sortedLevels = response.data.sort((a, b) => a.order_in_category - b.order_in_category);
    setLevels(sortedLevels);
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  const handleLevelClick = async (level: LevelResponse) => {
    const startResponse = await axiosClient.api_start_level_api_level_session_start__level_key__post({
      level_key: level.level_key,
    })
    setCurrentLevel(startResponse.data);
    setWindowProxy(window.open('/api/level_session/play/' + level.level_key, '_blank'));
  }

  return (
    <AuthGuard>
      <div className={styles.container}>
        <div className={styles.levels}>
          <div className={styles.header}>
            <h2>{category}</h2>
            <Button type="button" onClick={() => navigate('/')}>back</Button>
          </div>

          <div className={styles.levelGrid}>
            {levels.map((level) => (
              <button key={level.level_key} className={styles.level + " " + (level.completed && styles.completed)} onClick={() => handleLevelClick(level)}>
                {level.completed && (
                  <div className={styles.completedIcon}>
                    <StarIcon width='30px' height='30px'/>
                  </div>
                )}
                {level.order_in_category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default LevelGrid;
