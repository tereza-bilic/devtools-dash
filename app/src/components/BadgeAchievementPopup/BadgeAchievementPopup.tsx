import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Badge, BadgeType } from "@devtools-dash/consts/badge";
import BadgeBackground from '@devtools-dash/components/BadgeBackground/BadgeBackground';
import { categoryIconMap } from '@devtools-dash/consts/categories';
import Button from '@devtools-dash/components/form/button/Button';
import styles from './BadgeAchievementPopup.module.css';

interface BadgeAchievementPopupProps {
  badge: Badge;
  onClose: () => void;
}

const BadgeAchievementPopup: React.FC<BadgeAchievementPopupProps> = ({ badge, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // Update window dimensions when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Stop confetti after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Badge descriptions based on type
  const getBadgeDescription = () => {
    switch (badge.type) {
      case BadgeType.BRONZE:
        return `You've completed your first level in the ${badge.category} category! Keep going!`;
      case BadgeType.SILVER:
        return `You've completed 50% of the ${badge.category} category! Great progress!`;
      case BadgeType.GOLD:
        return `You've completed ALL levels in the ${badge.category} category! Amazing achievement!`;
      default:
        return 'You earned a new badge!';
    }
  };

  // Get badge color name for display
  const getBadgeColorName = () => {
    switch (badge.type) {
      case BadgeType.BRONZE:
        return 'Bronze';
      case BadgeType.SILVER:
        return 'Silver';
      case BadgeType.GOLD:
        return 'Gold';
      default:
        return '';
    }
  };

  const CategoryIcon = categoryIconMap[badge.category];

  return (
    <div className={styles.overlay}>
      {showConfetti && (
        <Confetti
          width={windowWidth}
          height={windowHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}
      <div className={styles.popup}>
        <div className={styles.badgeContainer}>
          <div className={styles.badgeWrapper}>
            <BadgeBackground color={badge.type} width="150" height="165" />
            {CategoryIcon && <CategoryIcon className={styles.badgeIcon} width="100" />}
          </div>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Badge Unlocked!</h2>
          <h3 className={styles.subtitle}>
            {getBadgeColorName()} {badge.category} Badge
          </h3>
          <p className={styles.description}>{getBadgeDescription()}</p>
          <div className={styles.buttonContainer}>
            <Button type="button" color="blue" onClick={onClose}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeAchievementPopup;
