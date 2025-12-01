import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api.js';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/jobs')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-title">Jobs</div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Company</th>
              <th>Location</th>
              <th>CTC</th>
              <th>Last Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.id}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.ctc || '-'}</td>
                <td>{job.last_date || '-'}</td>
                <td>
                  <span
                    className={`badge ${
                      job.status === 'open' ? 'badge-green' : 'badge-orange'
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan="6" style={{ fontSize: 12, color: '#9ca3af' }}>
                  No jobs found. Check back later.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
