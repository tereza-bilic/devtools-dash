import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular' | 'chart';
  width?: string | number;
  height?: string | number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className,
}) => {
  const classes = `${styles.skeleton} ${styles[variant]} ${className || ''}`;

  return (
    <div
      className={classes}
      style={{
        width: width || undefined,
        height: height || undefined
      }}
    />
  );
};

export default Skeleton;
