import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'

const ShowTickets = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [searchParams] = useSearchParams()
  const [tickets, setTickets] = useState([])
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [statusFilter, setStatusFilter] = useState('all')
  const [filteredTickets, setFilteredTickets] = useState([])

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
    error: '#dc3545'
  }

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('userTickets') || '[]')
    setTickets(savedTickets)
  }, [])

  useEffect(() => {
    let filtered = tickets

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(ticket =>
        (ticket.name && ticket.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ticket.equipment && ticket.equipment.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ticket.description && ticket.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ticket.serialNo && ticket.serialNo.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter)
    }

    setFilteredTickets(filtered)
  }, [tickets, searchQuery, statusFilter])

  const getPriorityColor = (maintenanceType) => {
    const colors = {
      'Preventive': odooColors.readyGreen,
      'Corrective': odooColors.gold,
      'low': odooColors.readyGreen,
      'medium': odooColors.gold,
      'high': '#f97316',
      'critical': odooColors.error
    }
    return colors[maintenanceType] || odooColors.neutralGray
  }

  const getStatusColor = (status) => {
    const colors = {
      'open': odooColors.gold,
      'in progress': odooColors.primaryPurple,
      'resolved': odooColors.readyGreen,
      'closed': odooColors.neutralGray
    }
    return colors[status] || odooColors.neutralGray
  }

  return (
    <div style={{
      backgroundColor: isDark ? odooColors.darkBg : odooColors.lightBg,
      minHeight: '100vh',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Header Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem'
        }}>
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: isDark ? '#f1f5f9' : '#1e293b',
              fontFamily: 'Inter, sans-serif',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <i className="bi bi-ticket-detailed" style={{ color: odooColors.secondaryTeal, fontSize: '2rem' }}></i>
              My Tickets
            </h1>
          </div>
          <button
            onClick={() => navigate('/user/create-ticket')}
            style={{
              backgroundColor: odooColors.secondaryTeal,
              color: odooColors.white,
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#015a60'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = odooColors.secondaryTeal
              e.target.style.transform = 'translateY(0)'
            }}
          >
            <i className="bi bi-plus-circle"></i>
            Create Ticket
          </button>
        </div>

        {/* Search and Filter Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 250px',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          {/* Search Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
            borderRadius: '8px',
            padding: '0 1rem',
            border: `1px solid ${isDark ? odooColors.neutralGray + '20' : '#e2e8f0'}`,
            boxShadow: isDark ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.05)'
          }}>
            <i className="bi bi-search" style={{ color: odooColors.neutralGray, marginRight: '0.75rem', fontSize: '1.2rem' }}></i>
            <input
              type="text"
              placeholder="Search tickets by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                backgroundColor: 'transparent',
                color: isDark ? '#f1f5f9' : '#1e293b',
                fontSize: '1rem',
                fontFamily: 'Inter, sans-serif',
                padding: '0.75rem 0',
                outline: 'none'
              }}
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
              color: isDark ? '#f1f5f9' : '#1e293b',
              border: `1px solid ${isDark ? odooColors.neutralGray + '20' : '#e2e8f0'}`,
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = odooColors.secondaryTeal
            }}
            onBlur={(e) => {
              e.target.style.borderColor = isDark ? odooColors.neutralGray + '20' : '#e2e8f0'
            }}
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Tickets List or Empty State */}
        {filteredTickets.length === 0 ? (
          <div style={{
            backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
            borderRadius: '12px',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: isDark ? `1px solid ${odooColors.neutralGray}20` : 'none'
          }}>
            <div style={{
              fontSize: '5rem',
              color: odooColors.neutralGray + '40',
              marginBottom: '1.5rem'
            }}>
              <i className="bi bi-briefcase"></i>
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: isDark ? '#f1f5f9' : '#1e293b',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '0.5rem'
            }}>
              No tickets yet
            </h3>
            <p style={{
              fontSize: '1rem',
              color: odooColors.neutralGray,
              fontFamily: 'Inter, sans-serif',
              marginBottom: '2rem'
            }}>
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first ticket to get started'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <button
                onClick={() => navigate('/user/create-ticket')}
                style={{
                  backgroundColor: odooColors.secondaryTeal,
                  color: odooColors.white,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#015a60'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = odooColors.secondaryTeal
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                <i className="bi bi-plus-circle"></i>
                Create Ticket
              </button>
            )}
          </div>
        ) : (
          <div>
            {/* Tickets List */}
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                style={{
                  backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  borderLeft: `5px solid ${getPriorityColor(ticket.maintenanceType)}`,
                  boxShadow: isDark ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.05)',
                  border: isDark ? `1px solid ${odooColors.neutralGray}20` : `1px solid #e2e8f0`,
                  borderLeftWidth: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = isDark ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = isDark ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem' }}>
                  {/* Left Content */}
                  <div>
                    {/* Badges */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <span style={{
                        backgroundColor: getStatusColor(ticket.status),
                        color: odooColors.white,
                        padding: '0.35rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                      <span style={{
                        backgroundColor: getPriorityColor(ticket.maintenanceType),
                        color: odooColors.white,
                        padding: '0.35rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {ticket.maintenanceType}
                      </span>
                      <span style={{
                        backgroundColor: odooColors.primaryPurple + '40',
                        color: odooColors.primaryPurple,
                        padding: '0.35rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {ticket.category}
                      </span>
                    </div>

                    {/* Equipment and Serial */}
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: isDark ? '#f1f5f9' : '#1e293b',
                      fontFamily: 'Inter, sans-serif',
                      margin: '0 0 0.75rem 0'
                    }}>
                      <i className="bi bi-tools" style={{ marginRight: '0.5rem', color: odooColors.secondaryTeal }}></i>
                      {ticket.equipment} {ticket.serialNo && `(SN: ${ticket.serialNo})`}
                    </h4>

                    {/* Description Preview */}
                    <p style={{
                      fontSize: '0.95rem',
                      color: odooColors.neutralGray,
                      fontFamily: 'Inter, sans-serif',
                      margin: '0 0 0.75rem 0',
                      lineHeight: '1.5'
                    }}>
                      {ticket.description.substring(0, 150)}
                      {ticket.description.length > 150 ? '...' : ''}
                    </p>

                    {/* Ticket Details Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1rem',
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: `1px solid ${isDark ? odooColors.neutralGray + '20' : '#e2e8f0'}`
                    }}>
                      <div>
                        <p style={{
                          fontSize: '0.85rem',
                          color: odooColors.neutralGray,
                          fontFamily: 'Inter, sans-serif',
                          margin: '0 0 0.25rem 0'
                        }}>Technician</p>
                        <p style={{
                          fontSize: '0.95rem',
                          fontWeight: '600',
                          color: isDark ? '#f1f5f9' : '#1e293b',
                          fontFamily: 'Inter, sans-serif',
                          margin: 0
                        }}>
                          {ticket.technician}
                        </p>
                      </div>
                      <div>
                        <p style={{
                          fontSize: '0.85rem',
                          color: odooColors.neutralGray,
                          fontFamily: 'Inter, sans-serif',
                          margin: '0 0 0.25rem 0'
                        }}>Team</p>
                        <p style={{
                          fontSize: '0.95rem',
                          fontWeight: '600',
                          color: isDark ? '#f1f5f9' : '#1e293b',
                          fontFamily: 'Inter, sans-serif',
                          margin: 0
                        }}>
                          {ticket.team}
                        </p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div style={{
                      display: 'flex',
                      gap: '1.5rem',
                      fontSize: '0.9rem',
                      color: odooColors.neutralGray,
                      fontFamily: 'Inter, sans-serif',
                      marginTop: '1rem'
                    }}>
                      <span>
                        <i className="bi bi-person me-1" style={{ color: odooColors.readyGreen }}></i>
                        {ticket.name}
                      </span>
                      <span>
                        <i className="bi bi-calendar me-1" style={{ color: odooColors.secondaryTeal }}></i>
                        {new Date(ticket.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      style={{
                        backgroundColor: odooColors.secondaryTeal,
                        color: odooColors.white,
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.6rem 1.2rem',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        fontFamily: 'Inter, sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#015a60'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = odooColors.secondaryTeal
                      }}
                    >
                      <i className="bi bi-arrow-right me-2"></i>Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Section */}
        {tickets.length > 0 && (
          <div style={{
            backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
            borderRadius: '12px',
            padding: '2rem',
            marginTop: '3rem',
            boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: isDark ? `1px solid ${odooColors.neutralGray}20` : 'none'
          }}>
            <h4 style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              color: isDark ? '#f1f5f9' : '#1e293b',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '1.5rem',
              margin: '0 0 1.5rem 0'
            }}>
              Support Summary
            </h4>

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
                  {tickets.length}
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: odooColors.neutralGray,
                  fontFamily: 'Inter, sans-serif',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <i className="bi bi-ticket-detailed" style={{ color: odooColors.secondaryTeal }}></i>
                  Total Tickets
                </p>
              </div>

              {/* Open Tickets */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: odooColors.gold,
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  {tickets.filter(t => t.status === 'open' || t.status === 'in progress').length}
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: odooColors.neutralGray,
                  fontFamily: 'Inter, sans-serif',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <i className="bi bi-hourglass-split" style={{ color: odooColors.gold }}></i>
                  Open
                </p>
              </div>

              {/* Resolved Tickets */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: odooColors.readyGreen,
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  {tickets.filter(t => t.status === 'resolved').length}
                </div>
                <p style={{
                  fontSize: '0.95rem',
                  color: odooColors.neutralGray,
                  fontFamily: 'Inter, sans-serif',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}>
                  <i className="bi bi-check-circle" style={{ color: odooColors.readyGreen }}></i>
                  Resolved
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowTickets;