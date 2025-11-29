import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RequireAuth() {
    const { currentUser } = useAuth();
    const location = useLocation();

    return currentUser
        ? <Outlet />
        : <Navigate to="/login" replace state={{ from: location }} />;
}
