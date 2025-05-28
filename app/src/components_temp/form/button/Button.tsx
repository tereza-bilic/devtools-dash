import styles from './Button.module.css';

interface ButtonProps {
  type: 'submit' | 'button';
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'green' | 'yellow' | 'blue' | 'orange';
  isDisabled?: boolean;
}

const Button = ({ type, children, onClick, color, isDisabled }: ButtonProps) => {

  const buttonColor = color ? styles[color] : styles.blue;

  return (
    <button type={type} className={styles.button + ' ' + buttonColor} onClick={onClick || undefined} disabled={isDisabled}>
      {children}
    </button>
  );
};


export default Button;
