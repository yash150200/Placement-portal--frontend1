import React, { useEffect, useState } from 'react';
import API from '../api.js';

export default function MyApplicationsPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get('/applications/my')
      .then((res) => setApps(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-title">My Applications</div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Company</th>
              <th>Location</th>
              <th>Status</th>
              <th>Applied At</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.company}</td>
                <td>{a.location}</td>
                <td>
                  <span className="badge badge-orange">{a.status}</span>
                </td>
                <td>{a.applied_at}</td>
              </tr>
            ))}
            {apps.length === 0 && (
              <tr>
                <td colSpan="5" style={{ fontSize: 12, color: '#9ca3af' }}>
                  You haven't applied to any job yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
