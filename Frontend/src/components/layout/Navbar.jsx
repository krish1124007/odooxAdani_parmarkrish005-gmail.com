import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  // Odoo Color Palette
  const odooColors = {
    primaryPurple: '#714B67',
    secondaryTeal: '#017E84',
    neutralGray: '#8F8F8F',
    readyGreen: '#21B799',
    gold: '#E4A900',
    white: '#ffffff',
    darkBg: '#0a0e1a',
    cardBg: '#1e2a3f',
    lightBg: '#f8f9fa',
    error: '#e74c3c'
  }

  const isCreateTicketActive = location.pathname === '/user/create-ticket'
  const isViewTicketsActive = location.pathname === '/user/tickets'

  return (
    <nav style={{
      backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
      borderBottom: `1px solid ${isDark ? odooColors.neutralGray + '20' : '#e2e8f0'}`,
      padding: '0.6rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: isDark ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Left side: GearGuard Logo */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: 'pointer',
        transition: 'opacity 0.3s ease'
      }}
      onClick={() => navigate('/dashboard')}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
        <div style={{
          fontSize: '1.5rem',
          color: odooColors.secondaryTeal,
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          backgroundColor: odooColors.secondaryTeal + '20'
        }}>
          <i className="bi bi-gear-fill" style={{ fontSize: '1.25rem' }}></i>
        </div>
        <div style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: isDark ? '#f1f5f9' : '#1e293b',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.5px'
        }}>
          GearGuard
        </div>
      </div>

      {/* Center: Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <button
          onClick={() => navigate('/user/create-ticket')}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: isCreateTicketActive ? odooColors.secondaryTeal : odooColors.neutralGray,
            fontSize: '1rem',
            fontWeight: isCreateTicketActive ? '600' : '500',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            paddingBottom: '0.5rem',
            borderBottom: isCreateTicketActive ? `2px solid ${odooColors.secondaryTeal}` : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            if (!isCreateTicketActive) {
              e.target.style.color = isDark ? '#f1f5f9' : '#1e293b'
            }
          }}
          onMouseLeave={(e) => {
            if (!isCreateTicketActive) {
              e.target.style.color = odooColors.neutralGray
            }
          }}
        >
          <i className="bi bi-plus-circle" style={{ fontSize: '1.1rem' }}></i>
          Create Request
        </button>

        <button
          onClick={() => navigate('/user/tickets')}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: isViewTicketsActive ? odooColors.secondaryTeal : odooColors.neutralGray,
            fontSize: '1rem',
            fontWeight: isViewTicketsActive ? '600' : '500',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            paddingBottom: '0.5rem',
            borderBottom: isViewTicketsActive ? `2px solid ${odooColors.secondaryTeal}` : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
          onMouseEnter={(e) => {
            if (!isViewTicketsActive) {
              e.target.style.color = isDark ? '#f1f5f9' : '#1e293b'
            }
          }}
          onMouseLeave={(e) => {
            if (!isViewTicketsActive) {
              e.target.style.color = odooColors.neutralGray
            }
          }}
        >
          <i className="bi bi-ticket-detailed" style={{ fontSize: '1.1rem' }}></i>
          View Requests
        </button>
      </div>

      {/* Right side: Profile Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <button
          onClick={() => navigate('/user/profile')}
          style={{
            backgroundColor: isDark ? odooColors.primaryPurple + '20' : odooColors.primaryPurple + '10',
            color: isDark ? '#f1f5f9' : '#1e293b',
            border: 'none',
            borderRadius: '50%',
            padding: '0.5rem',
            cursor: 'pointer',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '45px',
            height: '45px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = isDark ? odooColors.primaryPurple + '40' : odooColors.primaryPurple + '20'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = isDark ? odooColors.primaryPurple + '20' : odooColors.primaryPurple + '10'
          }}
        >
          <i className="bi bi-person-circle"></i>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
