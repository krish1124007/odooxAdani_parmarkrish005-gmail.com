import PageContainer from '../../../components/layout/PageContainer'
import EmptyState from '../../../components/common/EmptyState'

const EquipmentListPage = () => {
  return (
    <PageContainer
      title="Equipment Management"
      subtitle="Manage all company assets and equipment"
      actions={
        <button className="btn btn-odoo-primary">
          <i className="bi bi-plus-circle me-2"></i>Add Equipment
        </button>
      }
    >
      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="search"
                className="form-control"
                placeholder="Search equipment..."
              />
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option>All Categories</option>
                <option>Machine</option>
                <option>Vehicle</option>
                <option>IT Device</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option>All Departments</option>
                <option>Production</option>
                <option>IT</option>
                <option>Maintenance</option>
              </select>
            </div>
          </div>

          <EmptyState
            icon="bi-gear"
            title="No Equipment Found"
            message="Start by adding your first equipment to track"
            action={
              <button className="btn btn-odoo-primary">
                <i className="bi bi-plus-circle me-2"></i>Add Equipment
              </button>
            }
          />
        </div>
      </div>
    </PageContainer>
  )
}

export default EquipmentListPage
