import React, { useEffect, useState } from 'react';
import API from '../api.js';

export default function StudentDashboard() {
  const [stats, setStats] = useState({ jobs: 0, applied: 0 });

  useEffect(() => {
    async function load() {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          API.get('/jobs'),
          API.get('/applications/my')
        ]);
        setStats({
          jobs: jobsRes.data.length,
          applied: appsRes.data.length
        });
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-title">Student Dashboard</div>
        <div className="badge badge-orange">Ready for placements</div>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">Open Jobs</div>
          <div className="card-value">{stats.jobs}</div>
          <div className="card-subtext">Companies actively hiring from your campus</div>
        </div>
        <div className="card">
          <div className="card-header">Applications</div>
          <div className="card-value">{stats.applied}</div>
          <div className="card-subtext">Track your application journey</div>
        </div>
      </div>
    </>
  );
}
