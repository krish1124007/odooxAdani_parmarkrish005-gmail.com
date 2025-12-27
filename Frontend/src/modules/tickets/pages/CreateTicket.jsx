import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'

const CreateTicket = () => {
  const navigate = useNavigate()
  const { isDark, colors } = useTheme()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'maintenance',
    priority: 'medium',
    assignedTo: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const categories = ['Maintenance', 'Repair', 'Installation', 'Support', 'Other']
  const priorities = ['Low', 'Medium', 'High', 'Critical']

  // Odoo Color Palette
  const odooColors = {
    primaryPurple: '#714B67',
    secondaryTeal: '#017E84',
    neutralGray: '#8F8F8F',
    readyGreen: '#21B799',
    gold: '#E4A900',
    white: '#ffffff',
    darkBg: '#0a0e1a',
    cardBg: '#1e2a3f'
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
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // Mock API call - will be connected to backend
      const ticketData = {
        id: Date.now(),
        ...formData,
        status: 'open',
        createdAt: new Date().toISOString(),
        createdBy: localStorage.getItem('userData') || 'User'
      }

      // Store in localStorage for now
      const existingTickets = JSON.parse(localStorage.getItem('userTickets') || '[]')
      existingTickets.push(ticketData)
      localStorage.setItem('userTickets', JSON.stringify(existingTickets))

      setSuccessMessage('✓ Ticket created successfully!')
      setFormData({
        title: '',
        description: '',
        category: 'maintenance',
        priority: 'medium',
        assignedTo: ''
      })

      setTimeout(() => {
        navigate('/user/tickets')
      }, 2000)
    } catch (error) {
      console.error('Create ticket error:', error)
      setErrors({ submit: error.message || 'Failed to create ticket' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ 
      backgroundColor: isDark ? odooColors.darkBg : '#f8f9fa', 
      minHeight: '100vh',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      {/* Header Section */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '3rem',
        paddingTop: '2rem'
      }}>
        <button 
          onClick={() => navigate('/user/tickets')}
          className="btn btn-link p-0"
          style={{ 
            color: odooColors.secondaryTeal, 
            textDecoration: 'none',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}
        >
          <i className="bi bi-arrow-left me-2"></i>Back to Tickets
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: odooColors.primaryPurple,
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-1px',
          marginBottom: '0.5rem'
        }}>
          Create a New Ticket
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: odooColors.neutralGray,
          fontFamily: 'Inter, sans-serif'
        }}>
          Describe your issue and we'll help you resolve it
        </p>
      </div>

      <div className="container" style={{ maxWidth: '700px' }}>
        {/* Success Message */}
        {successMessage && (
          <div style={{
            backgroundColor: odooColors.readyGreen,
            color: odooColors.white,
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif'
          }}>
            <i className="bi bi-check-circle me-2"></i>{successMessage}
          </div>
        )}

        {/* Error Message */}
        {errors.submit && (
          <div style={{
            backgroundColor: '#dc3545',
            color: odooColors.white,
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            fontFamily: 'Inter, sans-serif'
          }}>
            <i className="bi bi-exclamation-circle me-2"></i>{errors.submit}
          </div>
        )}

        {/* Form Card */}
        <div style={{
          backgroundColor: isDark ? odooColors.cardBg : odooColors.white,
          borderRadius: '12px',
          padding: '2.5rem',
          boxShadow: isDark ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: isDark ? `1px solid ${odooColors.neutralGray}20` : 'none'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Title Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: isDark ? '#f1f5f9' : '#1e293b',
                marginBottom: '0.5rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                <i className="bi bi-chat-dots me-2" style={{ color: odooColors.secondaryTeal }}></i>
                Ticket Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Equipment maintenance required"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: errors.title ? '2px solid #dc3545' : `2px solid ${isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: isDark ? odooColors.darkBg : '#f8f9fa',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  transition: 'border-color 0.3s ease'
                }}
                disabled={isLoading}
                onFocus={(e) => {
                  if (!errors.title) {
                    e.target.style.borderColor = odooColors.secondaryTeal
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.title ? '#dc3545' : `${isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`
                }}
              />
              {errors.title && (
                <small style={{ color: '#dc3545', fontFamily: 'Inter, sans-serif', marginTop: '0.25rem', display: 'block' }}>
                  <i className="bi bi-exclamation-circle me-1"></i>{errors.title}
                </small>
              )}
            </div>

            {/* Description Field */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: isDark ? '#f1f5f9' : '#1e293b',
                marginBottom: '0.5rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                <i className="bi bi-file-text me-2" style={{ color: odooColors.secondaryTeal }}></i>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide detailed information about your issue..."
                rows="5"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: errors.description ? '2px solid #dc3545' : `2px solid ${isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: isDark ? odooColors.darkBg : '#f8f9fa',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  resize: 'vertical',
                  transition: 'border-color 0.3s ease'
                }}
                disabled={isLoading}
                onFocus={(e) => {
                  if (!errors.description) {
                    e.target.style.borderColor = odooColors.secondaryTeal
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.description ? '#dc3545' : `${isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`
                }}
              />
              {errors.description && (
                <small style={{ color: '#dc3545', fontFamily: 'Inter, sans-serif', marginTop: '0.25rem', display: 'block' }}>
                  <i className="bi bi-exclamation-circle me-1"></i>{errors.description}
                </small>
              )}
            </div>

            {/* Category and Priority Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              {/* Category */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  marginBottom: '0.5rem',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <i className="bi bi-tag me-2" style={{ color: odooColors.gold }}></i>
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: `2px solid ${isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: isDark ? odooColors.darkBg : '#f8f9fa',
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease'
                  }}
                  disabled={isLoading}
                  onFocus={(e) => {
                    e.target.style.borderColor = odooColors.gold
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `${isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  marginBottom: '0.5rem',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <i className="bi bi-exclamation-circle-fill me-2" style={{ color: '#dc3545' }}></i>
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: `2px solid ${isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    backgroundColor: isDark ? odooColors.darkBg : '#f8f9fa',
                    color: isDark ? '#f1f5f9' : '#1e293b',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease'
                  }}
                  disabled={isLoading}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#dc3545'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `${isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`
                  }}
                >
                  {priorities.map(p => (
                    <option key={p} value={p.toLowerCase()}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Assigned To Field */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: '600',
                color: isDark ? '#f1f5f9' : '#1e293b',
                marginBottom: '0.5rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                <i className="bi bi-person me-2" style={{ color: odooColors.readyGreen }}></i>
                Assign To (Optional)
              </label>
              <input
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
                placeholder="Technician name"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: `2px solid ${isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: isDark ? odooColors.darkBg : '#f8f9fa',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  transition: 'border-color 0.3s ease'
                }}
                disabled={isLoading}
                onFocus={(e) => {
                  e.target.style.borderColor = odooColors.readyGreen
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = `${isDark ? odooColors.neutralGray + '30' : '#e2e8f0'}`
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: odooColors.secondaryTeal,
                  color: odooColors.white,
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#015a60'
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = odooColors.secondaryTeal
                }}
              >
                {isLoading ? (
                  <>
                    <i className="bi bi-hourglass-split me-2"></i>Creating...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send me-2"></i>Submit Ticket
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/user/tickets')}
                disabled={isLoading}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: isDark ? odooColors.cardBg : '#e2e8f0',
                  color: isDark ? '#f1f5f9' : '#1e293b',
                  border: `2px solid ${isDark ? odooColors.neutralGray + '30' : '#ccc'}`,
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = isDark ? odooColors.neutralGray + '20' : '#d0d7e0'
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = isDark ? odooColors.cardBg : '#e2e8f0'
                }}
              >
                <i className="bi bi-x-lg me-2"></i>Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateTicket
