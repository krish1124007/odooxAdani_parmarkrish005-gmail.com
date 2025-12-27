import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/calendar', label: 'Maintenance Calendar' },
    { path: '/equipment', label: 'Equipment' },
    { path: '/reports', label: 'Reporting' },
    { path: '/teams', label: 'Teams' },
  ]

  return (
    <nav className="navbar-top">
      <div className="navbar-container">
        {/* Brand/Logo - Left Side */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <svg className="odoo-logo" viewBox="0 0 142 40" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="30" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="300" fill="#714B67">odoo</text>
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

          {/* Try it free Button */}
          <Link to="/signup" className="btn-try-free">
            Try it free
          </Link>

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
