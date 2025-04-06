import { TokenData } from 'src/types/openapi';
import styles from './Navigation.module.css';
import { useState } from 'react';
import StarIcon from 'src/components/StarIcon';

const Navigation = (props: {user: TokenData, logout: () => void}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.container}>
      <StarIcon/>
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
    </div>
  );
};

export default Navigation;
