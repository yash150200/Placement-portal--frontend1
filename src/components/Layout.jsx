import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Layout({ user, onLogout, children }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return children; // for login/register

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="sidebar-logo">
            PLACE<span>MENT</span>
          </div>
          <div className="sidebar-user">
            {user.name} · {user.role.toUpperCase()}
          </div>
        </div>

        <div>
          <div className="nav-section-title">Main</div>
          <div className="nav-list">
            <button
              className={`nav-item ${isActive('/') ? 'nav-item-active' : ''}`}
              onClick={() => navigate('/')}
            >
              Dashboard
              <span>overview</span>
            </button>
            <button
              className={`nav-item ${location.pathname.startsWith('/jobs') ? 'nav-item-active' : ''}`}
              onClick={() => navigate('/jobs')}
            >
              Jobs
              <span>browse</span>
            </button>
            {user.role === 'student' && (
              <button
                className={`nav-item ${location.pathname.startsWith('/applications') ? 'nav-item-active' : ''}`}
                onClick={() => navigate('/applications/my')}
              >
                My Applications
                <span>status</span>
              </button>
            )}
          </div>
        </div>

        {user.role === 'tpo' && (
          <div>
            <div className="nav-section-title">TPO Control</div>
            <div className="nav-list">
              <button
                className={`nav-item ${location.pathname.startsWith('/tpo/jobs') ? 'nav-item-active' : ''}`}
                onClick={() => navigate('/tpo/jobs')}
              >
                Manage Jobs
                <span>create/edit</span>
              </button>
              <button
                className={`nav-item ${location.pathname.startsWith('/tpo/students') ? 'nav-item-active' : ''}`}
                onClick={() => navigate('/tpo/students')}
              >
                Students
                <span>pipeline</span>
              </button>
            </div>
          </div>
        )}

        <div>
          <div className="nav-section-title">Account</div>
          <div className="nav-list">
            <button
              className={`nav-item ${location.pathname.startsWith('/profile') ? 'nav-item-active' : ''}`}
              onClick={() => navigate('/profile')}
            >
              Profile
              <span>edit</span>
            </button>
            <button className="nav-item" onClick={onLogout}>
              Logout
              <span>exit</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
