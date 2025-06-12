import { TokenData } from '@devtools-dash/types/openapi';
import styles from './Navigation.module.css';
import { useState, useEffect } from 'react';
import StarIcon from '@devtools-dash/components/StarIcon';
import { useAxiosClient } from '@devtools-dash/context/AxiosContext';
import OnboardingModal from '@devtools-dash/components/OnboardingModal';
import Help from '@devtools-dash/components/icons/Help';
import { Link } from 'react-router-dom';

const Navigation = (props: {user: TokenData, logout: () => void}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalStars, setTotalStars] = useState(0);
  const [isStarAnimating, setIsStarAnimating] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  // load from localStorage or default to true, save to localStorage on change
  const [shouldAnimateFeedbackButton, setShouldAnimateFeedbackButton] = useState(true);
  const handleSetShouldAnimateFeedbackButtonState = (value: boolean) => {
    setShouldAnimateFeedbackButton(value);
    localStorage.setItem('shouldAnimateFeedbackButton', JSON.stringify(value));
  };
  const axiosClient = useAxiosClient();

  // Get current path on component mount
  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const animateFeedbackButton = localStorage.getItem('shouldAnimateFeedbackButton');
    if (animateFeedbackButton !== null) {
      setShouldAnimateFeedbackButton(JSON.parse(animateFeedbackButton));
    }
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

      <Link
        className={shouldAnimateFeedbackButton ? styles.feedbackButton : (styles.feedbackButton + ' ' + styles.nonAnimatedFeedbackButton)}
        onClick={()=>handleSetShouldAnimateFeedbackButtonState(false)}
        to="https://docs.google.com/forms/d/e/1FAIpQLSfqOwYEFe2L0_8clbVwxLxgyZGZ3kLl4nB_ONpr0ZzeURdWug/viewform?usp=header"
        target="_blank"
        rel="noopener noreferrer">
        <div className={styles.feedbackButtonInner}>
          Answer this survery to save my master's degree?
          <svg className={styles.feedbackButtonIcon} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="currentColor" d="M12.45 16.002a2.5 2.5 0 0 1-4.9 0zM9.998 2c3.149 0 5.744 2.335 5.984 5.355l.013.223l.005.224l-.001 3.606l.954 2.587l.025.085l.016.086l.005.089c0 .315-.196.59-.522.707l-.114.033l-.114.01H3.751a.8.8 0 0 1-.259-.047c-.287-.105-.476-.372-.482-.716l.004-.117l.034-.13l.95-2.584L4 7.793l.004-.225C4.127 4.451 6.771 2 9.998 2"/></svg>
        </div>
      </Link>
      </div>
  );
};

export default Navigation;
