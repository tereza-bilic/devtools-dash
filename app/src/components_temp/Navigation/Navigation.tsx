import { TokenData } from '@devtools-dash/types/openapi';
import styles from './Navigation.module.css';
import { useState } from 'react';
import StarIcon from '@devtools-dash/components_temp/StarIcon';
import Button from '../form/button/Button';

const Navigation = (props: {user: TokenData, logout: () => void}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.container}>
      <Button
        type='button'
        onClick={() => {
          window.location.href = '/dashboard';
        }}
      >
        My Stats
      </Button>

      <Button
        type='button'
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Categories
      </Button>
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
