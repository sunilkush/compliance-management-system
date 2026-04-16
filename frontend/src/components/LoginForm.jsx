import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
  const { login, signup, forgotPassword, resetPassword } = useAuth();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('admin@corp.com');
  const [password, setPassword] = useState('Password123!');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('Password123!');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (mode === 'login') {
        await login(email, password);
        return;
      }

      if (mode === 'signup') {
        await signup({ name, email, password });
        return;
      }

      if (mode === 'forgot') {
        const data = await forgotPassword(email);
        setMessage(`${data.message}${data.resetToken ? ` | Demo token: ${data.resetToken}` : ''}`);
        return;
      }

      const data = await resetPassword({ token: resetToken, newPassword });
      setMessage(data.message);
      setMode('login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Request failed');
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Compliance Portal Auth</h2>
      <div className="auth-modes">
        <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
          Login
        </button>
        <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>
          Sign Up
        </button>
        <button type="button" className={mode === 'forgot' ? 'active' : ''} onClick={() => setMode('forgot')}>
          Forgot
        </button>
        <button type="button" className={mode === 'reset' ? 'active' : ''} onClick={() => setMode('reset')}>
          Reset
        </button>
      </div>

      {mode === 'signup' && (
        <>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" required />
        </>
      )}

      {mode !== 'reset' && (
        <>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </>
      )}

      {(mode === 'login' || mode === 'signup') && (
        <>
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </>
      )}

      {mode === 'reset' && (
        <>
          <label>Reset token</label>
          <input value={resetToken} onChange={(e) => setResetToken(e.target.value)} type="text" required />
          <label>New password</label>
          <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" required />
        </>
      )}

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <button type="submit">
        {mode === 'login' && 'Sign In'}
        {mode === 'signup' && 'Create Account'}
        {mode === 'forgot' && 'Generate Reset Token'}
        {mode === 'reset' && 'Set New Password'}
      </button>
    </form>
  );
};

export default LoginForm;
