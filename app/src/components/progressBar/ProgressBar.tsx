import styles from './ProgressBar.module.css';

const ProgressBar = ({ progress }: {progress: number}) => {
  return (
    <div className={styles.progressBar}>
      <div
        className = {styles.progress}
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
