// import './App.css';
// // import Home from './components/Home/Home';
// import Reg from './components/Reg/Reg';
// import Login from './components/Login/Login';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AdminDashboard from './components/AdminDashboard/AdminDashboard';
// import PatientDashboard from './components/PatientDashboard/PatientDashboard';
// import Home from './components/Home/Home';
// import ViewPatient from "./components/AdminDashboard/PatientCardandLogic/ViewPatient";
// import EditPatient from "./components/AdminDashboard/PatientCardandLogic/EditPatient";

// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Reg />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/patient-dashboard" element={<PatientDashboard />} />
//         <Route path="/viewpatient" element={<ViewPatient />} />
//         <Route path="/editpatient" element={<EditPatient />} />
//       </Routes>
//     </BrowserRouter>
//       {/* <Home/> */}
//       {/* <Reg/> */}
//       {/* <Login/> */}
//     </div> 
//   );
// }

// export default App;



import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home/Home";
import Reg from "./components/Reg/Reg";
import Login from "./components/Login/Login";

import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import PatientDashboard from "./components/PatientDashboard/PatientDashboard";

import ViewPatient from "./components/AdminDashboard/PatientCardandLogic/ViewPatient";
import EditPatient from "./components/AdminDashboard/PatientCardandLogic/EditPatient";

/* =====================
   🔒 Protected Route
===================== */
function ProtectedRoute({ children, role }) {
  const storedUser = localStorage.getItem("loggedUser");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(storedUser);

  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Public Landing Page */}
        <Route path="/" element={<Home />} />

        {/* 🌐 Public */}
        <Route path="/register" element={<Reg />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients/:id"
          element={
            <ProtectedRoute role="admin">
              <ViewPatient />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patients/:id/edit"
          element={
            <ProtectedRoute role="admin">
              <EditPatient />
            </ProtectedRoute>
          }
        />

        {/* 🔐 Patient */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🚫 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
