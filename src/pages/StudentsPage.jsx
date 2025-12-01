import React, { useEffect, useState } from 'react';
import API from '../api.js';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get('/students')
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="top-bar-title">Students</div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Branch</th>
              <th>Grad Year</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.branch || '-'}</td>
                <td>{s.graduation_year || '-'}</td>
                <td>{s.created_at}</td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="5" style={{ fontSize: 12, color: '#9ca3af' }}>
                  No students registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
