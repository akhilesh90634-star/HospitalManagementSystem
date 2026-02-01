import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Reg/Reg.module.css";

function PatientDashboard() {
  const navigate = useNavigate();
  const patient = JSON.parse(localStorage.getItem("loggedUser"));

  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const baseUrl = "https://hospitalbackendrender.onrender.com/appointments";

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    navigate("/login", { replace: true });
  };

  // 📥 Fetch ONLY this patient's appointments
  const fetchAppointments = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}?patientId=${patient.id}`);
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  }, [baseUrl, patient.id]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // ➕ Book appointment
  const handleBook = async (e) => {
    e.preventDefault();
    if (!date || !reason) return;

    setLoading(true);

    const newAppointment = {
      patientId: patient.id,
      patientName: patient.name,
      date,
      reason,
      status: "Pending"
    };

    await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAppointment)
    });

    setDate("");
    setReason("");
    setLoading(false);
    fetchAppointments();
  };

  // ❌ Cancel appointment
  const handleCancel = async (appointment) => {
    const ok = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!ok) return;

    try {
      const res = await fetch(`${baseUrl}/${appointment.id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      // 🔥 Update UI immediately
      setAppointments((prev) =>
        prev.filter((a) => a.id !== appointment.id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to cancel appointment");
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20
        }}
      >
        <h1>Patient Dashboard</h1>

        <button
          onClick={handleLogout}
          className={styles.button}
          style={{ width: "auto", padding: "8px 16px" }}
        >
          Logout
        </button>
      </div>

      {/* 👤 Patient Info */}
      <div
        style={{
          padding: 16,
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 6px 18px rgba(12,15,22,0.06)",
          marginBottom: 20
        }}
      >
        <h3>Your Profile</h3>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Phone:</strong> {patient.phoneno}</p>
      </div>

      {/* 📅 Book Appointment */}
      <div
        style={{
          padding: 16,
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 6px 18px rgba(12,15,22,0.06)",
          marginBottom: 20
        }}
      >
        <h3>Book Appointment</h3>

        <form onSubmit={handleBook} style={{ display: "grid", gap: 10 }}>
          <input
            type="date"
            className={styles.input}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <input
            placeholder="Reason for visit"
            className={styles.input}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          <button className={styles.button} disabled={loading}>
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>

      {/* 📋 Appointment List */}
      <div
        style={{
          padding: 16,
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 6px 18px rgba(12,15,22,0.06)"
        }}
      >
        <h3>Your Appointments</h3>

        {appointments.length === 0 ? (
          <p>No appointments booked yet.</p>
        ) : (
          appointments.map((a) => (
            <div
              key={a.id}
              style={{
                padding: 12,
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <p><strong>Date:</strong> {a.date}</p>
                <p><strong>Reason:</strong> {a.reason}</p>
                <p><strong>Status:</strong> {a.status}</p>
              </div>

              <button
                onClick={() => handleCancel(a)}
                style={{
                  padding: "6px 10px",
                  background: "#fff5f5",
                  border: "1px solid #fecaca",
                  borderRadius: 8,
                  color: "#b91c1c",
                  cursor: "pointer"
                }}
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;
