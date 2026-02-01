import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientCardLogic from "./PatientCardandLogic/PatientCardLogic";
import AdminAppointments from "./AdminAppointments";
import styles from "../Reg/Reg.module.css";

function AdminDashboard() {
  const [view, setView] = useState("patients");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ padding: 20 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20
        }}
      >
        <h1>Admin Dashboard</h1>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setView("patients")} className={styles.button}>
            Patients
          </button>
          <button onClick={() => setView("appointments")} className={styles.button}>
            Appointments
          </button>
          <button onClick={logout} className={styles.button}>
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      {view === "patients" && <PatientCardLogic />}
      {view === "appointments" && <AdminAppointments />}
    </div>
  );
}

export default AdminDashboard;
