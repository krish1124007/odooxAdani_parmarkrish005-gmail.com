import { Link } from 'react-router-dom'

const DashboardPage = () => {
  const stats = [
    { 
      label: 'Total Equipment', 
      value: '142', 
      icon: 'bi-gear-fill', 
      bgColor: 'rgba(113, 75, 103, 0.1)',
      iconColor: '#714B67',
      change: '+12%',
      changeType: 'positive'
    },
    { 
      label: 'Active Requests', 
      value: '23', 
      icon: 'bi-wrench', 
      bgColor: 'rgba(255, 193, 7, 0.1)',
      iconColor: '#FFC107',
      change: '+5%',
      changeType: 'positive'
    },
    { 
      label: 'Completed This Month', 
      value: '89', 
      icon: 'bi-check-circle-fill', 
      bgColor: 'rgba(40, 167, 69, 0.1)',
      iconColor: '#28A745',
      change: '+18%',
      changeType: 'positive'
    },
    { 
      label: 'Teams', 
      value: '8', 
      icon: 'bi-people-fill', 
      bgColor: 'rgba(1, 126, 132, 0.1)',
      iconColor: '#017E84',
      change: '0%',
      changeType: 'neutral'
    },
  ]

  const quickActions = [
    { title: 'New Request', icon: 'bi-plus-circle', color: '#714B67', link: '/requests' },
    { title: 'Add Equipment', icon: 'bi-gear-fill', color: '#017E84', link: '/equipment' },
    { title: 'View Calendar', icon: 'bi-calendar-event', color: '#28A745', link: '/calendar' },
    { title: 'View Reports', icon: 'bi-graph-up', color: '#FFC107', link: '/reports' },
    { title: 'Manage Teams', icon: 'bi-people-fill', color: '#DC3545', link: '/teams' },
    { title: 'Work Logs', icon: 'bi-clock-history', color: '#17A2B8', link: '/activity' },
  ]

  const recentRequests = [
    { 
      id: 'REQ-1001', 
      equipment: 'CNC Machine #5', 
      type: 'Corrective', 
      status: 'In Progress',
      assignee: 'John Doe',
      priority: 'High',
      time: '2 hours ago'
    },
    { 
      id: 'REQ-1002', 
      equipment: 'Forklift #12', 
      type: 'Preventive', 
      status: 'New',
      assignee: 'Sarah Smith',
      priority: 'Medium',
      time: '4 hours ago'
    },
    { 
      id: 'REQ-1003', 
      equipment: 'HVAC Unit #3', 
      type: 'Corrective', 
      status: 'Completed',
      assignee: 'Mike Johnson',
      priority: 'Low',
      time: '1 day ago'
    },
  ]

  const getStatusBadge = (status) => {
    const statusMap = {
      'New': 'badge-info',
      'In Progress': 'badge-warning',
      'Completed': 'badge-success',
      'Scrap': 'badge-danger'
    }
    return statusMap[status] || 'badge-secondary'
  }

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'High': 'badge-danger',
      'Medium': 'badge-warning',
      'Low': 'badge-success'
    }
    return priorityMap[priority] || 'badge-secondary'
  }

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="dashboard-title">Welcome to GearGuard</h1>
          <p className="dashboard-subtitle">Monitor and manage your maintenance operations efficiently</p>
        </div>
        <div className="dashboard-date">
          <i className="bi bi-calendar3"></i>
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stats-card">
            <div className="stats-card-body">
              <div className="stats-icon" style={{ backgroundColor: stat.bgColor }}>
                <i className={`bi ${stat.icon}`} style={{ color: stat.iconColor }}></i>
              </div>
              <div className="stats-content">
                <div className="stats-value">{stat.value}</div>
                <div className="stats-label">{stat.label}</div>
                <div className={`stats-change ${stat.changeType}`}>
                  <i className={`bi ${stat.changeType === 'positive' ? 'bi-arrow-up' : 'bi-dash'}`}></i>
                  <span>{stat.change} from last month</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="section-container">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className="quick-action-card">
              <div className="quick-action-icon" style={{ backgroundColor: `${action.color}15` }}>
                <i className={`bi ${action.icon}`} style={{ color: action.color }}></i>
              </div>
              <div className="quick-action-title">{action.title}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Requests */}
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Recent Maintenance Requests</h2>
          <Link to="/requests" className="view-all-link">
            View All <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
        <div className="requests-table-card">
          <table className="table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Equipment</th>
                <th>Type</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Assignee</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <span className="request-id">{request.id}</span>
                  </td>
                  <td>
                    <div className="equipment-cell">
                      <i className="bi bi-gear-fill text-muted me-2"></i>
                      {request.equipment}
                    </div>
                  </td>
                  <td>{request.type}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getPriorityBadge(request.priority)}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td>
                    <div className="assignee-cell">
                      <div className="avatar avatar-sm">
                        {request.assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{request.assignee}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-muted">{request.time}</span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="action-btn" title="View">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="action-btn" title="Edit">
                        <i className="bi bi-pencil"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="section-container">
        <h2 className="section-title">Maintenance Overview</h2>
        <div className="chart-placeholder">
          <div className="chart-placeholder-content">
            <i className="bi bi-graph-up-arrow"></i>
            <p>Performance charts and analytics coming soon</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
