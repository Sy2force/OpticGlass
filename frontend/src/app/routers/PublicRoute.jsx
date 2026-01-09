import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirection basée sur le rôle
    const from = location.state?.from?.pathname || (isAdmin ? '/admin' : '/user/dashboard');
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;
