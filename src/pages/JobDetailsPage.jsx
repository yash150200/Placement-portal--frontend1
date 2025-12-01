import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api.js';

export default function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get(`/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await API.post('/applications', {
        jobId: Number(id),
        resume_url: resumeUrl,
        cover_letter: coverLetter
      });
      setMessage('Application submitted successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to apply');
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-title">{job.title}</div>
        <div className="badge">{job.company}</div>
      </div>

      <div className="card-grid">
        <div className="card">
          <div className="card-header">Details</div>
          <div style={{ fontSize: 13, lineHeight: 1.6 }}>
            <div><strong>Location:</strong> {job.location}</div>
            <div><strong>CTC:</strong> {job.ctc || '-'}</div>
            <div><strong>Last Date:</strong> {job.last_date || '-'}</div>
            <div><strong>Status:</strong> {job.status}</div>
            <div style={{ marginTop: 10 }}>
              <strong>Description:</strong>
              <div>{job.description || 'No description provided'}</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <strong>Requirements:</strong>
              <div>{job.requirements || 'No requirements specified'}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Apply</div>
          <form
            onSubmit={handleApply}
            style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6 }}
          >
            <div>
              <label style={{ fontSize: 12 }}>Resume URL (Drive / Link)</label>
              <input
                className="input"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <label style={{ fontSize: 12 }}>Cover Letter (optional)</label>
              <textarea
                className="textarea"
                rows="4"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </div>
            {message && (
              <div style={{ fontSize: 12, color: '#f97316' }}>{message}</div>
            )}
            <button type="submit" className="button">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
