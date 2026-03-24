import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import Landing from '../pages/Landing';
import Leaderboard from '../pages/Leaderboard';
import LessonPlayer from '../pages/LessonPlayer';
import Lessons from '../pages/Lessons';
import Login from '../pages/Login';
import Register from '../pages/Register';
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
            <Route path="/profile" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
