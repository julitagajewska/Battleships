import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';

export default function PrivateRoutes() {
    const auth = useAuth();

    if (auth.user === null) {
        return <Navigate to='/notLoggedIn' />
    }

    return (<Outlet />);
}
