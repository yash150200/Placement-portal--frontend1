import React, { useEffect, useState } from 'react';
import API from '../api.js';

export default function TPODashboard() {
  const [stats, setStats] = useState({ users: [], jobs: [], applications: [] });

  useEffect(() => {
    async function load() {
      try {
        const res = await API.get('/students/stats/overview');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const getCount = (arr, key, value) => {
    const item = arr.find((x) => x[key] === value);
    return item ? item.count : 0;
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-title">TPO Dashboard</div>
        <div className="badge badge-green">Admin View</div>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">Students</div>
          <div className="card-value">
            {stats.users.reduce((sum, x) => sum + x.count, 0)}
          </div>
          <div className="card-subtext">Total registered students</div>
        </div>
        <div className="card">
          <div className="card-header">Open Jobs</div>
          <div className="card-value">{getCount(stats.jobs, 'status', 'open')}</div>
          <div className="card-subtext">Active job postings</div>
        </div>
        <div className="card">
          <div className="card-header">Applications</div>
          <div className="card-value">
            {stats.applications.reduce((sum, x) => sum + x.count, 0)}
          </div>
          <div className="card-subtext">Total applications received</div>
        </div>
      </div>
    </>
  );
}
