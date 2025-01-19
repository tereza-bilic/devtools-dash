import { AuthGuard } from './AuthGuard';
import styles from './LevelGrid.module.css';
import { axiosClient } from 'src/util/axiosClient';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryEnum, LevelResponse } from 'src/types/openapi';
import { useEffect, useState } from 'react';

const LevelGrid = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: CategoryEnum }>();
  const [levels, setLevels] = useState<LevelResponse[]>([]);
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
    window.open('/api/level_session/play/' + level.level_key, '_blank');
  }

  return (
    <AuthGuard>
      <div>
        <button onClick={() => navigate('/')}>back</button>
      </div>
      <div className={styles.levels}>
        {levels.map((level, index) => (
          <button key={level.level_key} className={styles.level} onClick={() => handleLevelClick(level)}>
            {level.order_in_category}
          </button>
        ))}
      </div>
    </AuthGuard>
  );
};

export default LevelGrid;
