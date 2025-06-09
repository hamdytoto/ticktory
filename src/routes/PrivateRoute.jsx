// components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/userContext'; // adjust path if needed

const PrivateRoute = () => {
    const { user } = useUser();

    return user ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
