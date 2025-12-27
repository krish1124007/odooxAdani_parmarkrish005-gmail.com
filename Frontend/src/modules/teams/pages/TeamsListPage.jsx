import { useState, useEffect } from 'react';
import PageContainer from '../../../components/layout/PageContainer';
import EmptyState from '../../../components/common/EmptyState';
import adminService from '../../../services/adminService';
import './TeamsListPage.css';

const TeamsListPage = () => {
  const [activeTab, setActiveTab] = useState('technicians');
  const [technicians, setTechnicians] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  const [technicianForm, setTechnicianForm] = useState({
    name: '',
    email: '',
    password: '',
    team: ''
  });

  const [teamForm, setTeamForm] = useState({
    name: '',
    code: '',
    description: '',
    isActive: true
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch data sequentially to avoid race conditions
      const techniciansResponse = await adminService.getTechnicians();
      const teamsResponse = await adminService.getMaintenanceTeams();

      if (techniciansResponse.success) {
        setTechnicians(techniciansResponse.data || []);
      } else {
        throw new Error(techniciansResponse.message || 'Failed to fetch technicians');
      }

      if (teamsResponse.success) {
        setTeams(teamsResponse.data || []);
      } else {
        console.warn('Failed to fetch teams:', teamsResponse.message);
      }

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load data. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add this function to debug
  const debugFetch = async () => {
    console.log('Debug fetch started...');
    console.log('LocalStorage token:', localStorage.getItem('authToken'));

    try {
      const response = await adminService.getTechnicians();
      console.log('API Response:', response);
      return response;
    } catch (error) {
      console.error('Debug fetch error:', error);
      return null;
    }
  };

  const handleTechnicianInputChange = (e) => {
    const { name, value } = e.target;
    setTechnicianForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTeamForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalType === 'technician') {
        if (editingItem) {
          const payload = { ...technicianForm };
          if (!payload.password) {
            delete payload.password;
          }
          const response = await adminService.updateTechnician(editingItem._id, payload);
          if (response.success) {
            await fetchInitialData();
            handleCloseModal();
          } else {
            alert(response.message || 'Failed to update technician');
          }
        } else {
          const response = await adminService.createTechnician(technicianForm);
          if (response.success) {
            await fetchInitialData();
            handleCloseModal();
          } else {
            alert(response.message || 'Failed to create technician');
          }
        }
      } else if (modalType === 'team') {
        if (editingItem) {
          const response = await adminService.updateMaintenanceTeam(editingItem._id, teamForm);
          if (response.success) {
            await fetchInitialData();
            handleCloseModal();
          } else {
            alert(response.message || 'Failed to update team');
          }
        } else {
          const response = await adminService.createMaintenanceTeam(teamForm);
          if (response.success) {
            await fetchInitialData();
            handleCloseModal();
          } else {
            alert(response.message || 'Failed to create team');
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
      password: '',
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
        await fetchInitialData();
      } else {
        alert(response.message || 'Failed to delete technician');
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
      const response = await adminService.deleteMaintenanceTeam(id);
      if (response.success) {
        await fetchInitialData();
      } else {
        alert(response.message || 'Failed to delete team');
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

  const renderTechniciansTable = () => (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
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
                <td>
                  <span className="badge bg-odoo-primary">
                    {team?.name || 'No Team'}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEditTechnician(technician)}
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteTechnician(technician._id)}
                      title="Delete"
                    >
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
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEditTeam(team)}
                      title="Edit"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteTeam(team._id)}
                      title="Delete"
                    >
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
  );

  // Main render
  return (
    <div style={{ position: 'relative' }}>
      <PageContainer
        title="Teams & Technicians"
        subtitle="Manage maintenance teams and their members"
        actions={
          <div className="d-flex gap-2">
            <button
              className="btn btn-odoo-primary d-flex align-items-center gap-2"
              onClick={() => handleAddNew('technician')}
            >
              <i className="bi bi-person-plus fs-5"></i>
              <span>Add Technician</span>
            </button>
            <button
              className="btn btn-odoo-secondary d-flex align-items-center gap-2"
              onClick={() => handleAddNew('team')}
            >
              <i className="bi bi-people-fill fs-5"></i>
              <span>Add Team</span>
            </button>
          </div>
        }
      >
        {/* Debug button for testing */}
        <button
          className="btn btn-sm btn-outline-info mb-3"
          onClick={() => debugFetch()}
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}
        >
          <i className="bi bi-bug me-1"></i>Test API
        </button>

        {isLoading ? (
          <div className="card shadow-sm border-0">
            <div className="card-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>
                <strong>Error:</strong> {error}
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={fetchInitialData}>
                  <i className="bi bi-arrow-clockwise me-2"></i>Retry
                </button>
                <button className="btn btn-outline-secondary" onClick={() => console.log('LocalStorage:', localStorage.getItem('authToken'))}>
                  <i className="bi bi-info-circle me-2"></i>Check Token
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}

        {/* Modal */}
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
                      {/* Form content remains the same */}
                      {modalType === 'technician' ? (
                        <>
                          <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-semibold">Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              value={technicianForm.name}
                              onChange={handleTechnicianInputChange}
                              required
                              placeholder="Enter full name"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">Email *</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={technicianForm.email}
                              onChange={handleTechnicianInputChange}
                              required
                              placeholder="Enter email address"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-semibold">
                              Password {editingItem ? '(leave blank to keep current)' : '*'}
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              value={technicianForm.password}
                              onChange={handleTechnicianInputChange}
                              required={!editingItem}
                              placeholder="Enter password"
                              minLength={6}
                            />
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
                            <input
                              type="text"
                              className="form-control"
                              id="teamName"
                              name="name"
                              value={teamForm.name}
                              onChange={handleTeamInputChange}
                              required
                              placeholder="Enter team name"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="code" className="form-label fw-semibold">Team Code *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="code"
                              name="code"
                              value={teamForm.code}
                              onChange={handleTeamInputChange}
                              required
                              placeholder="e.g., MT-001"
                            />
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
                                onChange={handleTeamInputChange}
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