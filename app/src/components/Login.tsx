// login form with fields nickname and password
import styles from './LevelGrid.module.css';
import { useState, FormEvent } from 'react';
import { axiosClient } from '../util/axiosClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('grant_type', 'password');
      formData.append('username', nickname);
      formData.append('password', password);

      await axiosClient.login_for_access_token_api_user_login_post(null, formData as any);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }

    await navigate('/', { replace: true });
  };

  return (
    <div className={styles.login}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default Login;
