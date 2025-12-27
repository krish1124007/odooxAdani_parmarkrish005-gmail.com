import PageContainer from '../../../components/layout/PageContainer'
import EmptyState from '../../../components/common/EmptyState'

const TeamsListPage = () => {
  return (
    <PageContainer
      title="Teams & Technicians"
      subtitle="Manage maintenance teams and their members"
      actions={
        <button className="btn btn-odoo-primary">
          <i className="bi bi-plus-circle me-2"></i>Add Team
        </button>
      }
    >
      <div className="card">
        <div className="card-body">
          <EmptyState
            icon="bi-people"
            title="No Teams Found"
            message="Create your first maintenance team"
            action={
              <button className="btn btn-odoo-primary">
                <i className="bi bi-plus-circle me-2"></i>Create Team
              </button>
            }
          />
        </div>
      </div>
    </PageContainer>
  )
}

export default TeamsListPage
