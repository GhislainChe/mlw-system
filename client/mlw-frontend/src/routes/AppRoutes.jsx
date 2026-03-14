import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Languages from '../pages/Languages';
import Leaderboard from '../pages/Leaderboard';
import LessonPlayer from '../pages/LessonPlayer';
import Lessons from '../pages/Lessons';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/learn" element={<LessonPlayer />} />
          <Route path="/learn/:lessonId" element={<LessonPlayer />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
