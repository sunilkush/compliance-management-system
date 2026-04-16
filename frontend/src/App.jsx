import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <main className="centered">
        <LoginForm />
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <DashboardPage />
    </>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
