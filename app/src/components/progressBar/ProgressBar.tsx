import { useState } from 'react';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ completed, total }: {completed: number, total: number}) => {

  const [progress, setProgress] = useState(completed / total * 100);

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
      <span className={styles.progressText}>
        {completed} / {total}
      </span>
    </div>
  );
};

export default ProgressBar;
