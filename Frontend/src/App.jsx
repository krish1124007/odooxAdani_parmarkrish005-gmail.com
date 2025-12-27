import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'
import LoginPage from './modules/auth/pages/LoginPage'
import EmailLogin from './modules/auth/pages/EmailLogin'
import DashboardPage from './modules/dashboard/pages/DashboardPage'
import UserDashboard from './modules/dashboard/pages/UserDashboard'
import TechnicianDashboard from './modules/dashboard/pages/TechnicianDashboard'
import EquipmentListPage from './modules/equipment/pages/EquipmentListPage'
import RequestListPage from './modules/requests/pages/RequestListPage'
import RequestKanbanPage from './modules/requests/pages/RequestKanbanPage'
import TeamsListPage from './modules/teams/pages/TeamsListPage'
import CreateRequestPage from './modules/requests/pages/CreateRequestPage'
import UserRequestsPage from './modules/requests/pages/UserRequestsPage'
import TechnicianTasksPage from './modules/requests/pages/TechnicianTasksPage'
import FeedbackPage from './modules/requests/pages/FeedbackPage'
import MaintenanceCalendarPage from './modules/calendar/pages/MaintenanceCalendarPage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<EmailLogin />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Admin Routes - Protected */}
            <Route path="/dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardPage />} />
              <Route path="equipment" element={<EquipmentListPage />} />
              <Route path="requests" element={<RequestListPage />} />
              <Route path="requests/kanban" element={<RequestKanbanPage />} />
              <Route path="teams" element={<TeamsListPage />} />
              <Route path="calendar" element={<MaintenanceCalendarPage />} />
            </Route>

            {/* User Routes - Protected */}
            <Route path="/user" element={
              <ProtectedRoute requiredRole="user">
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<UserDashboard />} />
              <Route path="create-request" element={<CreateRequestPage />} />
              <Route path="requests" element={<UserRequestsPage />} />
              <Route path="feedback" element={<FeedbackPage />} />
              <Route path="*" element={<UserDashboard />} />
            </Route>

            {/* Technician Routes - Protected */}
            <Route path="/technician" element={
              <ProtectedRoute requiredRole="technician">
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<TechnicianDashboard />} />
              <Route path="tasks" element={<TechnicianTasksPage />} />
              <Route path="*" element={<TechnicianDashboard />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
