import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'

const CreateTicket = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    equipment: '',
    serialNo: '',
    category: '',
    team: '',
    technician: '',
    company: '',
    maintenanceType: '',
    description: ''
  })
  
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [useSuggestion, setUseSuggestion] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  // Handle Check Suggestion button click - Call backend API
  const handleCheckSuggestion = async () => {
    if (!formData.equipment.trim()) {
      alert('Please enter equipment name first')
      return
    }

    try {
      setIsSubmitting(true)
      const response = await fetch('/api/equipment/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          equipment: formData.equipment,
          serialNo: formData.serialNo
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions')
      }

      const data = await response.json()
      setSuggestions(data)
      setShowSuggestion(true)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      alert('Failed to fetch suggestions. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Auto-fill fields when suggestion button was clicked
  const handleApplySuggestion = () => {
    if (suggestions) {
      setFormData(prev => ({
        ...prev,
        category: suggestions.category || prev.category,
        team: suggestions.team || prev.team,
        technician: suggestions.technician || prev.technician,
        company: suggestions.company || prev.company,
        maintenanceType: suggestions.maintenanceType || prev.maintenanceType
      }))
      setShowSuggestion(false)
      // Show success message
      setSuccessMessage('Suggestion applied successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }



  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.equipment.trim()) newErrors.equipment = 'Equipment is required'
    if (!formData.serialNo.trim()) newErrors.serialNo = 'Serial No is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.team) newErrors.team = 'Team is required'
    if (!formData.technician) newErrors.technician = 'Technician is required'
    if (!formData.company) newErrors.company = 'Company is required'
    if (!formData.maintenanceType) newErrors.maintenanceType = 'Maintenance Type is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const ticketData = {
        id: Date.now(),
        ...formData,
        status: 'open',
        createdAt: new Date().toISOString()
      }

      const existingTickets = JSON.parse(localStorage.getItem('userTickets') || '[]')
      existingTickets.push(ticketData)
      localStorage.setItem('userTickets', JSON.stringify(existingTickets))

      setSuccessMessage('✓ Ticket created successfully!')
      setTimeout(() => {
        navigate('/user/tickets')
      }, 2000)
    } catch (error) {
      console.error('Create ticket error:', error)
      setErrors({ submit: error.message || 'Failed to create ticket' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{
      backgroundColor: isDark ? odooColors.darkBg : odooColors.lightBg,
      minHeight: '100vh',
      paddingTop: '3rem',
      paddingBottom: '3rem'
    }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: '700',
            color: isDark ? '#f1f5f9' : '#1e293b',
            fontFamily: 'Inter, sans-serif',
            margin: 0,
            marginBottom: '0.5rem'
          }}>
            Submit a Ticket
          </h1>
          <p style={{
            fontSize: '1rem',
            color: odooColors.neutralGray,
            fontFamily: 'Inter, sans-serif',
            margin: 0
          }}>
            Describe your issue and let us help you resolve it
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
            borderRadius: '12px',
            padding: '2.5rem',
            boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: isDark ? `1px solid ${odooColors.neutralGray}20` : 'none'
          }}>
            {successMessage && (
              <div style={{
                backgroundColor: odooColors.readyGreen + '20',
                color: odooColors.readyGreen,
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                border: `1px solid ${odooColors.readyGreen}`,
                fontFamily: 'Inter, sans-serif'
              }}>
                {successMessage}
              </div>
            )}

            {errors.submit && (
              <div style={{
                backgroundColor: odooColors.error + '20',
                color: odooColors.error,
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                border: `1px solid ${odooColors.error}`,
                fontFamily: 'Inter, sans-serif'
              }}>
                {errors.submit}
              </div>
            )}

            {/* Row 1: Equipment with Check Suggestion Button */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: isDark ? '#f1f5f9' : '#1e293b',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '0.5rem'
              }}>
                Equipment <span style={{ color: odooColors.error }}>*</span>
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    name="equipment"
                    value={formData.equipment}
                    onChange={handleInputChange}
                    placeholder="Select or enter equipment"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${errors.equipment ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                      borderRadius: '8px',
                      backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                      color: isDark ? '#f1f5f9' : '#1e293b',
                      fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                      transition: 'border-color 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = odooColors.secondaryTeal
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.equipment ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                    }}
                  />
                  {errors.equipment && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.equipment}</small>}
                </div>
                <button
                  type="button"
                  onClick={handleCheckSuggestion}
                  disabled={isSubmitting || !formData.equipment.trim()}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: odooColors.secondaryTeal,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                    cursor: isSubmitting || !formData.equipment.trim() ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting || !formData.equipment.trim() ? 0.6 : 1,
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting && formData.equipment.trim()) {
                      e.target.style.backgroundColor = '#015a64'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = odooColors.secondaryTeal
                  }}
                >
                  {isSubmitting ? 'Checking...' : 'Check Suggestion'}
                </button>
              </div>

              {/* Display suggestions after button click */}
              {showSuggestion && suggestions && (
                <div style={{
                  marginTop: '0.75rem',
                  padding: '1rem',
                  backgroundColor: odooColors.secondaryTeal + '15',
                  borderLeft: `4px solid ${odooColors.secondaryTeal}`,
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <div style={{ marginBottom: '0.5rem', fontWeight: '600' }}>Suggested Information:</div>
                  <div style={{ fontSize: '0.85rem', color: odooColors.secondaryTeal }}>
                    <div>Category: <strong>{suggestions.category}</strong></div>
                    <div>Team: <strong>{suggestions.team}</strong></div>
                    <div>Technician: <strong>{suggestions.technician}</strong></div>
                    <div>Company: <strong>{suggestions.company}</strong></div>
                    {suggestions.maintenanceType && <div>Maintenance Type: <strong>{suggestions.maintenanceType}</strong></div>}
                  </div>
                  <button
                    type="button"
                    onClick={handleApplySuggestion}
                    style={{
                      marginTop: '0.75rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: odooColors.readyGreen,
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#1a9b7d'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = odooColors.readyGreen
                    }}
                  >
                    Apply Suggestion
                  </button>
                </div>
              )}
            </div>

            {/* Row 2: Serial No */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: isDark ? '#f1f5f9' : '#1e293b',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '0.5rem'
              }}>
                Serial No <span style={{ color: odooColors.error }}>*</span>
              </label>
              <input
                type="text"
                name="serialNo"
                value={formData.serialNo}
                onChange={handleInputChange}
                placeholder="Enter serial number"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.serialNo ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontSize: '1rem',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = odooColors.secondaryTeal
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.serialNo ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                }}
              />
              {errors.serialNo && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.serialNo}</small>}
            </div>

            {/* Row 3: Name and Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  Name <span style={{ color: odooColors.error }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${errors.name ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = odooColors.secondaryTeal
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.name ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                  }}
                />
                {errors.name && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.name}</small>}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  Email <span style={{ color: odooColors.error }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@company.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${errors.email ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = odooColors.secondaryTeal
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.email ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                  }}
                />
                {errors.email && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.email}</small>}
              </div>
            </div>

            {/* Row 4: Category (reduced size) */}
            <div style={{ marginBottom: '2rem', maxWidth: '400px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: isDark ? '#f1f5f9' : '#1e293b',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '0.5rem'
              }}>
                Category <span style={{ color: odooColors.error }}>*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.category ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontSize: '1rem',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  cursor: 'pointer'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = odooColors.secondaryTeal
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.category ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                }}
              >
                <option value="">Select Category</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Repair">Repair</option>
                <option value="Installation">Installation</option>
                <option value="Support">Support</option>
              </select>
              {errors.category && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.category}</small>}
            </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  Serial No <span style={{ color: odooColors.error }}>*</span>
                </label>
                <input
                  type="text"
                  name="serialNo"
                  value={formData.serialNo}
                  onChange={handleInputChange}
                  placeholder="Enter serial number"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${errors.serialNo ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = odooColors.secondaryTeal
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.serialNo ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                  }}
                />
                {errors.serialNo && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.serialNo}</small>}
              </div>
            </div>

            {/* Row 2: Name and Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  Name <span style={{ color: odooColors.error }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${errors.name ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = odooColors.secondaryTeal
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.name ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                  }}
                />
                {errors.name && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.name}</small>}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  Email <span style={{ color: odooColors.error }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@company.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${errors.email ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = odooColors.secondaryTeal
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.email ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                  }}
                />
                {errors.email && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.email}</small>}
              </div>
            </div>

            {/* Row 3: Category */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: isDark ? '#f1f5f9' : '#1e293b',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '0.5rem'
              }}>
                Category <span style={{ color: odooColors.error }}>*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.category ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontSize: '1rem',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  cursor: 'pointer'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = odooColors.secondaryTeal
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.category ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                }}
              >
                <option value="">Select Category</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Repair">Repair</option>
                <option value="Installation">Installation</option>
                <option value="Support">Support</option>
              </select>
              {errors.category && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.category}</small>}
            </div>

            {/* Row 3: Team and Technician */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  Team <span style={{ color: odooColors.error }}>*</span>
                </label>
                <select
                  name="team"
                  value={formData.team}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${errors.team ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = odooColors.secondaryTeal
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.team ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                  }}
                >
                  <option value="">Select Team</option>
                  <option value="Team A">Team A</option>
                  <option value="Team B">Team B</option>
                  <option value="Team C">Team C</option>
                </select>
                {errors.team && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.team}</small>}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  Technician <span style={{ color: odooColors.error }}>*</span>
                </label>
                <select
                  name="technician"
                  value={formData.technician}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${errors.technician ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = odooColors.secondaryTeal
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.technician ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                  }}
                >
                  <option value="">Select Technician</option>
                  <option value="Technician 1">Technician 1</option>
                  <option value="Technician 2">Technician 2</option>
                  <option value="Technician 3">Technician 3</option>
                </select>
                {errors.technician && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.technician}</small>}
              </div>
            </div>

            {/* Row 4: Company and Maintenance Type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  Company <span style={{ color: odooColors.error }}>*</span>
                </label>
                <select
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${errors.company ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = odooColors.secondaryTeal
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.company ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                  }}
                >
                  <option value="">Select Company</option>
                  <option value="Company A">Company A</option>
                  <option value="Company B">Company B</option>
                  <option value="Company C">Company C</option>
                </select>
                {errors.company && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.company}</small>}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '0.5rem'
                }}>
                  Maintenance Type <span style={{ color: odooColors.error }}>*</span>
                </label>
                <select
                  name="maintenanceType"
                  value={formData.maintenanceType}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: `1px solid ${errors.maintenanceType ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = odooColors.secondaryTeal
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.maintenanceType ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                  }}
                >
                  <option value="">Select Type</option>
                  <option value="Corrective">Corrective</option>
                  <option value="Preventive">Preventive</option>
                </select>
                {errors.maintenanceType && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.maintenanceType}</small>}
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: isDark ? '#f1f5f9' : '#1e293b',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '0.5rem'
              }}>
                Description <span style={{ color: odooColors.error }}>*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your issue in detail..."
                rows="6"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.description ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  backgroundColor: isDark ? '#0a0e1a' : '#ffffff',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  fontSize: '1rem',
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = odooColors.secondaryTeal
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.description ? odooColors.error : isDark ? odooColors.neutralGray + '30' : '#e2e8f0'
                }}
              />
              {errors.description && <small style={{ color: odooColors.error, fontFamily: 'Inter, sans-serif' }}>{errors.description}</small>}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-start' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: odooColors.secondaryTeal,
                  color: odooColors.white,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: isSubmitting ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.backgroundColor = '#015a60'
                    e.target.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = odooColors.secondaryTeal
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/user/tickets')}
                style={{
                  backgroundColor: odooColors.neutralGray,
                  color: odooColors.white,
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = '0.9'
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '1'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTicket
