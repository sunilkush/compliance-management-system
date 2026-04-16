import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@corp.com');
  const [password, setPassword] = useState('Password123!');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Compliance Portal Login</h2>
      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      <label>Password</label>
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
      {error && <p className="error">{error}</p>}
      <button type="submit">Sign In</button>
    </form>
  );
};

export default LoginForm;
