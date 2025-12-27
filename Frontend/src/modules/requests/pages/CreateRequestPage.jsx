import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../../components/layout/PageContainer';
import userService from '../../../services/userService';
import adminService from '../../../services/adminService'; // To fetch equipment list
import { useAuth } from '../../../context/AuthContext';

const CreateRequestPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [equipmentList, setEquipmentList] = useState([]);
    const [formData, setFormData] = useState({
        equipment_id: '',
        priority: 'Medium',
        department: '', // Can be pre-filled if user has department
        description: '',
        images: null
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        try {
            // We reuse adminService to get equipment, assuming user has read access or we have a public/authorized endpoint
            // If adminService.getEquipment requires admin role, we might need a user specific endpoint. 
            // For now, let's try adminService or fallback to a mock if it fails 403.
            // Actually, usually dropdowns need a public/user accessible list.
            // Let's assume we can use adminService.getEquipment() or need to add getEquipment to userService.
            const response = await adminService.getEquipment();
            if (response.success) {
                setEquipmentList(response.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch equipment", err);
            // Fallback empty or manually handle
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await userService.createRequest(formData);
            navigate('/user/requests');
        } catch (err) {
            setError(err.message || 'Failed to create request');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageContainer title="Create Maintenance Request" subtitle="Submit a new request for equipment maintenance">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    <i className="bi bi-exclamation-triangle me-2"></i>{error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="equipment_id" className="form-label fw-semibold">Equipment / Asset</label>
                                    <select
                                        id="equipment_id"
                                        name="equipment_id"
                                        className="form-select"
                                        value={formData.equipment_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Equipment</option>
                                        {equipmentList.map(eq => (
                                            <option key={eq._id} value={eq._id}>{eq.name} ({eq.serialNumber})</option>
                                        ))}
                                    </select>
                                    <div className="form-text">Select the specific equipment requiring maintenance.</div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="priority" className="form-label fw-semibold">Priority</label>
                                        <select
                                            id="priority"
                                            name="priority"
                                            className="form-select"
                                            value={formData.priority}
                                            onChange={handleChange}
                                        >
                                            <option value="Low">Low - Cosmetic/Minor</option>
                                            <option value="Medium">Medium - Affects Efficiency</option>
                                            <option value="High">High - Critical/Stopped</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="department" className="form-label fw-semibold">Department</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="department"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            placeholder="e.g. Production, Operations"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="description" className="form-label fw-semibold">Description of Issue</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Please describe the issue in detail..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/user')}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary px-4" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-send me-2"></i>Submit Request
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default CreateRequestPage;
