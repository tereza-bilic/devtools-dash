import { TokenData } from '@devtools-dash/types/openapi';
import styles from './Navigation.module.css';
import { useState, useEffect } from 'react';
import StarIcon from '@devtools-dash/components/StarIcon';
import { useAxiosClient } from '@devtools-dash/context/AxiosContext';
import OnboardingModal from '@devtools-dash/components/OnboardingModal';
import Help from '@devtools-dash/components/icons/Help';

const Navigation = (props: {user: TokenData, logout: () => void}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalStars, setTotalStars] = useState(0);
  const [isStarAnimating, setIsStarAnimating] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const axiosClient = useAxiosClient();

  // Get current path on component mount
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Animate stars when they change
  useEffect(() => {
    if (totalStars > 0) {
      setIsStarAnimating(true);
      const timer = setTimeout(() => setIsStarAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [totalStars]);

  useEffect(() => {
    // Fetch levels to calculate total stars
    axiosClient.get_all_levels_api_level__get()
      .then((response) => {
        const stars = response.data
          .filter(level => level.completed)
          .reduce((total, level) => total + (level.difficulty || 0), 0);
        setTotalStars(stars);
      })
      .catch((error) => {
        console.error('Error fetching level data for stars:', error);
      });
  }, [axiosClient]);

  const navigateTo = (path: string) => {
    window.location.href = path;
    setCurrentPath(path);
  };

  const handleHelpClick = () => {
    setShowHelp(true);
  };

  const handleHelpClose = () => {
    setShowHelp(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <a href="/" onClick={(e) => {
          e.preventDefault();
          navigateTo('/');
        }}>
          DevToolsDash
        </a>
      </div>
      <div className={styles.navLinks}>
        <a
          href="/dashboard"
          className={`${styles.navLink} ${currentPath === '/dashboard' ? styles.active : ''}`}
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/dashboard');
          }}
        >
          My Stats
        </a>
        <a
          href="/"
          className={`${styles.navLink} ${currentPath === '/' ? styles.active : ''}`}
          onClick={(e) => {
            e.preventDefault();
            navigateTo('/');
          }}
        >
          Play
        </a>
      </div>

      <div className={`${styles.starCounter} ${isStarAnimating ? styles.starAnimating : ''}`}>
        <span className={styles.starCount}>{totalStars}</span>
        <StarIcon width="28px" height="28px" />
      </div>

      <button
        className={styles.helpButton}
        onClick={handleHelpClick}
        aria-label="Open help guide"
      >
        <Help className={styles.helpIcon} width="32px" height="32px" />
      </button>

      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={styles.user}
      >
        {props.user.user_nickname} ▼
        {isOpen && (
        <div
          className={styles.dropdown}
        >
          <button
            className={styles.button}
            onClick={props.logout}
          >
            Log Out
          </button>
          <button
            className={styles.button}
          >
            More ...
          </button>
        </div>
      )}
      </div>

      {showHelp && (
        <OnboardingModal isFirstVisit={false} onComplete={handleHelpClose} />
      )}
      </div>
  );
};

export default Navigation;
