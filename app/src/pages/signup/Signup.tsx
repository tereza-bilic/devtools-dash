// login form with fields nickname and password
import { useState, FormEvent } from 'react';
import { useAxiosClient } from '@devtools-dash/context/AxiosContext';
import { useAuth } from '@devtools-dash/context/AuthContext';
import { AnonymousGuard } from '@devtools-dash/guards/AnonymousGuard';
import { isAxiosError } from 'axios';
import { Link } from 'react-router-dom';
import Input from '@devtools-dash/components/form/input/Input';
import Button from '@devtools-dash/components/form/button/Button';

import styles from './Signup.module.css';

const Signup = () => {
  const axiosClient = useAxiosClient();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {refresh: refreshUser} = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('grant_type', 'password');
      formData.append('username', nickname);
      formData.append('password', password);

      await axiosClient.register_api_user_register_post(null, formData as any);

      refreshUser();

    } catch (error: unknown) {
        if (isAxiosError(error)) {
          setError(error.response?.data.detail || 'An API error occurred');
        }
        throw error;
    }
  };

  return (
    <AnonymousGuard>
      <form onSubmit={handleSubmit} className={styles.signup}>
        <Input label="Nickname" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className={styles.buttonWrapper}>
          <span className="small">Already have an account?
            <Link to="/login"> Login</Link>
          </span>

          <Button type="submit">Signup</Button>
        </div>

        {error && <div className={styles.error}>{error}</div>}
      </form>
    </AnonymousGuard>
  );
}

export default Signup;
