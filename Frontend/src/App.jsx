import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import AppLayout from './components/layout/AppLayout'
import LoginPage from './modules/auth/pages/LoginPage'
import SignupPage from './modules/auth/pages/SignupPage'
import DashboardPage from './modules/dashboard/pages/DashboardPage'
import EquipmentListPage from './modules/equipment/pages/EquipmentListPage'
import RequestListPage from './modules/requests/pages/RequestListPage'
import RequestKanbanPage from './modules/requests/pages/RequestKanbanPage'
import TeamsListPage from './modules/teams/pages/TeamsListPage'
import MaintenanceCalendarPage from './modules/calendar/pages/MaintenanceCalendarPage'
import ReportsPage from './modules/reports/pages/ReportsPage'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/calendar" element={<MaintenanceCalendarPage />} />
            <Route path="/equipment" element={<EquipmentListPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/teams" element={<TeamsListPage />} />
            <Route path="/requests" element={<RequestListPage />} />
            <Route path="/requests/kanban" element={<RequestKanbanPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
