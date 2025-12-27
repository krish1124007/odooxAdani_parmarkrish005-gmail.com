import PageContainer from '../../../components/layout/PageContainer'

const MaintenanceCalendarPage = () => {
  return (
    <PageContainer
      title="Maintenance Calendar"
      subtitle="Schedule and view preventive maintenance"
      actions={
        <button className="btn btn-odoo-primary">
          <i className="bi bi-plus-circle me-2"></i>Schedule Maintenance
        </button>
      }
    >
      <div className="card">
        <div className="card-body">
          <div className="text-center text-muted py-5">
            <i className="bi bi-calendar-event" style={{ fontSize: '4rem' }}></i>
            <h4 className="mt-3">Calendar View</h4>
            <p>Calendar component will be implemented here</p>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default MaintenanceCalendarPage
