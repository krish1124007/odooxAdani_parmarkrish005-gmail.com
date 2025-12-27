import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'

const UserProfile = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [isEditMode, setIsEditMode] = useState(false)

  // Mock user data - can be replaced with actual data from context/props
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+91 9876543210',
    joinDate: '2020-01-15',
    location: '123 Business Street, City, Country',
    role: 'Administration',
    status: 'ACTIVE',
    about: 'Senior Administrator with 5+ years of experience'
  })

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

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div style={{
      backgroundColor: isDark ? odooColors.darkBg : odooColors.lightBg,
      minHeight: '100vh',
      paddingTop: '2rem',
      paddingBottom: '3rem'
    }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Header with Title and Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: isDark ? '#f1f5f9' : '#1e293b',
            fontFamily: 'Inter, sans-serif',
            margin: 0
          }}>
            User Profile
          </h1>

          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              style={{
                backgroundColor: odooColors.primaryPurple,
                color: odooColors.white,
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#5a3a55'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = odooColors.primaryPurple
              }}
            >
              <i className="bi bi-pencil-square"></i>
              Edit Profile
            </button>

            <button
              onClick={() => navigate('/login')}
              style={{
                backgroundColor: odooColors.error,
                color: odooColors.white,
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#c0392b'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = odooColors.error
              }}
            >
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div style={{
          backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
          borderRadius: '12px',
          padding: '2.5rem',
          boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: isDark ? `1px solid ${odooColors.neutralGray}20` : 'none'
        }}>
          {/* Profile Header with Avatar and Basic Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '2rem',
            marginBottom: '3rem',
            paddingBottom: '2rem',
            borderBottom: `1px solid ${isDark ? odooColors.neutralGray + '20' : '#e2e8f0'}`
          }}>
            {/* Avatar */}
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '12px',
              backgroundColor: odooColors.secondaryTeal,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              color: odooColors.white,
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif',
              flexShrink: 0
            }}>
              {getInitials(userData.name)}
            </div>

            {/* Basic Info */}
            <div>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: isDark ? '#f1f5f9' : '#1e293b',
                fontFamily: 'Inter, sans-serif',
                margin: 0,
                marginBottom: '0.5rem'
              }}>
                {userData.name}
              </h2>
              <div style={{
                color: odooColors.secondaryTeal,
                fontSize: '1.1rem',
                fontWeight: '500',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '1rem'
              }}>
                {userData.role}
              </div>
              <div style={{
                display: 'inline-block',
                backgroundColor: odooColors.readyGreen,
                color: odooColors.white,
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif'
              }}>
                {userData.status}
              </div>
            </div>
          </div>

          {/* Contact Information Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Email */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              paddingBottom: '2rem',
              borderBottom: `1px solid ${isDark ? odooColors.neutralGray + '20' : '#e2e8f0'}`
            }}>
              <div style={{
                fontSize: '1.5rem',
                color: odooColors.secondaryTeal,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px'
              }}>
                <i className="bi bi-envelope"></i>
              </div>
              <div>
                <div style={{
                  fontSize: '0.85rem',
                  color: odooColors.neutralGray,
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.25rem',
                  textTransform: 'uppercase'
                }}>
                  EMAIL
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {userData.email}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              paddingBottom: '2rem',
              borderBottom: `1px solid ${isDark ? odooColors.neutralGray + '20' : '#e2e8f0'}`
            }}>
              <div style={{
                fontSize: '1.5rem',
                color: odooColors.secondaryTeal,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px'
              }}>
                <i className="bi bi-telephone"></i>
              </div>
              <div>
                <div style={{
                  fontSize: '0.85rem',
                  color: odooColors.neutralGray,
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.25rem',
                  textTransform: 'uppercase'
                }}>
                  PHONE
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {userData.phone}
                </div>
              </div>
            </div>

            {/* Join Date */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              paddingBottom: '2rem',
              borderBottom: `1px solid ${isDark ? odooColors.neutralGray + '20' : '#e2e8f0'}`
            }}>
              <div style={{
                fontSize: '1.5rem',
                color: odooColors.secondaryTeal,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px'
              }}>
                <i className="bi bi-calendar-event"></i>
              </div>
              <div>
                <div style={{
                  fontSize: '0.85rem',
                  color: odooColors.neutralGray,
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.25rem',
                  textTransform: 'uppercase'
                }}>
                  JOIN DATE
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {userData.joinDate}
                </div>
              </div>
            </div>

            {/* Location */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              paddingBottom: '2rem',
              borderBottom: `1px solid ${isDark ? odooColors.neutralGray + '20' : '#e2e8f0'}`
            }}>
              <div style={{
                fontSize: '1.5rem',
                color: odooColors.secondaryTeal,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '32px'
              }}>
                <i className="bi bi-geo-alt"></i>
              </div>
              <div>
                <div style={{
                  fontSize: '0.85rem',
                  color: odooColors.neutralGray,
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.25rem',
                  textTransform: 'uppercase'
                }}>
                  LOCATION
                </div>
                <div style={{
                  fontSize: '1rem',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {userData.location}
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              color: isDark ? '#f1f5f9' : '#1e293b',
              fontFamily: 'Inter, sans-serif',
              marginTop: '1.5rem',
              marginBottom: '1rem'
            }}>
              ABOUT
            </h3>
            <p style={{
              fontSize: '1rem',
              color: isDark ? '#cbd5e1' : '#64748b',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.6',
              margin: 0
            }}>
              {userData.about}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div style={{ marginTop: '2rem' }}>
          <button
            onClick={() => navigate('/user/tickets')}
            style={{
              backgroundColor: odooColors.neutralGray,
              color: odooColors.white,
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '500',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '0.9'
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '1'
            }}
          >
            <i className="bi bi-arrow-left"></i>
            Back to Tickets
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
