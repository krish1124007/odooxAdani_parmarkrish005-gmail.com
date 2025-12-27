import PageContainer from '../../../components/layout/PageContainer'

const RequestKanbanPage = () => {
  const stages = [
    { id: 'new', name: 'New', color: 'primary' },
    { id: 'progress', name: 'In Progress', color: 'warning' },
    { id: 'completed', name: 'Completed', color: 'success' },
    { id: 'scrap', name: 'Scrap', color: 'danger' },
  ]

  return (
    <PageContainer
      title="Maintenance Kanban Board"
      subtitle="Drag and drop to update request status"
      actions={
        <button className="btn btn-odoo-primary">
          <i className="bi bi-plus-circle me-2"></i>New Request
        </button>
      }
    >
      <div className="row g-3">
        {stages.map((stage) => (
          <div key={stage.id} className="col-md-3">
            <div className="kanban-column p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">{stage.name}</h6>
                <span className={`badge bg-${stage.color}`}>0</span>
              </div>
              <div className="text-center text-muted py-5">
                <p>No requests</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  )
}

export default RequestKanbanPage
