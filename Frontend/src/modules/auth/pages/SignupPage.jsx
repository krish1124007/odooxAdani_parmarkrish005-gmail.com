import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';
import authService from '../../../services/authService';
import '../../../styles/LoginPage.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.phone_number && !/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    setSuccess('');
    
    try {
      // Call backend API - expects { name, email, password, phone_number? }
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      
      // Add phone_number only if provided
      if (formData.phone_number) {
        signupData.phone_number = parseInt(formData.phone_number);
      }

      const response = await authService.signup(signupData);
      
      // Backend returns: { success, message, data: { ...user } }
      if (response.success) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ 
        submit: error.message || 'Signup failed. Please try again.' 
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
            <p className="text-muted">Create your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                disabled={isLoading}
                style={{ padding: '0.75rem', fontSize: '1rem' }}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
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
              <label htmlFor="phone_number" className="form-label fw-semibold">
                Phone Number <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="tel"
                className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                disabled={isLoading}
                style={{ padding: '0.75rem', fontSize: '1rem' }}
              />
              {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                disabled={isLoading}
                style={{ padding: '0.75rem', fontSize: '1rem' }}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                disabled={isLoading}
                style={{ padding: '0.75rem', fontSize: '1rem' }}
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            {errors.submit && (
              <div className="alert alert-danger py-2" role="alert">
                {errors.submit}
              </div>
            )}

            {success && (
              <div className="alert alert-success py-2" role="alert">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-lg w-100 text-white fw-semibold mb-3"
              disabled={isLoading}
              style={{ backgroundColor: '#8e7a8a', border: 'none', padding: '0.75rem' }}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Creating Account...
                </>
              ) : (
                'CREATE ACCOUNT'
              )}
            </button>

            <div className="text-center">
              <span className="text-muted">Already have an account? </span>
              <button 
                type="button" 
                className="btn btn-link text-decoration-none p-0" 
                onClick={() => navigate('/login')} 
                style={{ color: '#017E84' }}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
