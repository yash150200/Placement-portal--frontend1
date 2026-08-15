// import React from 'react';

// export default function ProfilePage({ user }) {
//   if (!user) return null;

//   return (
//     <>
//       <div className="top-bar">
//         <div className="top-bar-title">Profile</div>
//       </div>

//       <div className="card-grid">
//         <div className="card">
//           <div className="card-header">Basic Info</div>
//           <div style={{ fontSize: 13, lineHeight: 1.7 }}>
//             <div><strong>Name:</strong> {user.name}</div>
//             <div><strong>Email:</strong> {user.email}</div>
//             <div><strong>Role:</strong> {user.role.toUpperCase()}</div>
//             {user.role === 'student' && (
//               <>
//                 <div><strong>Branch:</strong> {user.branch || '-'}</div>
//                 <div><strong>Graduation Year:</strong> {user.graduation_year || '-'}</div>
//               </>
//             )}
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-header">Status</div>
//           <div style={{ fontSize: 13 }}>
//             <div className="badge badge-green">Active account</div>
//             <div className="card-subtext" style={{ marginTop: 8 }}>
//               Future improvement: allow editing profile, upload resume, LinkedIn, etc.
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React from "react";

export default function ProfilePage({ user }) {
  if (!user) return null;

  return (
    <>
      {/* ===== Placement Portal Styling ===== */}
      <style>{`
        .top-bar {
          background: linear-gradient(90deg, #0f172a, #1e293b);
          padding: 18px 26px;
          border-radius: 14px;
          margin-bottom: 28px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.35);
        }

        .top-bar-title {
          font-size: 20px;
          font-weight: 600;
          color: #f8fafc;
          letter-spacing: 0.4px;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 22px;
        }

        .card {
          // background: #ffffff;
          // background: rgba(0, 0, 0, 0.5);
           background: radial-gradient(circle at top left, rgba(249, 115, 22, 0.2), #020617 60%);
          border-radius: 18px;
          padding: 22px 24px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.08);
          transition: all 0.25s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 48px rgba(0, 0, 0, 0.14);
        }

        .card-header {
          font-size: 15px;
          font-weight: 600;
          // color: #0f172a;
          color:white;
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e7eb;
          letter-spacing: 0.3px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          padding: 6px 0;
          font-size: 13px;
          // color: #334155;
          color: white;
        }

        .info-row span {
          font-weight: 500;
          // color: #0f172a;
           color: white;
        }

        .badge {
          display: inline-block;
          padding: 7px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.4px;
        }

        .badge-green {
          background: linear-gradient(135deg, #22c55e, #15803d);
          color: #ffffff;
          box-shadow: 0 6px 18px rgba(34, 197, 94, 0.4);
        }

        .card-subtext {
          margin-top: 10px;
          font-size: 12px;
          // color: #64748b;
           color: white;
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .top-bar-title {
            font-size: 18px;
          }
        }
      `}</style>

      {/* ===== Header ===== */}
      <div className="top-bar">
        <div className="top-bar-title">Profile Overview</div>
      </div>

      {/* ===== Profile Cards ===== */}
      <div className="card-grid">
        {/* Basic Info */}
        <div className="card">
          <div className="card-header">Basic Information</div>

          <div className="info-row">
            <div>Name</div>
            <span>{user.name}</span>
          </div>

          <div className="info-row">
            <div>Email</div>
            <span>{user.email}</span>
          </div>

          <div className="info-row">
            <div>Role</div>
            <span>{user.role.toUpperCase()}</span>
          </div>

          {user.role === "student" && (
            <>
              <div className="info-row">
                <div>Branch</div>
                <span>{user.branch || "-"}</span>
              </div>

              <div className="info-row">
                <div>Graduation Year</div>
                <span>{user.graduation_year || "-"}</span>
              </div>
            </>
          )}
        </div>

        {/* Status */}
        <div className="card">
          <div className="card-header">Account Status</div>

          <div style={{ fontSize: 13 }}>
            <div className="badge badge-green">Active Account</div>

            <div className="card-subtext">
              This account is verified and eligible for placement activities.
              Future enhancements include profile editing, resume upload,
              LinkedIn/GitHub integration, and profile completion tracking.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
