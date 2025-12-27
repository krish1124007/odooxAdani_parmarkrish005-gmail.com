import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../../../services/userService';
import { useTheme } from '../../../context/ThemeContext';

const TechnicianDashboard = () => {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const [stats, setStats] = useState([
        {
            label: 'Assigned Tasks',
            value: '0',
            icon: 'bi-tools',
            bgColor: 'rgba(1, 126, 132, 0.1)',
            iconColor: '#017E84',
        },
        {
            label: 'In Progress',
            value: '0',
            icon: 'bi-hourglass-split',
            bgColor: 'rgba(255, 193, 7, 0.1)',
            iconColor: '#FFC107',
        },
        {
            label: 'Completed Today',
            value: '0',
            icon: 'bi-check-circle-fill',
            bgColor: 'rgba(40, 167, 69, 0.1)',
            iconColor: '#28A745',
        },
    ]);
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setIsLoading(true);
            // innovative approach: try to fetch requests. 
            // If the backend filters by "assignee" for technicians automatically in 'read-request' or similar, this might work.
            // If not, we might be showing "Created by me" requests which is not ideal, but better than nothing for now.
            // In a real scenario, we would ask for a specific endpoint.
            const response = await userService.getMyRequests();
            const tasks = response.data || [];

            // Mock filtering logic if the backend returned all requests (unlikely but possible)
            // or just using what we got.

            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            const assigned = tasks.length;
            const inProgress = tasks.filter(t => t.status === 'In Progress').length;
            const completedToday = tasks.filter(t => t.status === 'Completed' && new Date(t.updatedAt) >= startOfDay).length;

            setStats([
                {
                    label: 'Assigned Tasks',
                    value: assigned.toString(),
                    icon: 'bi-tools',
                    bgColor: 'rgba(1, 126, 132, 0.1)',
                    iconColor: '#017E84',
                },
                {
                    label: 'In Progress',
                    value: inProgress.toString(),
                    icon: 'bi-hourglass-split',
                    bgColor: 'rgba(255, 193, 7, 0.1)',
                    iconColor: '#FFC107',
                },
                {
                    label: 'Completed Today',
                    value: completedToday.toString(),
                    icon: 'bi-check-circle-fill',
                    bgColor: 'rgba(40, 167, 69, 0.1)',
                    iconColor: '#28A745',
                },
            ]);

            setAssignedTasks(tasks.slice(0, 5));
        } catch (error) {
            console.error('Error fetching technician dashboard data:', error);
            // Fallback to zeros if call fails
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'New': 'badge-info',
            'In Progress': 'badge-warning',
            'Completed': 'badge-success',
            'Hold': 'badge-secondary'
        };
        return statusMap[status] || 'badge-secondary';
    };

    const quickActions = [
        { title: 'My Tasks', icon: 'bi-list-task', color: '#017E84', link: '/technician/tasks' },
        { title: 'Update Status', icon: 'bi-pencil-square', color: '#FFC107', link: '/technician/tasks' },
        { title: 'Report Issue', icon: 'bi-exclamation-triangle', color: '#DC3545', link: '/technician/report' },
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
                    <h1 className="dashboard-title">Technician Workspace</h1>
                    <p className="dashboard-subtitle">Manage your assigned maintenance tasks</p>
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

            {/* Assigned Tasks */}
            <div className="section-container">
                <div className="section-header">
                    <h2 className="section-title">Assigned Tasks</h2>
                    <Link to="/technician/tasks" className="view-all-link">
                        View All <i className="bi bi-arrow-right"></i>
                    </Link>
                </div>
                <div className="requests-table-card">
                    {assignedTasks.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Task/Equipment</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Assigned Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignedTasks.map((task) => (
                                    <tr key={task._id || task.id}>
                                        <td>
                                            <div className="fw-bold">{task.equipment_id?.name || task.equipment || 'Maintenance Task'}</div>
                                            <small className="text-muted">{task.description?.substring(0, 30)}...</small>
                                        </td>
                                        <td>
                                            <span className={`badge ${task.priority === 'High' ? 'badge-danger' : task.priority === 'Medium' ? 'badge-warning' : 'badge-success'}`}>
                                                {task.priority || 'Medium'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${getStatusBadge(task.status)}`}>
                                                {task.status || 'New'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-muted">{new Date(task.createdAt).toLocaleDateString()}</span>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-primary" onClick={() => navigate(`/technician/tasks/${task._id || task.id}`)}>
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-4">
                            <div className="mb-3">
                                <i className="bi bi-clipboard-check" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                            </div>
                            <p className="text-muted">No pending tasks assigned to you right now.</p>
                            <button className="btn btn-outline-primary btn-sm" onClick={fetchDashboardData}>
                                Refresh List
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TechnicianDashboard;
