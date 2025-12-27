import { useState, useEffect } from 'react';
import PageContainer from '../../../components/layout/PageContainer';

const RequestListPage = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for now - replace with API call later
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRequests([
        {
          id: 'REQ-001',
          subject: 'AC Unit Maintenance',
          equipment: 'HVAC Unit #3',
          type: 'Preventive',
          assignedTo: 'John Doe',
          status: 'In Progress',
          priority: 'High',
          createdAt: '2024-12-20'
        },
        {
          id: 'REQ-002',
          subject: 'Machine Repair',
          equipment: 'CNC Machine #5',
          type: 'Corrective',
          assignedTo: 'Sarah Smith',
          status: 'New',
          priority: 'Medium',
          createdAt: '2024-12-21'
        },
        {
          id: 'REQ-003',
          subject: 'Forklift Inspection',
          equipment: 'Forklift #12',
          type: 'Preventive',
          assignedTo: 'Mike Johnson',
          status: 'Completed',
          priority: 'Low',
          createdAt: '2024-12-18'
        }
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const getStatusBadge = (status) => {
    const statusMap = {
      'New': 'badge bg-info',
      'In Progress': 'badge bg-warning',
      'Completed': 'badge bg-success',
      'Cancelled': 'badge bg-danger'
    };
    return statusMap[status] || 'badge bg-secondary';
  };

  const getPriorityBadge = (priority) => {
    const priorityMap = {
      'High': 'badge bg-danger',
      'Medium': 'badge bg-warning',
      'Low': 'badge bg-success'
    };
    return priorityMap[priority] || 'badge bg-secondary';
  };

  return (
    <PageContainer
      title="Maintenance Requests"
      subtitle="Track and manage all maintenance activities"
      actions={
        <>
          <button className="btn btn-outline-secondary me-2">
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
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading requests...</p>
            </div>
          ) : (
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
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center text-muted py-5">
                        No maintenance requests found
                      </td>
                    </tr>
                  ) : (
                    requests.map((request) => (
                      <tr key={request.id}>
                        <td>
                          <span className="fw-semibold text-primary">{request.id}</span>
                        </td>
                        <td>{request.subject}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <i className="bi bi-gear-fill text-muted me-2"></i>
                            {request.equipment}
                          </div>
                        </td>
                        <td>{request.type}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-circle me-2" style={{
                              width: '30px',
                              height: '30px',
                              backgroundColor: '#714B67',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '50%',
                              fontSize: '0.75rem',
                              fontWeight: 'bold'
                            }}>
                              {request.assignedTo.split(' ').map(n => n[0]).join('')}
                            </div>
                            {request.assignedTo}
                          </div>
                        </td>
                        <td>
                          <span className={getStatusBadge(request.status)}>
                            {request.status}
                          </span>
                        </td>
                        <td>
                          <span className={getPriorityBadge(request.priority)}>
                            {request.priority}
                          </span>
                        </td>
                        <td className="text-muted">{request.createdAt}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary" title="View">
                              <i className="bi bi-eye"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-secondary" title="Edit">
                              <i className="bi bi-pencil"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default RequestListPage;
