// import React, { useEffect, useState } from 'react';
// import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
// import API from './api.js';

// import LoginPage from './pages/LoginPage.jsx';
// import RegisterPage from './pages/RegisterPage.jsx';
// import StudentDashboard from './pages/StudentDashboard.jsx';
// import TPODashboard from './pages/TPODashboard.jsx';
// import JobsPage from './pages/JobsPage.jsx';
// import JobDetailsPage from './pages/JobDetailsPage.jsx';
// import MyApplicationsPage from './pages/MyApplicationsPage.jsx';
// import JobManagementPage from './pages/JobManagementPage.jsx';
// import StudentsPage from './pages/StudentsPage.jsx';
// import ProfilePage from './pages/ProfilePage.jsx';
// import Layout from './components/Layout.jsx';

// export default function App() {
//   const [user, setUser] = useState(null);
//   const [loadingUser, setLoadingUser] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setLoadingUser(false);
//       return;
//     }
//     API.get('/auth/me')
//       .then(res => {
//         setUser(res.data);
//       })
//       .catch(() => {
//         localStorage.removeItem('token');
//       })
//       .finally(() => setLoadingUser(false));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/login');
//   };

//   if (loadingUser) {
//     return (
//       <div className="login-page">
//         <div style={{ color: '#f97316' }}>Loading...</div>
//       </div>
//     );
//   }

//   if (!user && location.pathname !== '/register') {
//     return (
//       <Routes>
//         <Route path="/login" element={<LoginPage onLogin={setUser} />} />
//         <Route path="/register" element={<RegisterPage onRegister={setUser} />} />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     );
//   }

//   return (
//     <Layout user={user} onLogout={handleLogout}>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             user.role === 'tpo' ? (
//               <TPODashboard />
//             ) : (
//               <StudentDashboard />
//             )
//           }
//         />
//         <Route path="/jobs" element={<JobsPage />} />
//         <Route path="/jobs/:id" element={<JobDetailsPage />} />
//         <Route path="/applications/my" element={<MyApplicationsPage />} />
//         <Route
//           path="/tpo/jobs"
//           element={user.role === 'tpo' ? <JobManagementPage /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/tpo/students"
//           element={user.role === 'tpo' ? <StudentsPage /> : <Navigate to="/" />}
//         />
//         <Route path="/profile" element={<ProfilePage user={user} />} />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Layout>
//   );
// }
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import API from './api.js';

import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import TPODashboard from './pages/TPODashboard.jsx';
import JobsPage from './pages/JobsPage.jsx';
import JobDetailsPage from './pages/JobDetailsPage.jsx';
import MyApplicationsPage from './pages/MyApplicationsPage.jsx';
import JobManagementPage from './pages/JobManagementPage.jsx';
import StudentsPage from './pages/StudentsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import Layout from './components/Layout.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user (me)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoadingUser(false);
      return;
    }

    API.get('/auth/me')
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => setLoadingUser(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  // STILL LOADING? SHOW LOADING SCREEN
  if (loadingUser) {
    return (
      <div className="login-page">
        <div style={{ color: "#f97316" }}>Loading...</div>
      </div>
    );
  }

  // NOT LOGGED IN → Only allow login/register pages
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/register" element={<RegisterPage onRegister={setUser} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // LOGGED IN (user exists)
  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route
          path="/"
          element={user.role === "tpo" ? <TPODashboard /> : <StudentDashboard />}
        />

        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />

        <Route path="/applications/my" element={<MyApplicationsPage />} />

        <Route
          path="/tpo/jobs"
          element={user.role === "tpo" ? <JobManagementPage /> : <Navigate to="/" />}
        />

        <Route
          path="/tpo/students"
          element={user.role === "tpo" ? <StudentsPage /> : <Navigate to="/" />}
        />

        <Route path="/profile" element={<ProfilePage user={user} />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}
