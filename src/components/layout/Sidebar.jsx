import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const Sidebar = () => {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { path: '/', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/equipment', icon: 'bi-gear-fill', label: 'Equipment' },
    { path: '/requests', icon: 'bi-wrench', label: 'Maintenance Requests' },
    { path: '/requests/kanban', icon: 'bi-kanban', label: 'Kanban Board' },
    { path: '/calendar', icon: 'bi-calendar-event', label: 'Calendar' },
    { path: '/teams', icon: 'bi-people-fill', label: 'Teams' },
    { path: '/reports', icon: 'bi-graph-up', label: 'Reports' },
  ]

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand d-flex align-items-center justify-content-between">
        {!isCollapsed && (
          <>
            <span>🛠️ GearGuard</span>
            <button 
              className="btn btn-sm" 
              onClick={() => setIsCollapsed(true)}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </>
        )}
        {isCollapsed && (
          <button 
            className="btn btn-sm w-100" 
            onClick={() => setIsCollapsed(false)}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li className="nav-item" key={item.path}>
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto p-3 border-top">
        <div className="d-flex align-items-center">
          <div className="avatar avatar-sm">
            <i className="bi bi-person-fill"></i>
          </div>
          {!isCollapsed && (
            <div className="ms-2">
              <div className="fw-bold small">Admin User</div>
              <div className="text-muted" style={{ fontSize: '0.75rem' }}>Administrator</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
