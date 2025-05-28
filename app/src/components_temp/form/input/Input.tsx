{/* <div className={styles.inputWrapper}>
<label htmlFor="nickname" className={styles.label}>Nickname</label>
<input
  className={styles.input}
  type="text"
  value={nickname}
  onChange={(e) => setNickname(e.target.value)}
/>
</div> */}
// write the Input component here

import { ChangeEvent } from 'react';
import styles from './Input.module.css';

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, type, value, onChange }: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor="nickname" className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
