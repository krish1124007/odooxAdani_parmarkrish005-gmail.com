import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation()
  const { role } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  let menuItems = [];

  if (role === 'admin') {
    menuItems = [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/dashboard/calendar', label: 'Maintenance Calendar' },
      { path: '/dashboard/equipment', label: 'Equipment' },
      { path: '/dashboard/requests', label: 'Reporting' },
      { path: '/dashboard/teams', label: 'Teams' },
    ];
  } else if (role === 'user') {
    menuItems = [
      { path: '/user', label: 'Dashboard' },
      { path: '/user/create-request', label: 'New Request' },
      { path: '/user/requests', label: 'My Requests' },
    ];
  } else if (role === 'technician') {
    menuItems = [
      { path: '/technician', label: 'Dashboard' },
      { path: '/technician/tasks', label: 'My Tasks' },
    ];
  } else {
    // Default or public
    menuItems = [];
  }

  return (
    <nav className="navbar-top">
      <div className="navbar-container">
        {/* Brand/Logo - Left Side */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <svg className="odoo-logo" viewBox="0 0 142 40" xmlns="">
              <text x="10" y="30" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="300" fill="#714B67">GearGuard</text>
            </svg>
          </Link>
        </div>

        {/* Navigation Links - Center */}
        <div className={`navbar-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-links">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* User Icon */}
          <button className="navbar-icon-btn">
            <i className="bi bi-person-circle"></i>
          </button>



          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`bi ${mobileMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
