// login form with fields nickname and password
import { useState, FormEvent } from 'react';
import { axiosClient } from 'src/util/axiosClient';
import { useAuth } from 'src/context/AuthContext';
import { AnonymousGuard } from 'src/components/AnonymousGuard';
import { isAxiosError } from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
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
      <div>
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
          <button type="submit">Signup</button>
          {error && <div>{error}</div>}
        </form>
      </div>
      <Link to="/login">Login</Link>
    </AnonymousGuard>
  );
}

export default Signup;
