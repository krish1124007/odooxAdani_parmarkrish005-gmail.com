import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement authentication
    navigate('/')
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow" style={{ width: '400px' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h1 className="h3 mb-2 text-odoo-primary">🛠️ GearGuard</h1>
            <p className="text-muted">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">
                Remember me
              </label>
            </div>

            <button type="submit" className="btn btn-odoo-primary w-100 mb-3">
              Sign In
            </button>

            <div className="text-center">
              <a href="#" className="text-decoration-none text-odoo-primary">Forgot password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
