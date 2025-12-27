import { useState } from 'react'

const EquipmentListPage = () => {
  const [viewMode, setViewMode] = useState('list') // 'grid' or 'list'

  const equipmentData = [
    {
      id: 1,
      name: 'CNC Machine #5',
      category: 'Machine',
      department: 'Production',
      status: 'Active',
      location: 'Building A - Floor 2',
      lastMaintenance: '2024-12-15',
      icon: 'bi-gear-wide-connected',
      color: '#714B67'
    },
    {
      id: 2,
      name: 'Forklift #12',
      category: 'Vehicle',
      department: 'Warehouse',
      status: 'Under Maintenance',
      location: 'Warehouse 1',
      lastMaintenance: '2024-12-20',
      icon: 'bi-truck',
      color: '#017E84'
    },
    {
      id: 3,
      name: 'HVAC Unit #3',
      category: 'Equipment',
      department: 'Facilities',
      status: 'Active',
      location: 'Building B - Roof',
      lastMaintenance: '2024-11-30',
      icon: 'bi-wind',
      color: '#28A745'
    },
    {
      id: 4,
      name: 'Desktop Computer #45',
      category: 'IT Device',
      department: 'IT',
      status: 'Active',
      location: 'Office - 3rd Floor',
      lastMaintenance: '2024-12-10',
      icon: 'bi-pc-display',
      color: '#FFC107'
    },
    {
      id: 5,
      name: 'Conveyor Belt #2',
      category: 'Machine',
      department: 'Production',
      status: 'Active',
      location: 'Building A - Floor 1',
      lastMaintenance: '2024-12-18',
      icon: 'bi-arrow-repeat',
      color: '#DC3545'
    },
    {
      id: 6,
      name: 'Welding Machine #8',
      category: 'Machine',
      department: 'Production',
      status: 'Scrap',
      location: 'Building A - Floor 2',
      lastMaintenance: '2024-10-05',
      icon: 'bi-lightning-charge',
      color: '#8F8F8F'
    },
  ]

  const getStatusBadge = (status) => {
    const statusMap = {
      'Active': { class: 'badge-success', icon: 'bi-check-circle' },
      'Under Maintenance': { class: 'badge-warning', icon: 'bi-tools' },
      'Scrap': { class: 'badge-danger', icon: 'bi-x-circle' }
    }
    return statusMap[status] || { class: 'badge-secondary', icon: 'bi-circle' }
  }

  return (
    <div className="equipment-page">
      {/* Page Header */}
      <div className="page-header-section">
        <div>
          <h1 className="page-title-large">Equipment Management</h1>
          <p className="page-description">Manage all company assets and equipment inventory</p>
        </div>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle"></i>
          <span>Add Equipment</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box-large">
          <i className="bi bi-search"></i>
          <input
            type="search"
            placeholder="Search equipment by name, serial number..."
          />
        </div>
        
        <div className="filter-group">
          <select className="filter-select">
            <option>All Categories</option>
            <option>Machine</option>
            <option>Vehicle</option>
            <option>IT Device</option>
            <option>Equipment</option>
          </select>

          <select className="filter-select">
            <option>All Departments</option>
            <option>Production</option>
            <option>IT</option>
            <option>Warehouse</option>
            <option>Facilities</option>
          </select>

          <select className="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Under Maintenance</option>
            <option>Scrap</option>
          </select>
        </div>

        <div className="view-toggle">
          <button 
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <i className="bi bi-list-ul"></i>
          </button>
          <button 
            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <i className="bi bi-grid-3x2"></i>
          </button>
          
        </div>
      </div>

      {/* Equipment Grid/List */}
      {viewMode === 'grid' ? (
        <div className="equipment-grid">
          {equipmentData.map((equipment) => {
            const statusInfo = getStatusBadge(equipment.status)
            return (
              <div key={equipment.id} className="equipment-card">
                <div className="equipment-card-header">
                  <div className="equipment-icon" style={{ backgroundColor: `${equipment.color}15` }}>
                    <i className={`bi ${equipment.icon}`} style={{ color: equipment.color }}></i>
                  </div>
                  <span className={`badge ${statusInfo.class}`}>
                    <i className={`bi ${statusInfo.icon}`}></i>
                    {equipment.status}
                  </span>
                </div>
                
                <div className="equipment-card-body">
                  <h3 className="equipment-name">{equipment.name}</h3>
                  
                  <div className="equipment-details">
                    <div className="equipment-detail-item">
                      <i className="bi bi-tag"></i>
                      <span>{equipment.category}</span>
                    </div>
                    <div className="equipment-detail-item">
                      <i className="bi bi-building"></i>
                      <span>{equipment.department}</span>
                    </div>
                    <div className="equipment-detail-item">
                      <i className="bi bi-geo-alt"></i>
                      <span>{equipment.location}</span>
                    </div>
                    <div className="equipment-detail-item">
                      <i className="bi bi-calendar-check"></i>
                      <span>Last: {equipment.lastMaintenance}</span>
                    </div>
                  </div>
                </div>
                
                <div className="equipment-card-footer">
                  <button className="action-btn-outline">
                    <i className="bi bi-eye"></i>
                    View
                  </button>
                  <button className="action-btn-outline">
                    <i className="bi bi-wrench"></i>
                    Maintenance
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="equipment-list-table">
          <table className="table">
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Category</th>
                <th>Department</th>
                <th>Location</th>
                <th>Status</th>
                <th>Last Maintenance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipmentData.map((equipment) => {
                const statusInfo = getStatusBadge(equipment.status)
                return (
                  <tr key={equipment.id}>
                    <td>
                      <div className="equipment-cell-list">
                        <div className="equipment-icon-sm" style={{ backgroundColor: `${equipment.color}15` }}>
                          <i className={`bi ${equipment.icon}`} style={{ color: equipment.color }}></i>
                        </div>
                        <span className="equipment-name-sm">{equipment.name}</span>
                      </div>
                    </td>
                    <td>{equipment.category}</td>
                    <td>{equipment.department}</td>
                    <td>{equipment.location}</td>
                    <td>
                      <span className={`badge ${statusInfo.class}`}>
                        <i className={`bi ${statusInfo.icon}`}></i>
                        {equipment.status}
                      </span>
                    </td>
                    <td>{equipment.lastMaintenance}</td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn" title="View">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="action-btn" title="Edit">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="action-btn" title="Maintenance">
                          <i className="bi bi-wrench"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}



export default EquipmentListPage
