import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api.js';

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState('student');
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', { ...form, role });
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ marginBottom: 14 }}>
          <div className="login-title">Placement Portal</div>
          <div className="login-subtitle">
            Sign in as a <span style={{ color: '#f97316' }}>{role.toUpperCase()}</span>
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
          {error && (
            <div style={{ fontSize: 12, color: '#f97316' }}>{error}</div>
          )}
          <button type="submit" className="button">
            Login
          </button>
        </form>

        <div style={{ marginTop: 12, fontSize: 12, color: '#9ca3af' }}>
          New here?{' '}
          <Link to="/register" style={{ color: '#f97316' }}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
