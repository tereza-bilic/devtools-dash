import React from 'react';
import { Badge } from '@devtools-dash/consts/badge';
import BadgeBackground from '@devtools-dash/components/BadgeBackground/BadgeBackground';
import { categoryIconMap } from '@devtools-dash/consts/categories';
import styles from './Achievements.module.css';

interface AchievementsProps {
  userBadges: Badge[];
}

const Achievements = ({ userBadges }: AchievementsProps) => {
  return (
    <div>
      <h3 className={styles.title}>Achievements</h3>
      <div className={styles.achievements}>
        {userBadges.map((badge, index) => (
          <div key={index} className={styles.badgeWrapper}>
            <BadgeBackground color={badge.type} width='80' height='90' />
            {categoryIconMap[badge.category] && React.createElement(categoryIconMap[badge.category], { className: styles.badgeIcon, width: '60' })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
