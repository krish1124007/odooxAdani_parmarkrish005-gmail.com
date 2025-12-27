import { useState } from 'react'

const MaintenanceCalendarPage = () => {
  const [view, setView] = useState('month') // month, week, day, list
  const [currentDate, setCurrentDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(true)

  // Sample events data
  const events = [
    {
      id: 1,
      title: 'CNC Machine Maintenance',
      equipment: 'CNC Machine #5',
      date: new Date(2025, 11, 27, 20, 0), // Dec 27, 2025 8:00 PM
      duration: 2,
      type: 'Preventive'
    }
  ]

  // Navigation handlers
  const goToToday = () => setCurrentDate(new Date())
  const goToPrevious = () => {
    const newDate = new Date(currentDate)
    if (view === 'month') newDate.setMonth(newDate.getMonth() - 1)
    else if (view === 'week') newDate.setDate(newDate.getDate() - 7)
    else if (view === 'day') newDate.setDate(newDate.getDate() - 1)
    setCurrentDate(newDate)
  }
  const goToNext = () => {
    const newDate = new Date(currentDate)
    if (view === 'month') newDate.setMonth(newDate.getMonth() + 1)
    else if (view === 'week') newDate.setDate(newDate.getDate() + 7)
    else if (view === 'day') newDate.setDate(newDate.getDate() + 1)
    setCurrentDate(newDate)
  }

  // Generate calendar dates for month view
  const generateMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const current = new Date(startDate)
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }

  // Generate week days
  const generateWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  // Time slots for day/week view
  const timeSlots = Array.from({ length: 18 }, (_, i) => i + 6) // 6am to 11pm

  // Format date for display
  const formatDate = () => {
    if (view === 'month') {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    } else if (view === 'week') {
      const weekStart = new Date(currentDate)
      weekStart.setDate(currentDate.getDate() - currentDate.getDay())
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    }
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSameMonth = (date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  return (
    <div className="calendar-page">
      {/* Header */}
      <div className="calendar-header">
        <h1 className="calendar-title">Schedule</h1>
        
        <div className="calendar-header-actions">
          <div className="view-toggle-group">
            <button 
              className={`view-toggle-btn ${showCalendar ? 'active' : ''}`}
              onClick={() => setShowCalendar(true)}
              style={{ margin: 4, width: '110px' }}
            >
              <i className="bi bi-calendar"></i> &nbsp; Calendar
            </button>
            <button 
              className={`view-toggle-btn ${!showCalendar ? 'active' : ''}`}
              onClick={() => setShowCalendar(false)}
              style={{ margin: 4, width: '110px' }}
            >
              <i className="bi bi-list-ul"></i> &nbsp; List
            </button>
          </div>
        </div>
      </div>

      {showCalendar ? (
        <>
          {/* Calendar Controls */}
          <div className="calendar-controls">
            <div className="calendar-nav">
              <button className="btn-icon" onClick={goToPrevious}>
                <i className="bi bi-chevron-left"></i>
              </button>
              <button className="btn-icon" onClick={goToNext}>
                <i className="bi bi-chevron-right"></i>
              </button>
              <button className="btn-today" onClick={goToToday}>
                Today
              </button>
            </div>

            <div className="calendar-date-display">
              {formatDate()}
            </div>

            <div className="view-mode-group">
              <button 
                className={`view-mode-btn ${view === 'day' ? 'active' : ''}`}
                onClick={() => setView('day')}
              >
                Day
              </button>
              <button 
                className={`view-mode-btn ${view === 'week' ? 'active' : ''}`}
                onClick={() => setView('week')}
              >
                Week
              </button>
              <button 
                className={`view-mode-btn ${view === 'month' ? 'active' : ''}`}
                onClick={() => setView('month')}
              >
                Month
              </button>
            </div>
          </div>

          {/* Calendar Views */}
          <div className="calendar-content">
            {/* Month View */}
            {view === 'month' && (
              <div className="calendar-month">
                <div className="calendar-weekdays">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="calendar-weekday">{day}</div>
                  ))}
                </div>
                <div className="calendar-days-grid">
                  {generateMonthDays().map((date, index) => (
                    <div 
                      key={index} 
                      className={`calendar-day ${!isSameMonth(date) ? 'other-month' : ''} ${isToday(date) ? 'today' : ''}`}
                    >
                      <span className="day-number">{date.getDate()}</span>
                      {/* Show events for this day */}
                      {events.filter(e => e.date.toDateString() === date.toDateString()).map(event => (
                        <div key={event.id} className="calendar-event-dot">
                          <i className="bi bi-dot"></i> {event.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} | {event.title.substring(0, 15)}...
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Week View */}
            {view === 'week' && (
              <div className="calendar-week">
                <div className="calendar-week-header">
                  <div className="calendar-time-gutter">all-day</div>
                  {generateWeekDays().map((date, index) => (
                    <div key={index} className={`calendar-week-day-header ${isToday(date) ? 'today' : ''}`}>
                      <div className="week-day-name">{date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' })}</div>
                    </div>
                  ))}
                </div>
                <div className="calendar-week-body">
                  <div className="calendar-time-column">
                    {timeSlots.map(hour => (
                      <div key={hour} className="time-slot-label">
                        {hour > 12 ? `${hour - 12}pm` : `${hour}am`}
                      </div>
                    ))}
                  </div>
                  {generateWeekDays().map((date, dayIndex) => (
                    <div key={dayIndex} className="calendar-day-column">
                      {timeSlots.map(hour => (
                        <div key={hour} className="calendar-hour-slot"></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Day View */}
            {view === 'day' && (
              <div className="calendar-day-view">
                <div className="calendar-day-header">
                  <div className="calendar-time-gutter">all-day</div>
                  <div className={`calendar-single-day-header ${isToday(currentDate) ? 'today' : ''}`}>
                    {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
                  </div>
                </div>
                <div className="calendar-day-body">
                  <div className="calendar-time-column">
                    {timeSlots.map(hour => (
                      <div key={hour} className="time-slot-label">
                        {hour > 12 ? `${hour - 12}pm` : `${hour}am`}
                      </div>
                    ))}
                  </div>
                  <div className="calendar-day-column">
                    {timeSlots.map(hour => (
                      <div key={hour} className="calendar-hour-slot"></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        /* List View */
        <div className="calendar-list-view">
          <div className="list-view-header">
            <div className="list-view-search">
              <input type="text" placeholder="Search" className="form-control" />
              <button className="btn btn-primary">Search</button>
            </div>
            <div className="list-view-date-range">
              <button className="btn-icon">
                <i className="bi bi-arrow-clockwise"></i>
              </button>
              <span className="date-range-text">
                {currentDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })} to {new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="list-view-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Equipment</th>
                  <th>Start Date <i className="bi bi-arrow-up"></i></th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id}>
                    <td>
                      <i className="bi bi-dot"></i> {event.type}
                    </td>
                    <td>{event.equipment}</td>
                    <td>
                      {event.date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} • {event.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      <br />
                      <small>{event.date.toLocaleDateString('en-US', { weekday: 'long' })}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="list-view-footer">
              <span className='m-2'>Rows per page</span>
              <select className="form-select form-select-sm mb-3" style={{ width: '100px'}}>
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className='m-2'>1 of 1</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MaintenanceCalendarPage
