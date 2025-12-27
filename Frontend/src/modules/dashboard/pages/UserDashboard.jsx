import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../../../services/userService';
import { useTheme } from '../../../context/ThemeContext';

const UserDashboard = () => {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const [stats, setStats] = useState([
        {
            label: 'Total Requests',
            value: '0',
            icon: 'bi-folder-fill',
            bgColor: 'rgba(113, 75, 103, 0.1)',
            iconColor: '#714B67',
        },
        {
            label: 'Active Requests',
            value: '0',
            icon: 'bi-hourglass-split',
            bgColor: 'rgba(255, 193, 7, 0.1)',
            iconColor: '#FFC107',
        },
        {
            label: 'Completed',
            value: '0',
            icon: 'bi-check-circle-fill',
            bgColor: 'rgba(40, 167, 69, 0.1)',
            iconColor: '#28A745',
        },
    ]);
    const [recentRequests, setRecentRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);
            const response = await userService.getMyRequests();
            const requests = response.data || [];

            // Calculate stats
            const total = requests.length;
            const active = requests.filter(r => r.status !== 'Completed' && r.status !== 'Closed').length;
            const completed = requests.filter(r => r.status === 'Completed').length;

            setStats([
                {
                    label: 'Total Requests',
                    value: total.toString(),
                    icon: 'bi-folder2-open',
                    bgColor: 'rgba(113, 75, 103, 0.1)',
                    iconColor: '#714B67',
                },
                {
                    label: 'Active Requests',
                    value: active.toString(),
                    icon: 'bi-hourglass-split',
                    bgColor: 'rgba(255, 193, 7, 0.1)',
                    iconColor: '#FFC107',
                },
                {
                    label: 'Completed',
                    value: completed.toString(),
                    icon: 'bi-check-circle-fill',
                    bgColor: 'rgba(40, 167, 69, 0.1)',
                    iconColor: '#28A745',
                },
            ]);

            setRecentRequests(requests.slice(0, 5)); // Show last 5
        } catch (error) {
            console.error('Error fetching user dashboard data:', error);
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
            'Rejected': 'badge-danger'
        };
        return statusMap[status] || 'badge-secondary';
    };

    const quickActions = [
        { title: 'New Request', icon: 'bi-plus-circle', color: '#714B67', link: '/user/create-request' }, // Adjusted link
        { title: 'My Requests', icon: 'bi-list-ul', color: '#017E84', link: '/user/requests' },
        { title: 'Feedback', icon: 'bi-chat-dots', color: '#FFC107', link: '/user/feedback' },
    ];

    if (isLoading) {
        return (
            <div className="dashboard-container">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Welcome Section */}
            <div className="dashboard-header">
                <div className="welcome-section">
                    <h1 className="dashboard-title">My Dashboard</h1>
                    <p className="dashboard-subtitle">Manage your maintenance requests and view status</p>
                </div>
                <div className="dashboard-date">
                    <i className="bi bi-calendar3"></i>
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stats-card">
                        <div className="stats-card-body">
                            <div className="stats-icon" style={{ backgroundColor: stat.bgColor }}>
                                <i className={`bi ${stat.icon}`} style={{ color: stat.iconColor }}></i>
                            </div>
                            <div className="stats-content">
                                <div className="stats-value">{stat.value}</div>
                                <div className="stats-label">{stat.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="section-container">
                <h2 className="section-title">Quick Actions</h2>
                <div className="quick-actions-grid">
                    {quickActions.map((action, index) => (
                        <Link key={index} to={action.link} className="quick-action-card">
                            <div className="quick-action-icon" style={{ backgroundColor: `${action.color}15` }}>
                                <i className={`bi ${action.icon}`} style={{ color: action.color }}></i>
                            </div>
                            <div className="quick-action-title">{action.title}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Requests */}
            <div className="section-container">
                <div className="section-header">
                    <h2 className="section-title">My Recent Requests</h2>
                    <Link to="/user/requests" className="view-all-link">
                        View All <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>
                <div className="requests-table-card">
                    {recentRequests.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Title/Equipment</th>
                                    <th>Department</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRequests.map((request) => (
                                    <tr key={request._id || request.id}>
                                        <td>
                                            <div className="fw-bold">{request.equipment_id?.name || request.equipment || 'General Request'}</div>
                                            <small className="text-muted">{request.description?.substring(0, 30)}...</small>
                                        </td>
                                        <td>{request.department}</td>
                                        <td>
                                            <span className={`badge ${request.priority === 'High' ? 'badge-danger' : request.priority === 'Medium' ? 'badge-warning' : 'badge-success'}`}>
                                                {request.priority || 'Medium'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${getStatusBadge(request.status)}`}>
                                                {request.status || 'New'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-muted">{new Date(request.createdAt).toLocaleDateString()}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-muted">No requests found. Create one to get started!</p>
                            <Link to="/user/create-request" className="btn btn-primary btn-sm">
                                Create Request
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
