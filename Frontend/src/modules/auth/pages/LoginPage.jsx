import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { colors, isDark, toggleTheme } = useTheme();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Use login from AuthContext instead of direct service call
      const response = await login(
        {
          email: formData.email,
          password: formData.password
        },
        formData.role
      );

      if (response.success) {
        // Route based on role
        if (formData.role === 'admin') {
          navigate('/dashboard');
        } else if (formData.role === 'user') {
          navigate('/user');
        } else if (formData.role === 'technician') {
          navigate('/technician');
        }
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        submit: error.message || 'Login failed. Please check your credentials.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
      style={{ backgroundColor: isDark ? '#0a0e1a' : '#f8f9fa' }}>

      <button
        className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle"
        onClick={toggleTheme}
        style={{ width: '45px', height: '45px' }}
      >
        <i className={`bi bi-${isDark ? 'sun' : 'moon'}-fill`}></i>
      </button>

      <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '500px', margin: '20px' }}>
        <div className="card-body p-5">

          <div className="text-center mb-4">
            <h1 className="fw-bold odoo-logo" style={{
              fontSize: '3rem',
              color: '#714B67',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-2px'
            }}>
              GearGuard
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="role" className="form-label fw-semibold">Select Role</label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                disabled={isLoading}
                style={{ padding: '0.75rem', fontSize: '1rem' }}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="technician">Technician</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                disabled={isLoading}
                style={{ padding: '0.75rem', fontSize: '1rem' }}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  disabled={isLoading}
                  style={{ padding: '0.75rem', fontSize: '1rem' }}
                />
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
              </div>
            </div>

            {errors.submit && <div className="alert alert-danger py-2" role="alert">{errors.submit}</div>}

            <button
              type="submit"
              className="btn btn-lg w-100 text-white fw-semibold mb-3"
              disabled={isLoading}
              style={{ backgroundColor: '#8e7a8a', border: 'none', padding: '0.75rem' }}
            >
              {isLoading ? (<><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</>) : 'SIGN IN'}
            </button>

            <div className="text-center">
              <button type="button" className="btn btn-link text-decoration-none p-0" style={{ color: '#017E84' }}>
                Forget Password ?
              </button>
              <span className="mx-2">|</span>
              <button type="button" className="btn btn-link text-decoration-none p-0" onClick={() => navigate('/signup')} style={{ color: '#017E84' }}>
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-4 p-3 bg-light rounded">
            <small className="text-muted">
              <strong>Demo Credentials:</strong><br />
              Email: admin@admin.com<br />
              Password: admin123
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
