// Application Routes Configuration
import { lazy } from 'react';

// Lazy load pages for better performance
const LoginPage = lazy(() => import('../modules/auth/pages/LoginPage'));
const SignupPage = lazy(() => import('../modules/auth/pages/SignupPage'));
const DashboardPage = lazy(() => import('../modules/dashboard/pages/DashboardPage'));
const EquipmentListPage = lazy(() => import('../modules/equipment/pages/EquipmentListPage'));
const RequestListPage = lazy(() => import('../modules/requests/pages/RequestListPage'));
const RequestKanbanPage = lazy(() => import('../modules/requests/pages/RequestKanbanPage'));
const TeamsListPage = lazy(() => import('../modules/teams/pages/TeamsListPage'));
const MaintenanceCalendarPage = lazy(() => import('../modules/calendar/pages/MaintenanceCalendarPage'));
const WorkLogPage = lazy(() => import('../modules/activity/pages/WorkLogPage'));
const SettingsPage = lazy(() => import('../modules/settings/pages/SettingsPage'));
const ReportsPage = lazy(() => import('../modules/reports/pages/ReportsPage'));

// Route configuration
export const routes = [
  // Public routes
  {
    path: '/login',
    element: LoginPage,
    isPublic: true
  },
  {
    path: '/signup',
    element: SignupPage,
    isPublic: true
  },
  
  // Protected routes
  {
    path: '/',
    element: DashboardPage,
    isPublic: false
  },
  {
    path: '/dashboard',
    element: DashboardPage,
    isPublic: false
  },
  {
    path: '/equipment',
    element: EquipmentListPage,
    isPublic: false
  },
  {
    path: '/requests',
    element: RequestListPage,
    isPublic: false
  },
  {
    path: '/requests/kanban',
    element: RequestKanbanPage,
    isPublic: false
  },
  {
    path: '/teams',
    element: TeamsListPage,
    isPublic: false
  },
  {
    path: '/calendar',
    element: MaintenanceCalendarPage,
    isPublic: false
  },
  {
    path: '/activity',
    element: WorkLogPage,
    isPublic: false
  },
  {
    path: '/settings',
    element: SettingsPage,
    isPublic: false
  },
  {
    path: '/reports',
    element: ReportsPage,
    isPublic: false
  }
];

export default routes;
