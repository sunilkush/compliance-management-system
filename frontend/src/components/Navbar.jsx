import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="nav">
      <div>
        <h1>Corporate Compliance Management</h1>
        <p>
          Signed in as <strong>{user?.name}</strong> ({user?.role})
        </p>
      </div>
      <button onClick={logout}>Logout</button>
    </header>
  );
};

export default Navbar;
