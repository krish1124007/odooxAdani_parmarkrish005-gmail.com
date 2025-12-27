import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import '../../../styles/EmailLogin.css';

const EmailLogin = () => {
  const navigate = useNavigate();
  const { colors, isDark, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: 'user'
      };
      localStorage.setItem('authToken', 'mock-signup-token-' + Date.now());
      localStorage.setItem('userData', JSON.stringify(newUser));
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: error.message || 'Sign up failed.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden" style={{ backgroundColor: isDark ? '#0a0e1a' : '#f8f9fa' }}>
      
      <button className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle" onClick={toggleTheme} style={{ width: '45px', height: '45px', zIndex: 10 }}>
        <i className={`bi bi-${isDark ? 'sun' : 'moon'}-fill`}></i>
      </button>

      <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '480px', margin: '20px', maxHeight: 'calc(100vh - 40px)' }}>
        <div className="card-body p-4" style={{ overflowY: 'auto' }}>
          
          <div className="text-center mb-4">
            <h1 className="fw-bold odoo-logo" style={{ fontSize: '2.5rem', color: '#714B67', fontFamily: 'Inter, sans-serif', letterSpacing: '-2px', marginBottom: '1rem' }}>GearGuard</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold mb-1">Name</label>
              <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" disabled={isLoading} style={{ padding: '0.6rem', fontSize: '0.95rem' }} />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold mb-1">Email</label>
              <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@example.com" disabled={isLoading} style={{ padding: '0.6rem', fontSize: '0.95rem' }} />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold mb-1">Password</label>
              <div className="input-group">
                <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••••" disabled={isLoading} style={{ padding: '0.6rem', fontSize: '0.95rem' }} />
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label fw-semibold mb-1">Re-Enter password</label>
              <div className="input-group">
                <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••••" disabled={isLoading} style={{ padding: '0.6rem', fontSize: '0.95rem' }} />
                {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
              </div>
            </div>

            {errors.submit && <div className="alert alert-danger py-2 mb-3" role="alert">{errors.submit}</div>}

            <button type="submit" className="btn btn-lg w-100 text-white fw-semibold mb-3" disabled={isLoading} style={{ backgroundColor: '#8e7a8a', border: 'none', padding: '0.7rem' }}>
              {isLoading ? (<><span className="spinner-border spinner-border-sm me-2"></span>Creating account...</>) : 'SIGN UP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailLogin;
