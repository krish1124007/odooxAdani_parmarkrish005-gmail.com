import PageContainer from '../../../components/layout/PageContainer'

const RequestListPage = () => {
  return (
    <PageContainer
      title="Maintenance Requests"
      subtitle="Track and manage all maintenance activities"
      actions={
        <>
          <button className="btn btn-outline-secondary">
            <i className="bi bi-kanban me-2"></i>Kanban View
          </button>
          <button className="btn btn-odoo-primary">
            <i className="bi bi-plus-circle me-2"></i>New Request
          </button>
        </>
      }
    >
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Subject</th>
                  <th>Equipment</th>
                  <th>Type</th>
                  <th>Assigned To</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="8" className="text-center text-muted py-5">
                    No maintenance requests found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default RequestListPage
