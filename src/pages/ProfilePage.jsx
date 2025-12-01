import React from 'react';

export default function ProfilePage({ user }) {
  if (!user) return null;

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-title">Profile</div>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">Basic Info</div>
          <div style={{ fontSize: 13, lineHeight: 1.7 }}>
            <div><strong>Name:</strong> {user.name}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Role:</strong> {user.role.toUpperCase()}</div>
            {user.role === 'student' && (
              <>
                <div><strong>Branch:</strong> {user.branch || '-'}</div>
                <div><strong>Graduation Year:</strong> {user.graduation_year || '-'}</div>
              </>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">Status</div>
          <div style={{ fontSize: 13 }}>
            <div className="badge badge-green">Active account</div>
            <div className="card-subtext" style={{ marginTop: 8 }}>
              Future improvement: allow editing profile, upload resume, LinkedIn, etc.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
