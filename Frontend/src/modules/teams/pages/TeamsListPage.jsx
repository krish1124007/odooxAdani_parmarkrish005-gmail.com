import { useState, useEffect } from 'react';
import PageContainer from '../../../components/layout/PageContainer';
import EmptyState from '../../../components/common/EmptyState';
import adminService from './adminService';
import './TeamsListPage.css';

const TeamsListPage = () => {
  const [activeTab, setActiveTab] = useState('technicians'); // 'technicians' or 'teams'
  const [technicians, setTechnicians] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'team' or 'technician'
  const [editingItem, setEditingItem] = useState(null);

  // Technician form data
  const [technicianForm, setTechnicianForm] = useState({
    name: '',
    email: '',
    password: '',
    phone_number: '',
    specialization: '',
    team: ''
  });

  // Team form data
  const [teamForm, setTeamForm] = useState({
    name: '',
    code: '',
    description: '',
    isActive: true
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await Promise.all([fetchTechnicians(), fetchTeams()]);
    } catch (err) {
      console.error('Error initializing page:', err);
      setError(err.message || 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTechnicians = async () => {
    try {
      const response = await adminService.getTechnicians();
      if (response.success) {
        setTechnicians(response.data || []);
      } else {
        throw new Error(response.message || 'Failed to fetch technicians');
      }
    } catch (err) {
      console.error('Error fetching technicians:', err);
      setError(err.message || 'Failed to load technicians');
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await adminService.getMaintenanceTeams();
      if (response.success) {
        setTeams(response.data || []);
      } else {
        throw new Error(response.message || 'Failed to fetch maintenance teams');
      }
    } catch (err) {
      console.error('Error fetching maintenance teams:', err);
      setError(err.message || 'Failed to load maintenance teams');
    }
  };

  // Handle input changes for technician form
  const handleTechnicianInputChange = (e) => {
    const { name, value } = e.target;
    setTechnicianForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle input changes for team form
  const handleTeamInputChange = (e) => {
    const { name, value } = e.target;
    setTeamForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalType === 'technician') {
        if (editingItem) {
          // Update existing technician
          const response = await adminService.updateTechnician(editingItem._id, technicianForm);
          if (response.success) {
            await fetchTechnicians();
            handleCloseModal();
          }
        } else {
          // Create new technician
          const response = await adminService.createTechnician(technicianForm);
          if (response.success) {
            await fetchTechnicians();
            handleCloseModal();
          }
        }
      } else if (modalType === 'team') {
        if (editingItem) {
          // Update existing team
          const response = await adminService.updateMaintenance(editingItem._id, teamForm);
          if (response.success) {
            await fetchTeams();
            handleCloseModal();
          }
        } else {
          // Create new team
          const response = await adminService.createMaintenance(teamForm);
          if (response.success) {
            await fetchTeams();
            handleCloseModal();
          }
        }
      }
    } catch (err) {
      console.error('Error saving:', err);
      alert(err.message || `Failed to save ${modalType}`);
    }
  };

  const handleEditTechnician = (technician) => {
    setModalType('technician');
    setEditingItem(technician);
    setTechnicianForm({
      name: technician.name || '',
      email: technician.email || '',
      password: '', // Don't populate password for security
      phone_number: technician.phone_number || '',
      specialization: technician.specialization || '',
      team: technician.team || ''
    });
    setShowModal(true);
  };

  const handleEditTeam = (team) => {
    setModalType('team');
    setEditingItem(team);
    setTeamForm({
      name: team.name || '',
      code: team.code || '',
      description: team.description || '',
      isActive: team.isActive !== undefined ? team.isActive : true
    });
    setShowModal(true);
  };

  const handleDeleteTechnician = async (id) => {
    if (!window.confirm('Are you sure you want to delete this technician?')) {
      return;
    }

    try {
      const response = await adminService.deleteTechnician(id);
      if (response.success) {
        await fetchTechnicians();
      }
    } catch (err) {
      console.error('Error deleting technician:', err);
      alert(err.message || 'Failed to delete technician');
    }
  };

  const handleDeleteTeam = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team? This will remove all associated technicians.')) {
      return;
    }

    try {
      const response = await adminService.deleteMaintenance(id);
      if (response.success) {
        await fetchTeams();
      }
    } catch (err) {
      console.error('Error deleting team:', err);
      alert(err.message || 'Failed to delete team');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setModalType('');
    setTechnicianForm({
      name: '',
      email: '',
      password: '',
      phone_number: '',
      specialization: '',
      team: ''
    });
    setTeamForm({
      name: '',
      code: '',
      description: '',
      isActive: true
    });
  };

  const handleAddNew = (type) => {
    setModalType(type);
    setEditingItem(null);
    if (type === 'technician') {
      setTechnicianForm({
        name: '',
        email: '',
        password: '',
        phone_number: '',
        specialization: '',
        team: ''
      });
    } else {
      setTeamForm({
        name: '',
        code: '',
        description: '',
        isActive: true
      });
    }
    setShowModal(true);
  };

  // Modal styles
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto',
      padding: '20px'
    }
  };

  const renderTechniciansTable = () => (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Specialization</th>
            <th>Team</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => {
            const team = teams.find(t => t._id === technician.team);
            return (
              <tr key={technician._id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar-circle me-2">
                      {technician.name?.charAt(0).toUpperCase() || 'T'}
                    </div>
                    <span className="fw-semibold">{technician.name}</span>
                  </div>
                </td>
                <td>{technician.email}</td>
                <td>{technician.phone_number || 'N/A'}</td>
                <td>{technician.specialization || 'General'}</td>
                <td>
                  <span className="badge bg-odoo-primary">
                    {team?.name || 'No Team'}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEditTechnician(technician)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteTechnician(technician._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderTeamsTable = () => (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
            <th>Status</th>
            <th>Member Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => {
            const memberCount = technicians.filter(t => t.team === team._id).length;
            return (
              <tr key={team._id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar-circle me-2 bg-odoo-secondary">
                      <i className="bi bi-people-fill"></i>
                    </div>
                    <span className="fw-semibold">{team.name}</span>
                  </div>
                </td>
                <td><code>{team.code}</code></td>
                <td>{team.description || 'No description'}</td>
                <td>
                  <span className={`badge ${team.isActive ? 'bg-success' : 'bg-secondary'}`}>
                    {team.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <span className="badge bg-info">{memberCount} members</span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEditTeam(team)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteTeam(team._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  if (isLoading) {
    return (
      <PageContainer title="Teams & Technicians" subtitle="Manage maintenance teams and their members">
        <div className="card">
          <div className="card-body text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading data...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Teams & Technicians" subtitle="Manage maintenance teams and their members">
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
      </PageContainer>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <PageContainer
        title="Teams & Technicians"
        subtitle="Manage maintenance teams and their members"
        actions={
          <div className="d-flex gap-2">
            <button className="btn btn-odoo-primary d-flex align-items-center" onClick={() => handleAddNew('technician')}>
              <i className="bi bi-person-plus me-2 fs-5"></i>
              <span>Add Technician</span>
            </button>
            <button className="btn btn-odoo-secondary d-flex align-items-center" onClick={() => handleAddNew('team')}>
              <i className="bi bi-people-fill me-2 fs-5"></i>
              <span>Add Team</span>
            </button>
          </div>
        }
      >
        {/* Tab Navigation */}
        <div className="mb-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'technicians' ? 'active' : ''}`}
                onClick={() => setActiveTab('technicians')}
              >
                <i className="bi bi-person me-2"></i>Technicians
                <span className="badge bg-odoo-primary ms-2 rounded-pill">{technicians.length}</span>
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'teams' ? 'active' : ''}`}
                onClick={() => setActiveTab('teams')}
              >
                <i className="bi bi-people me-2"></i>Teams
                <span className="badge bg-odoo-secondary ms-2 rounded-pill">{teams.length}</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'technicians' ? (
          technicians.length === 0 ? (
            <div className="card shadow-sm border-0">
              <div className="card-body p-5 text-center">
                <EmptyState
                  icon="bi-people"
                  title="No Technicians Found"
                  message="Create your first technician to get started"
                  action={
                    <button className="btn btn-odoo-primary btn-lg mt-3" onClick={() => handleAddNew('technician')}>
                      <i className="bi bi-person-plus me-2"></i>Add Technician
                    </button>
                  }
                />
              </div>
            </div>
          ) : (
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">{renderTechniciansTable()}</div>
            </div>
          )
        ) : (
          teams.length === 0 ? (
            <div className="card shadow-sm border-0">
              <div className="card-body p-5 text-center">
                <EmptyState
                  icon="bi-people-fill"
                  title="No Teams Found"
                  message="Create your first maintenance team to get started"
                  action={
                    <button className="btn btn-odoo-secondary btn-lg mt-3" onClick={() => handleAddNew('team')}>
                      <i className="bi bi-people-fill me-2"></i>Add Team
                    </button>
                  }
                />
              </div>
            </div>
          ) : (
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">{renderTeamsTable()}</div>
            </div>
          )
        )}

        {/* Modal for creating/editing technicians and teams */}
        {showModal && (
          <>
            <div className="modal-backdrop"></div>
            <div className="modal-wrapper">
              <div className="modal-dialog">
                <div className="modal-content shadow-lg border-0">
                  <div className={`modal-header ${modalType === 'team' ? 'bg-odoo-secondary' : 'bg-odoo-primary'} text-white py-3 px-4`}>
                    <h5 className="modal-title mb-0 fw-bold">
                      <i className={`bi ${modalType === 'team' ? 'bi-people-fill' : 'bi-person-plus-fill'} me-2`}></i>
                      {editingItem ? `Edit ${modalType === 'team' ? 'Team' : 'Technician'}` : `Add New ${modalType === 'team' ? 'Team' : 'Technician'}`}
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
                      {modalType === 'technician' ? (
                        <>
                          <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-semibold">Name *</label>
                            <div className="input-group">
                              <span className="input-group-text bg-light border-end-0"><i className="bi bi-person"></i></span>
                              <input
                                type="text"
                                className="form-control border-start-0 ps-0"
                                id="name"
                                name="name"
                                value={technicianForm.name}
                                onChange={handleTechnicianInputChange}
                                required
                                placeholder="Enter full name"
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">Email *</label>
                            <div className="input-group">
                              <span className="input-group-text bg-light border-end-0"><i className="bi bi-envelope"></i></span>
                              <input
                                type="email"
                                className="form-control border-start-0 ps-0"
                                id="email"
                                name="email"
                                value={technicianForm.email}
                                onChange={handleTechnicianInputChange}
                                required
                                placeholder="Enter email address"
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-semibold">
                              Password {editingItem ? '(leave blank to keep current)' : '*'}
                            </label>
                            <div className="input-group">
                              <span className="input-group-text bg-light border-end-0"><i className="bi bi-lock"></i></span>
                              <input
                                type="password"
                                className="form-control border-start-0 ps-0"
                                id="password"
                                name="password"
                                value={technicianForm.password}
                                onChange={handleTechnicianInputChange}
                                required={!editingItem}
                                placeholder="Enter password"
                                minLength={6}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="phone_number" className="form-label fw-semibold">Phone Number</label>
                              <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><i className="bi bi-telephone"></i></span>
                                <input
                                  type="tel"
                                  className="form-control border-start-0 ps-0"
                                  id="phone_number"
                                  name="phone_number"
                                  value={technicianForm.phone_number}
                                  onChange={handleTechnicianInputChange}
                                  placeholder="Enter phone"
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <label htmlFor="specialization" className="form-label fw-semibold">Specialization</label>
                              <input
                                type="text"
                                className="form-control"
                                id="specialization"
                                name="specialization"
                                value={technicianForm.specialization}
                                onChange={handleTechnicianInputChange}
                                placeholder="e.g., HVAC"
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="team" className="form-label fw-semibold">Team *</label>
                            <select
                              className="form-select"
                              id="team"
                              name="team"
                              value={technicianForm.team}
                              onChange={handleTechnicianInputChange}
                              required
                            >
                              <option value="">Select Team</option>
                              {teams.map(team => (
                                <option key={team._id} value={team._id}>{team.name} ({team.code})</option>
                              ))}
                            </select>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="mb-3">
                            <label htmlFor="teamName" className="form-label fw-semibold">Team Name *</label>
                            <div className="input-group">
                              <span className="input-group-text bg-light border-end-0"><i className="bi bi-people"></i></span>
                              <input
                                type="text"
                                className="form-control border-start-0 ps-0"
                                id="teamName"
                                name="name"
                                value={teamForm.name}
                                onChange={handleTeamInputChange}
                                required
                                placeholder="Enter team name"
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="code" className="form-label fw-semibold">Team Code *</label>
                            <div className="input-group">
                              <span className="input-group-text bg-light border-end-0"><i className="bi bi-upc-scan"></i></span>
                              <input
                                type="text"
                                className="form-control border-start-0 ps-0"
                                id="code"
                                name="code"
                                value={teamForm.code}
                                onChange={handleTeamInputChange}
                                required
                                placeholder="e.g., MT-001"
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="description" className="form-label fw-semibold">Description</label>
                            <textarea
                              className="form-control"
                              id="description"
                              name="description"
                              value={teamForm.description}
                              onChange={handleTeamInputChange}
                              placeholder="Enter team description"
                              rows={3}
                            />
                          </div>
                          <div className="mb-3">
                            <div className="form-check form-switch">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="isActive"
                                name="isActive"
                                checked={teamForm.isActive}
                                onChange={(e) => handleTeamInputChange({
                                  target: { name: 'isActive', value: e.target.checked }
                                })}
                              />
                              <label className="form-check-label fw-semibold" htmlFor="isActive">
                                Active Team
                              </label>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="modal-footer bg-light border-top-0 py-3 px-4">
                      <button type="button" className="btn btn-outline-secondary" onClick={handleCloseModal}>
                        Cancel
                      </button>
                      <button type="submit" className={`btn ${modalType === 'team' ? 'btn-odoo-secondary' : 'btn-odoo-primary'} px-4`}>
                        {editingItem ? 'Update' : 'Create'} {modalType === 'team' ? 'Team' : 'Technician'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </PageContainer>
    </div>
  );
};

export default TeamsListPage;