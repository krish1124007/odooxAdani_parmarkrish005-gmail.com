import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../../components/layout/PageContainer';
import userService from '../../../services/userService';
import EmptyState from '../../../components/common/EmptyState';

const UserRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setIsLoading(true);
            const response = await userService.getMyRequests();
            if (response.success) {
                setRequests(response.data || []);
            }
        } catch (err) {
            console.error("Error fetching requests:", err);
            setError("Failed to load your requests.");
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'New': 'badge-info',
            'Pending': 'badge-warning',
            'In Progress': 'badge-primary',
            'Completed': 'badge-success',
            'Rejected': 'badge-danger',
            'Closed': 'badge-secondary'
        };
        const badgeClass = statusMap[status] || 'badge-secondary';
        return `badge ${badgeClass}`;
    };

    const getPriorityBadge = (priority) => {
        const priorityMap = {
            'High': 'text-danger fw-bold',
            'Medium': 'text-warning fw-bold',
            'Low': 'text-success fw-bold'
        };
        return priorityMap[priority] || 'text-muted';
    };

    return (
        <PageContainer
            title="My Requests"
            subtitle="View and track your maintenance request history"
            actions={
                <Link to="/user/create-request" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i>New Request
                </Link>
            }
        >
            {isLoading ? (
                <div className="card shadow-sm border-0">
                    <div className="card-body text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading your requests...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>{error}
                </div>
            ) : requests.length === 0 ? (
                <div className="card shadow-sm border-0">
                    <div className="card-body p-5">
                        <EmptyState
                            icon="bi-clipboard-x"
                            title="No Requests Found"
                            message="You haven't submitted any maintenance requests yet."
                            action={
                                <Link to="/user/create-request" className="btn btn-primary mt-3">
                                    <i className="bi bi-plus-circle me-2"></i>Create First Request
                                </Link>
                            }
                        />
                    </div>
                </div>
            ) : (
                <div className="card shadow-sm border-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th className="border-0 p-3">Equipment / Subject</th>
                                    <th className="border-0 p-3">Department</th>
                                    <th className="border-0 p-3">Status</th>
                                    <th className="border-0 p-3">Priority</th>
                                    <th className="border-0 p-3">Date</th>
                                    {/* <th className="border-0 p-3">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((req) => (
                                    <tr key={req._id || req.id}>
                                        <td className="p-3">
                                            <div className="fw-bold text-dark">
                                                {(req.equipment && req.equipment.name)
                                                    ? req.equipment.name
                                                    : (req.equipment_id && req.equipment_id.name)
                                                        ? req.equipment_id.name
                                                        : 'General Issue'}
                                            </div>
                                            <small className="text-muted d-block text-truncate" style={{ maxWidth: '250px' }}>
                                                {req.description}
                                            </small>
                                        </td>
                                        <td className="p-3">{req.department}</td>
                                        <td className="p-3">
                                            <span className={getStatusBadge(req.status)}>
                                                {req.status || 'New'}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <span className={getPriorityBadge(req.priority)}>
                                                <i className={`bi bi-circle-fill me-1 small`}></i>
                                                {req.priority || 'Medium'}
                                            </span>
                                        </td>
                                        <td className="p-3 text-muted">
                                            {new Date(req.createdAt).toLocaleDateString()}
                                        </td>
                                        {/* <td className="p-3">
                                            <button className="btn btn-sm btn-outline-secondary" title="View Details">
                                                <i className="bi bi-eye"></i>
                                            </button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </PageContainer>
    );
};

export default UserRequestsPage;
