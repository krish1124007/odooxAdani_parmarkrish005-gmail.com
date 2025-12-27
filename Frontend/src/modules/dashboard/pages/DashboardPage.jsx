import PageContainer from '../../../components/layout/PageContainer'
import { useNavigate } from 'react-router-dom'

const DashboardPage = () => {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    navigate('/login')
  }
  const stats = [
    { label: 'Total Equipment', value: '142', icon: 'bi-gear-fill', color: 'primary' },
    { label: 'Active Requests', value: '23', icon: 'bi-wrench', color: 'warning' },
    { label: 'Completed This Month', value: '89', icon: 'bi-check-circle-fill', color: 'success' },
    { label: 'Teams', value: '8', icon: 'bi-people-fill', color: 'info' },
  ]

  return (
    <PageContainer
      title="Dashboard"
      subtitle="Welcome to GearGuard Maintenance System"
    >
      <div className="mb-3">
        <button 
          onClick={handleLogout} 
          className="btn btn-danger"
          style={{ backgroundColor: '#dc3545', border: 'none' }}
        >
          <i className="bi bi-box-arrow-right me-2"></i>Logout
        </button>
      </div>
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-6 col-lg-3">
            <div className="card stats-card card-hover h-100">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className={`bg-${stat.color} text-white p-3 rounded me-3`}>
                    <i className={`bi ${stat.icon} fs-3`}></i>
                  </div>
                  <div>
                    <div className="stats-value">{stat.value}</div>
                    <div className="text-muted">{stat.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Recent Activities</h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="list-group-item">
                    <div className="d-flex align-items-center">
                      <div className="avatar avatar-sm me-3">JD</div>
                      <div className="flex-grow-1">
                        <p className="mb-0">Maintenance request completed</p>
                        <small className="text-muted">2 hours ago</small>
                      </div>
                      <span className="badge badge-status-completed">Completed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-header bg-white">
              <h5 className="card-title mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-plus-circle me-2"></i>New Request
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-gear me-2"></i>Add Equipment
                </button>
                <button className="btn btn-outline-primary">
                  <i className="bi bi-calendar-plus me-2"></i>Schedule Maintenance
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default DashboardPage
