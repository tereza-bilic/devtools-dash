import styles from './ProgressBar.module.css';

const ProgressBar = ({ completed, total }: {completed: number, total: number}) => {

  const progress = completed / total * 100;

  const style = {
    width: `${progress}%`,
    '--width': `${progress}%`,
  };

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar}>
        <div
          className = {styles.progress}
          style={style}
        ></div>
      </div>
      <div className={styles.progressText}>
        {completed} / {total}
      </div>
    </div>
  );
};

export default ProgressBar;
