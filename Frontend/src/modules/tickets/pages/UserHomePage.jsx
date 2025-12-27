import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'

const UserHomePage = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [userName, setUserName] = useState('User')
  const [totalTickets, setTotalTickets] = useState(0)
  const [openTickets, setOpenTickets] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

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
    lightBg: '#f8f9fa'
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}')
    if (userData.name) {
      setUserName(userData.name)
    }

    const tickets = JSON.parse(localStorage.getItem('userTickets') || '[]')
    setTotalTickets(tickets.length)
    const openCount = tickets.filter(t => t.status === 'open' || t.status === 'in progress').length
    setOpenTickets(openCount)
  }, [])

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate('/user/tickets?search=' + encodeURIComponent(searchQuery))
    }
  }

  return (
    <div style={{
      backgroundColor: isDark ? odooColors.darkBg : odooColors.lightBg,
      minHeight: 'calc(100vh - 70px)',
      paddingTop: '3rem',
      paddingBottom: '3rem'
    }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem',
        paddingTop: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: '700',
          color: odooColors.primaryPurple,
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-1px',
          marginBottom: '0.5rem'
        }}>
          Hi {userName}, how can we help you?
        </h1>
        <p style={{
          fontSize: '1.15rem',
          color: odooColors.neutralGray,
          fontFamily: 'Inter, sans-serif',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Submit a ticket, track your issues, or browse our knowledge base
        </p>
      </div>

      {/* Search Bar */}
      <div className="container" style={{ maxWidth: '800px', marginBottom: '4rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
          borderRadius: '10px',
          padding: '1rem 1.5rem',
          boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: isDark ? `1px solid ${odooColors.neutralGray}20` : 'none'
        }}>
          <i className="bi bi-search" style={{
            fontSize: '1.3rem',
            color: odooColors.neutralGray,
            marginRight: '1rem'
          }}></i>
          <input
            type="text"
            placeholder="Search for help or describe your issue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
            style={{
              flex: 1,
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '1rem',
              fontFamily: 'Inter, sans-serif',
              color: isDark ? '#f1f5f9' : '#1e293b',
              outline: 'none'
            }}
          />
          <button
            onClick={() => {
              if (searchQuery.trim()) {
                navigate('/user/tickets?search=' + encodeURIComponent(searchQuery))
              }
            }}
            style={{
              backgroundColor: odooColors.secondaryTeal,
              color: odooColors.white,
              border: 'none',
              borderRadius: '6px',
              padding: '0.6rem 1.5rem',
              marginLeft: '1rem',
              cursor: 'pointer',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#015a60'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = odooColors.secondaryTeal
            }}
          >
            <i className="bi bi-arrow-right me-2"></i>Search
          </button>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="container" style={{ maxWidth: '1200px', marginBottom: '4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {/* Create Ticket Card */}
          <div
            onClick={() => navigate('/user/create-ticket')}
            style={{
              backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: isDark ? `1px solid ${odooColors.neutralGray}20` : 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              borderTop: `4px solid ${odooColors.secondaryTeal}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = isDark ? 'none' : '0 8px 16px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{
              fontSize: '3rem',
              color: odooColors.secondaryTeal,
              marginBottom: '1rem'
            }}>
              <i className="bi bi-plus-circle-fill"></i>
            </div>
            <h3 style={{
              fontSize: '1.4rem',
              fontWeight: '700',
              color: isDark ? '#f1f5f9' : '#1e293b',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '0.5rem'
            }}>
              Submit a Ticket
            </h3>
            <p style={{
              fontSize: '1rem',
              color: odooColors.neutralGray,
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.5'
            }}>
              Describe your issue by filling out our support ticket form and we'll get back to you shortly.
            </p>
          </div>

          {/* View Tickets Card */}
          <div
            onClick={() => navigate('/user/tickets')}
            style={{
              backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: isDark ? `1px solid ${odooColors.neutralGray}20` : 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              borderTop: `4px solid ${odooColors.primaryPurple}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = isDark ? 'none' : '0 8px 16px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{
              fontSize: '3rem',
              color: odooColors.primaryPurple,
              marginBottom: '1rem'
            }}>
              <i className="bi bi-ticket-detailed"></i>
            </div>
            <h3 style={{
              fontSize: '1.4rem',
              fontWeight: '700',
              color: isDark ? '#f1f5f9' : '#1e293b',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '0.5rem'
            }}>
              View All Tickets
            </h3>
            <p style={{
              fontSize: '1rem',
              color: odooColors.neutralGray,
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.5'
            }}>
              Track all your ticket's progress and your interaction with support team.
            </p>
          </div>

          {/* Knowledge Base Card */}
          <div
            style={{
              backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)',
              border: isDark ? `1px solid ${odooColors.neutralGray}20` : 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              borderTop: `4px solid ${odooColors.readyGreen}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)'
              e.currentTarget.style.boxShadow = isDark ? 'none' : '0 8px 16px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{
              fontSize: '3rem',
              color: odooColors.readyGreen,
              marginBottom: '1rem'
            }}>
              <i className="bi bi-book"></i>
            </div>
            <h3 style={{
              fontSize: '1.4rem',
              fontWeight: '700',
              color: isDark ? '#f1f5f9' : '#1e293b',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '0.5rem'
            }}>
              Browse Help Articles
            </h3>
            <p style={{
              fontSize: '1rem',
              color: odooColors.neutralGray,
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.5'
            }}>
              Explore how-to's and learn best practices from our knowledge base.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{
          backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
          borderRadius: '12px',
          padding: '2.5rem',
          boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: isDark ? `1px solid ${odooColors.neutralGray}20` : 'none'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: isDark ? '#f1f5f9' : '#1e293b',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '2rem'
          }}>
            Your Support Summary
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {/* Total Tickets */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: odooColors.secondaryTeal,
                fontFamily: 'Inter, sans-serif',
                marginBottom: '0.5rem'
              }}>
                {totalTickets}
              </div>
              <p style={{
                fontSize: '1rem',
                color: odooColors.neutralGray,
                fontFamily: 'Inter, sans-serif'
              }}>
                <i className="bi bi-ticket-detailed me-2" style={{ color: odooColors.secondaryTeal }}></i>
                Total Tickets
              </p>
            </div>

            {/* Open Tickets */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: odooColors.primaryPurple,
                fontFamily: 'Inter, sans-serif',
                marginBottom: '0.5rem'
              }}>
                {openTickets}
              </div>
              <p style={{
                fontSize: '1rem',
                color: odooColors.neutralGray,
                fontFamily: 'Inter, sans-serif'
              }}>
                <i className="bi bi-hourglass-split me-2" style={{ color: odooColors.primaryPurple }}></i>
                Open Tickets
              </p>
            </div>

            {/* Average Response */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: odooColors.readyGreen,
                fontFamily: 'Inter, sans-serif',
                marginBottom: '0.5rem'
              }}>
                2h
              </div>
              <p style={{
                fontSize: '1rem',
                color: odooColors.neutralGray,
                fontFamily: 'Inter, sans-serif'
              }}>
                <i className="bi bi-clock-history me-2" style={{ color: odooColors.readyGreen }}></i>
                Avg Response
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserHomePage
