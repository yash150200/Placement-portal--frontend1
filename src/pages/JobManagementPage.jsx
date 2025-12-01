import React, { useEffect, useState } from 'react';
import API from '../api.js';

export default function JobManagementPage() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    ctc: '',
    description: '',
    requirements: '',
    last_date: '',
    status: 'open'
  });

  const loadJobs = () => {
    API.get('/jobs')
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const startCreate = () => {
    setEditingJob(null);
    setForm({
      title: '',
      company: '',
      location: '',
      ctc: '',
      description: '',
      requirements: '',
      last_date: '',
      status: 'open'
    });
  };

  const startEdit = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      ctc: job.ctc || '',
      description: job.description || '',
      requirements: job.requirements || '',
      last_date: job.last_date || '',
      status: job.status
    });
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await API.put(`/jobs/${editingJob.id}`, form);
      } else {
        await API.post('/jobs', form);
      }
      loadJobs();
      startCreate();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await API.delete(`/jobs/${jobId}`);
      loadJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-title">Job Management</div>
        <button className="button-outline button" onClick={startCreate}>
          New Job
        </button>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">{editingJob ? 'Edit Job' : 'Create Job'}</div>
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6 }}
          >
            <div className="form-row">
              <div className="form-col">
                <label style={{ fontSize: 12 }}>Title</label>
                <input
                  className="input"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-col">
                <label style={{ fontSize: 12 }}>Company</label>
                <input
                  className="input"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <label style={{ fontSize: 12 }}>Location</label>
                <input
                  className="input"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-col">
                <label style={{ fontSize: 12 }}>CTC</label>
                <input
                  className="input"
                  name="ctc"
                  value={form.ctc}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12 }}>Last Date (YYYY-MM-DD)</label>
              <input
                className="input"
                name="last_date"
                value={form.last_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ fontSize: 12 }}>Description</label>
              <textarea
                className="textarea"
                name="description"
                rows="3"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ fontSize: 12 }}>Requirements</label>
              <textarea
                className="textarea"
                name="requirements"
                rows="3"
                value={form.requirements}
                onChange={handleChange}
              />
            </div>
            <div>
              <label style={{ fontSize: 12 }}>Status</label>
              <select
                className="select"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <button type="submit" className="button">
              {editingJob ? 'Update Job' : 'Create Job'}
            </button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">All Jobs</div>
          <table className="table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Company</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>
                    <span
                      className={`badge ${
                        job.status === 'open' ? 'badge-green' : 'badge-orange'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="button-outline button"
                      style={{ marginRight: 6 }}
                      onClick={() => startEdit(job)}
                    >
                      Edit
                    </button>
                    <button
                      className="button-outline button"
                      onClick={() => handleDelete(job.id)}
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ fontSize: 12, color: '#9ca3af' }}>
                    No jobs yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
