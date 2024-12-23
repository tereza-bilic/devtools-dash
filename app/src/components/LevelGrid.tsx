import styles from './LevelGrid.module.css';

const LevelGrid = () => {
  const levels = [1, 2, 3];

  return (
    <div className={styles.levels}>
      {levels.map((level, index) => (
        <div key={index} className={styles.level}>
          {level}
        </div>
      ))}
    </div>
  );
};

export default LevelGrid;
