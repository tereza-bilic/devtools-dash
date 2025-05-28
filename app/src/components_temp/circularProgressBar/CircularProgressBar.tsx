import { useState } from 'react';
import styles from './CircularProgressBar.module.css';

interface CircularProgressBarProps {
  completed: number;
  total: number;
  size?: number;
  strokeWidth?: number;
  circleColor?: string;
  progressColor?: string;
  textColor?: string;
  showText?: boolean;
}

const CircularProgressBar = ({
  completed,
  total,
  size = 100,
  strokeWidth = 8,
  circleColor = '#E5E7EB',
  progressColor = '#30d048',
  textColor = '#000',
  showText = true,
}: CircularProgressBarProps) => {
  const [progress] = useState(completed / total * 100);

  // Calculate the radius and circumference
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.circularProgressContainer} style={{ width: size, height: size }}>
      <svg width={size} height={size} className={styles.circularProgressBar}>
        <circle
          className={styles.circleBackground}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          style={{ stroke: circleColor }}
        />
        <circle
          className={styles.circleProgress}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          style={{
            stroke: progressColor,
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset
          }}
        />
      </svg>
      {showText && (
        <div className={styles.progressText} style={{ color: textColor }}>
          <span className={styles.progressValue}>{completed}</span>
          <span className={styles.progressSeparator}>/</span>
          <span className={styles.progressTotal}>{total}</span>
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar;
