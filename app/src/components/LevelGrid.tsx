import { AuthGuard } from './AuthGuard';
import styles from './LevelGrid.module.css';
import { axiosClient } from 'src/util/axiosClient';
import { useNavigate } from 'react-router-dom';

const LevelGrid = () => {
  const navigate = useNavigate();
  const levels = [1, 2, 3];
  const handleLevelClick = async (level: number) => {
    window.open('/api/level_session/play/e1', '_blank');
  }

  return (
    <AuthGuard>
      <div>
        <button onClick={() => navigate('/')}>back</button>
      </div>
      <div className={styles.levels}>
        {levels.map((level, index) => (
          <button key={index} className={styles.level} onClick={() => handleLevelClick(level)}>
            {level}
          </button>
        ))}
      </div>
    </AuthGuard>
  );
};

export default LevelGrid;
