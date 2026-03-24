import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/AdminDashboard';
import AdminLanguages from '../pages/AdminLanguages';
import AdminLessons from '../pages/AdminLessons';
import AdminUsers from '../pages/AdminUsers';
import DashboardLayout from '../layouts/DashboardLayout';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import Landing from '../pages/Landing';
import Leaderboard from '../pages/Leaderboard';
import LessonPlayer from '../pages/LessonPlayer';
import Lessons from '../pages/Lessons';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Settings from '../pages/Settings';
import AdminRoute from './AdminRoute';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lessons/:languageId" element={<Lessons />} />
            <Route path="/lesson/:lessonId" element={<LessonPlayer />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/languages" element={<AdminLanguages />} />
            <Route path="/admin/lessons" element={<AdminLessons />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
