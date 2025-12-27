import { useState, useEffect } from 'react';
import adminService from '../../../services/adminService';
import './EquipmentListPage.css'; // Make sure to import CSS file

const EquipmentListPage = () => {
  const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
  const [equipment, setEquipment] = useState([]);
  const [maintenanceTeams, setMaintenanceTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    maintenanceTeam: '',
    status: 'active',
    location: '',
    serialNumber: '',
    purchaseDate: '',
    warrantyExpiry: ''
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await Promise.all([fetchEquipment(), fetchMaintenanceTeams()]);
    } catch (err) {
      console.error('Error initializing page:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEquipment = async () => {
    const response = await adminService.getEquipment();
    if (response.success) {
      setEquipment(response.data || []);
    } else {
      throw new Error(response.message || 'Failed to fetch equipment');
    }
  };

  const fetchMaintenanceTeams = async () => {
    try {
      const response = await adminService.getMaintenanceTeams();
      if (response.success) {
        setMaintenanceTeams(response.data || []);
      }
    } catch (err) {
      console.warn('Failed to fetch maintenance teams', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEquipment) {
        // Update existing equipment
        const response = await adminService.updateEquipment(editingEquipment._id, formData);
        if (response.success) {
          await fetchEquipment();
          handleCloseModal();
        }
      } else {
        // Add new equipment
        const response = await adminService.addEquipment(formData);
        if (response.success) {
          await fetchEquipment();
          handleCloseModal();
        }
      }
    } catch (err) {
      console.error('Error saving equipment:', err);
      alert(err.message || 'Failed to save equipment');
    }
  };

  const handleEdit = (equip) => {
    console.log('Editing equipment:', equip);
    setEditingEquipment(equip);
    setFormData({
      name: equip.name || '',
      category: equip.category || '',
      maintenanceTeam: equip.maintenanceTeam?._id || equip.maintenanceTeam || '',
      status: equip.status || 'active',
      location: equip.location || '',
      serialNumber: equip.serialNumber || '',
      purchaseDate: equip.purchaseDate ? new Date(equip.purchaseDate).toISOString().split('T')[0] : '',
      warrantyExpiry: equip.warrantyExpiry ? new Date(equip.warrantyExpiry).toISOString().split('T')[0] : ''
    });
    setShowModal(true);
    console.log('showModal set to:', true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this equipment?')) {
      return;
    }

    try {
      const response = await adminService.deleteEquipment(id);
      if (response.success) {
        await fetchEquipment();
      }
    } catch (err) {
      console.error('Error deleting equipment:', err);
      alert(err.message || 'Failed to delete equipment');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEquipment(null);
    setFormData({
      name: '',
      category: '',
      maintenanceTeam: '',
      status: 'active',
      location: '',
      serialNumber: '',
      purchaseDate: '',
      warrantyExpiry: ''
    });
  };

  const handleAddNew = () => {
    setEditingEquipment(null);
    setFormData({
      name: '',
      category: '',
      maintenanceTeam: '',
      status: 'active',
      location: '',
      serialNumber: '',
      purchaseDate: '',
      warrantyExpiry: ''
    });
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'active': { class: 'badge-success', icon: 'bi-check-circle', label: 'Active' },
      'under_maintenance': { class: 'badge-warning', icon: 'bi-tools', label: 'Maintenance' },
      'scrapped': { class: 'badge-danger', icon: 'bi-x-circle', label: 'Scrapped' }
    };
    return statusMap[status] || { class: 'badge-secondary', icon: 'bi-circle', label: status };
  };

  const getEquipmentIcon = (category) => {
    const iconMap = {
      'Machine': 'bi-gear-wide-connected',
      'Vehicle': 'bi-truck',
      'Equipment': 'bi-wind',
      'IT Device': 'bi-pc-display'
    };
    return iconMap[category] || 'bi-box';
  };

  const getEquipmentColor = (category) => {
    const colorMap = {
      'Machine': '#714B67',
      'Vehicle': '#017E84',
      'Equipment': '#28A745',
      'IT Device': '#FFC107'
    };
    return colorMap[category] || '#6c757d';
  };

  // Add CSS styles inline if you don't have a CSS file
  const modalStyles = {
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1040
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1050,
      overflowX: 'hidden',
      overflowY: 'auto'
    }
  };

  if (isLoading) {
    return (
      <div className="equipment-page">
        <div className="page-header-section">
          <div>
            <h1 className="page-title-large">Equipment Management</h1>
            <p className="page-description">Manage all company assets and equipment inventory</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading equipment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="equipment-page">
        <div className="page-header-section">
          <div>
            <h1 className="page-title-large">Equipment Management</h1>
            <p className="page-description">Manage all company assets and equipment inventory</p>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
            <button className="btn btn-primary" onClick={fetchInitialData}>
              <i className="bi bi-arrow-clockwise me-2"></i>Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="equipment-page">
      {/* Page Header */}
      <div className="page-header-section">
        <div>
          <h1 className="page-title-large">Equipment Management</h1>
          <p className="page-description">Manage all company assets and equipment inventory</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddNew}>
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
            placeholder="Search equipment..."
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
            <option>All Teams</option>
            {maintenanceTeams.map(team => (
              <option key={team._id} value={team._id}>{team.name}</option>
            ))}
          </select>

          <select className="filter-select">
            <option>All Status</option>
            <option value="active">Active</option>
            <option value="under_maintenance">Under Maintenance</option>
            <option value="scrapped">Scrapped</option>
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
      {equipment.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-5">
            <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#ccc' }}></i>
            <h4 className="mt-3">No Equipment Found</h4>
            <p className="text-muted">Add your first equipment to get started</p>
            <button className="btn btn-primary mt-3" onClick={handleAddNew}>
              <i className="bi bi-plus-circle me-2"></i>Add Equipment
            </button>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="equipment-grid">
          {equipment.map((equip) => {
            const statusInfo = getStatusBadge(equip.status);
            const icon = getEquipmentIcon(equip.category);
            const color = getEquipmentColor(equip.category);
            const teamName = equip.maintenanceTeam?.name || maintenanceTeams.find(t => t._id === equip.maintenanceTeam)?.name || 'Unknown Team';

            return (
              <div key={equip._id} className="equipment-card">
                <div className="equipment-card-header">
                  <div className="equipment-icon" style={{ backgroundColor: `${color}15` }}>
                    <i className={`bi ${icon}`} style={{ color }}></i>
                  </div>
                  <span className={`badge ${statusInfo.class}`}>
                    <i className={`bi ${statusInfo.icon}`}></i>
                    {statusInfo.label}
                  </span>
                </div>

                <div className="equipment-card-body">
                  <h3 className="equipment-name">{equip.name}</h3>

                  <div className="equipment-details">
                    <div className="equipment-detail-item">
                      <i className="bi bi-tag"></i>
                      <span>{equip.category}</span>
                    </div>
                    <div className="equipment-detail-item">
                      <i className="bi bi-people"></i>
                      <span>{teamName}</span>
                    </div>
                    <div className="equipment-detail-item">
                      <i className="bi bi-geo-alt"></i>
                      <span>{equip.location}</span>
                    </div>
                    {equip.serialNumber && (
                      <div className="equipment-detail-item">
                        <i className="bi bi-upc"></i>
                        <span>{equip.serialNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="equipment-card-footer">
                  <button className="action-btn-outline" onClick={() => handleEdit(equip)}>
                    <i className="bi bi-pencil"></i>
                    Edit
                  </button>
                  <button className="action-btn-outline" onClick={() => handleDelete(equip._id)}>
                    <i className="bi bi-trash"></i>
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="equipment-list-table">
          <table className="table">
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Category</th>
                <th>Team</th>
                <th>Location</th>
                <th>Status</th>
                <th>Serial Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((equip) => {
                const statusInfo = getStatusBadge(equip.status);
                const icon = getEquipmentIcon(equip.category);
                const color = getEquipmentColor(equip.category);
                const teamName = equip.maintenanceTeam?.name || maintenanceTeams.find(t => t._id === equip.maintenanceTeam)?.name || 'Unknown Team';

                return (
                  <tr key={equip._id}>
                    <td>
                      <div className="equipment-cell-list">
                        <div className="equipment-icon-sm" style={{ backgroundColor: `${color}15` }}>
                          <i className={`bi ${icon}`} style={{ color }}></i>
                        </div>
                        <span className="equipment-name-sm">{equip.name}</span>
                      </div>
                    </td>
                    <td>{equip.category}</td>
                    <td>{teamName}</td>
                    <td>{equip.location}</td>
                    <td>
                      <span className={`badge ${statusInfo.class}`}>
                        <i className={`bi ${statusInfo.icon}`}></i>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td>{equip.serialNumber || 'N/A'}</td>
                    <td>
                      <div className="table-actions">
                        <button className="action-btn" title="Edit" onClick={() => handleEdit(equip)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="action-btn" title="Delete" onClick={() => handleDelete(equip._id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal - FIXED VERSION */}
      {showModal && (
        <>
          {/* Backdrop */}
          <div className="modal-backdrop" style={modalStyles.backdrop}></div>
          
          {/* Modal */}
          <div className="modal-wrapper" style={modalStyles.modal}>
            <div className="modal-dialog modal-dialog-centered modal-lg" style={{ margin: 'auto', maxWidth: '800px' }}>
              <div className="modal-content shadow-lg border-0">
                <div className="modal-header bg-primary text-white py-3 px-4">
                  <h5 className="modal-title mb-0">
                    {editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={handleCloseModal}
                    aria-label="Close"
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body p-4">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Equipment Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Generator X-500"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="category" className="form-label">Category *</label>
                        <select
                          className="form-select"
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="Machine">Machine</option>
                          <option value="Vehicle">Vehicle</option>
                          <option value="Equipment">Equipment</option>
                          <option value="IT Device">IT Device</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="maintenanceTeam" className="form-label">Maintenance Team *</label>
                        <select
                          className="form-select"
                          id="maintenanceTeam"
                          name="maintenanceTeam"
                          value={formData.maintenanceTeam}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Team</option>
                          {maintenanceTeams.map(team => (
                            <option key={team._id} value={team._id}>{team.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="status" className="form-label">Status *</label>
                        <select
                          className="form-select"
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="active">Active</option>
                          <option value="under_maintenance">Under Maintenance</option>
                          <option value="scrapped">Scrapped</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="location" className="form-label">Location *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="e.g., Building A - Floor 2"
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="serialNumber" className="form-label">Serial Number *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="serialNumber"
                          name="serialNumber"
                          value={formData.serialNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., SN-123456"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="purchaseDate" className="form-label">Purchase Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="purchaseDate"
                          name="purchaseDate"
                          value={formData.purchaseDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="warrantyExpiry" className="form-label">Warranty Expiry</label>
                        <input
                          type="date"
                          className="form-control"
                          id="warrantyExpiry"
                          name="warrantyExpiry"
                          value={formData.warrantyExpiry}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-top-0 py-3 px-4">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary px-4">
                      {editingEquipment ? 'Update Equipment' : 'Add Equipment'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EquipmentListPage;