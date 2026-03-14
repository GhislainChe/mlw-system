import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Landing from '../pages/Landing';
import Languages from '../pages/Languages';
import Leaderboard from '../pages/Leaderboard';
import LessonPlayer from '../pages/LessonPlayer';
import Lessons from '../pages/Lessons';
import Login from '../pages/Login';
import Register from '../pages/Register';

function getIsAuthenticated() {
  return Boolean(localStorage.getItem('mlw_token'));
}

function PublicHomeRoute() {
  return getIsAuthenticated() ? <Navigate to="/dashboard" replace /> : <Landing />;
}

function AuthPageRoute({ children }) {
  return getIsAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicHomeRoute />} />
        <Route
          path="/login"
          element={
            <AuthPageRoute>
              <Login />
            </AuthPageRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthPageRoute>
              <Register />
            </AuthPageRoute>
          }
        />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/learn" element={<LessonPlayer />} />
          <Route path="/learn/:lessonId" element={<LessonPlayer />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
