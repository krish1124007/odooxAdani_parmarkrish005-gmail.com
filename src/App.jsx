import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import LoginPage from './modules/auth/pages/LoginPage'
import DashboardPage from './modules/dashboard/pages/DashboardPage'
import EquipmentListPage from './modules/equipment/pages/EquipmentListPage'
import RequestListPage from './modules/requests/pages/RequestListPage'
import RequestKanbanPage from './modules/requests/pages/RequestKanbanPage'
import TeamsListPage from './modules/teams/pages/TeamsListPage'
import MaintenanceCalendarPage from './modules/calendar/pages/MaintenanceCalendarPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="equipment" element={<EquipmentListPage />} />
          <Route path="requests" element={<RequestListPage />} />
          <Route path="requests/kanban" element={<RequestKanbanPage />} />
          <Route path="teams" element={<TeamsListPage />} />
          <Route path="calendar" element={<MaintenanceCalendarPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
