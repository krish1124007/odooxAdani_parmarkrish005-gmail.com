import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';

const AppLayout = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content-top">
        <div className="container-fluid p-4">
          {/* Logout button */}
          <div className="d-flex justify-content-end mb-3">
            <div className="d-flex align-items-center gap-3">
              <span className="text-muted">
                <i className="bi bi-person-circle me-2"></i>
                {user?.admin?.email || user?.email || 'Admin'}
              </span>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            </div>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
