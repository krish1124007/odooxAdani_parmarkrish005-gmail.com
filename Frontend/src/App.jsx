import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import AppLayout from './components/layout/AppLayout'
import LoginPage from './modules/auth/pages/LoginPage'
import EmailLogin from './modules/auth/pages/EmailLogin'
import DashboardPage from './modules/dashboard/pages/DashboardPage'
import EquipmentListPage from './modules/equipment/pages/EquipmentListPage'
import RequestListPage from './modules/requests/pages/RequestListPage'
import RequestKanbanPage from './modules/requests/pages/RequestKanbanPage'
import TeamsListPage from './modules/teams/pages/TeamsListPage'
import MaintenanceCalendarPage from './modules/calendar/pages/MaintenanceCalendarPage'
// import CreateTicket from './modules/tickets/pages/CreateTicket'
// import ShowTickets from './modules/tickets/pages/ShowTickets'
// import UserHomePage from './modules/tickets/pages/UserHomePage'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<EmailLogin />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Admin Routes */}
          <Route path="/dashboard" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="equipment" element={<EquipmentListPage />} />
            <Route path="requests" element={<RequestListPage />} />
            <Route path="requests/kanban" element={<RequestKanbanPage />} />
            <Route path="teams" element={<TeamsListPage />} />
            <Route path="calendar" element={<MaintenanceCalendarPage />} />
          </Route>

          {/* User Routes */}
          {/* <Route path="/user">
            <Route index element={<UserHomePage />} />
            <Route path="tickets" element={<ShowTickets />} />
            <Route path="create-ticket" element={<CreateTicket />} />
          </Route> */}
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
