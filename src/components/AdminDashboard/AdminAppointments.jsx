import React, { useEffect, useState } from "react";
import styles from "../Reg/Reg.module.css";

function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const baseUrl = "https://hospitalbackendrender.onrender.com/appointments";

  const fetchAppointments = async () => {
    try {
      const res = await fetch(baseUrl);
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (appointment, status) => {
    try {
      const res = await fetch(`${baseUrl}/${appointment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      setAppointments(prev =>
        prev.map(a =>
          a.id === appointment.id ? { ...a, status } : a
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update appointment status");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading appointments...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Patient Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 16
          }}
        >
          <thead>
            <tr>
              <th align="left">Patient</th>
              <th align="left">Date</th>
              <th align="left">Reason</th>
              <th align="left">Status</th>
              <th align="left">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map(a => (
              <tr key={a.id} style={{ borderTop: "1px solid #e5e7eb" }}>
                <td>{a.patientName}</td>
                <td>{a.date}</td>
                <td>{a.reason}</td>
                <td>
                  <strong>{a.status}</strong>
                </td>
                <td>
                  {a.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => updateStatus(a, "Approved")}
                        className={styles.button}
                        style={{ padding: "6px 10px", marginRight: 6 }}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => updateStatus(a, "Rejected")}
                        style={{
                          padding: "6px 10px",
                          background: "#fee2e2",
                          border: "1px solid #fecaca",
                          borderRadius: 6,
                          cursor: "pointer"
                        }}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span style={{ color: "#6b7280" }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminAppointments;
