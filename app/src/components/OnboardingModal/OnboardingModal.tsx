import { useEffect, useState } from 'react';
import styles from './OnboardingModal.module.css';

interface OnboardingModalProps {
  isFirstVisit: boolean;
  onComplete: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isFirstVisit, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isFirstVisit) {
      // Check if the user has already seen the onboarding modal
      const hasViewedOnboarding = localStorage.getItem('onboardingCompleted') === 'true';

      // Only show the modal if it's the user's first visit and they haven't seen it before
      if (hasViewedOnboarding) {
        setIsVisible(false);
      }
    }
  }, [isFirstVisit]);

  const handleComplete = () => {
    // Save to localStorage only if it's the first visit
    if (isFirstVisit) {
      localStorage.setItem('onboardingCompleted', 'true');
      console.log('Onboarding tutorial completed, preference saved to localStorage');
    }
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Welcome to DevToolsDash!</h2>
          <button className={styles.closeButton} onClick={handleComplete}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.introSection}>
            <h3 className={styles.introTitle}>
              Master Browser DevTools
            </h3>
            <p className={styles.introText}>
              This interactive game will teach you how to use browser developer tools through
              fun challenges across different categories. Complete levels, earn points,
              and become a DevTools master!
            </p>
          </div>

          <div className={styles.iconGrid}>
            <div className={styles.iconBox}>
              <div className={styles.iconCircle}>
                <img src="/images/onboarding/welcome.svg" alt="Welcome" className={styles.icon} />
              </div>
              <div className={styles.iconLabel}>Interactive Challenges</div>
            </div>
            <div className={styles.iconBox}>
              <div className={styles.iconCircle}>
                <img src="/images/onboarding/devtools.svg" alt="DevTools" className={styles.icon} />
              </div>
              <div className={styles.iconLabel}>Real DevTools Skills</div>
            </div>
            <div className={styles.iconBox}>
              <div className={styles.iconCircle}>
                <img src="/images/onboarding/panel.svg" alt="Categories" className={styles.icon} />
              </div>
              <div className={styles.iconLabel}>Multiple Categories</div>
            </div>
            <div className={styles.iconBox}>
              <div className={styles.iconCircle}>
                <img src="/images/onboarding/secret.svg" alt="Rewards" className={styles.icon} />
              </div>
              <div className={styles.iconLabel}>Points & Badges</div>
            </div>
          </div>

          <div className={styles.stepsContainer}>
            <h3 className={styles.stepsTitle}>How to Play:</h3>

            <div className={styles.gameStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Open DevTools</div>
                <div className={styles.stepDesc}>
                  Start by opening the browser's DevTools with <strong>F12</strong> or <strong>right-click → Inspect</strong>.
                  This is your main toolkit for all challenges!
                </div>
              </div>
            </div>

            <div className={styles.gameStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Select the Right Panel</div>
                <div className={styles.stepDesc}>
                  Each challenge belongs to a DevTools category: <b>Elements</b>, <b>Console</b>, <b>Network</b>, <b>Application</b>, or <b>Sources</b>. Navigate to the relevant panel to solve the puzzle.
                </div>
              </div>
            </div>

            <div className={styles.gameStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Find the Secret Code</div>
                <div className={styles.stepDesc}>
                  Use your DevTools skills to discover the hidden secret code (typically a 6-character
                  alphanumeric string) within the page or its resources.
                </div>
              </div>
            </div>

            <div className={styles.gameStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>Submit & Earn Rewards</div>
                <div className={styles.stepDesc}>
                  Submit the code to complete the level, earn points on the leaderboard, unlock
                  achievements, and most importantly, master essential web development skills!
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <div className={styles.footerContent}>
            <button
              className={styles.startButton}
              onClick={handleComplete}
            >
              Start Your Adventure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
