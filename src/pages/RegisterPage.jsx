import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api.js';

export default function RegisterPage({ onRegister }) {
  const [role, setRole] = useState('student');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    branch: '',
    graduation_year: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        ...form,
        graduation_year: form.graduation_year ? Number(form.graduation_year) : null,
        role
      };
      const res = await API.post('/auth/register', payload);
      localStorage.setItem('token', res.data.token);
      onRegister(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ marginBottom: 14 }}>
          <div className="login-title">Create Account</div>
          <div className="login-subtitle">
            Register as <span style={{ color: '#f97316' }}>{role.toUpperCase()}</span>
          </div>
        </div>

        <div className="toggle-role">
          <button
            type="button"
            className={`button ${role === 'student' ? '' : 'button-outline'}`}
            onClick={() => setRole('student')}
          >
            Student
          </button>
          <button
            type="button"
            className={`button ${role === 'tpo' ? '' : 'button-outline'}`}
            onClick={() => setRole('tpo')}
          >
            TPO
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <label style={{ fontSize: 12 }}>Full Name</label>
            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label style={{ fontSize: 12 }}>Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label style={{ fontSize: 12 }}>Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {role === 'student' && (
            <>
              <div>
                <label style={{ fontSize: 12 }}>Branch</label>
                <input
                  className="input"
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label style={{ fontSize: 12 }}>Graduation Year</label>
                <input
                  className="input"
                  name="graduation_year"
                  value={form.graduation_year}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {error && (
            <div style={{ fontSize: 12, color: '#f97316' }}>{error}</div>
          )}

          <button type="submit" className="button">
            Register
          </button>
        </form>

        <div style={{ marginTop: 12, fontSize: 12, color: '#9ca3af' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#f97316' }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
