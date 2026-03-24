import { Navigate, Outlet } from 'react-router-dom';

import { getToken, getUserRole } from '../utils/auth';

export default function AdminRoute() {
  if (!getToken()) {
    return <Navigate to="/login" replace />;
  }

  if (getUserRole() !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
