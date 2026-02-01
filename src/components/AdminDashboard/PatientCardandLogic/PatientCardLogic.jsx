// PatientCardLogic.jsx
import React, { useEffect, useState } from "react";
import PatientCard from "./PatientCard";
import styles from "../../Reg/Reg.module.css";
import { useNavigate } from "react-router-dom";

export default function PatientCardLogic() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const baseUrl = "https://hospitalbackendrender.onrender.com/users";

  const fetchPatients = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${baseUrl}?role=patient`);
      if (!res.ok) throw new Error("Failed to fetch patients");
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error(err);
      setError("Could not load patients. Is JSON Server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleDelete = async (patient) => {
    const ok = window.confirm(
      `Delete patient "${patient.name}"? This cannot be undone.`
    );
    if (!ok) return;

    try {
      const res = await fetch(`${baseUrl}/${patient.id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Delete failed");
      setPatients((prev) => prev.filter((p) => p.id !== patient.id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete patient. Try again.");
    }
  };

  const handleEdit = (patient) => {
    navigate(`/patients/${patient.id}/edit`);
  };

  const handleView = (patient) => {
    navigate(`/patients/${patient.id}`);
  };

  const filtered = patients.filter((p) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.email && p.email.toLowerCase().includes(q)) ||
      (p.phoneno && p.phoneno.includes(q))
    );
  });

  return (
    <div style={{ maxWidth: 1000, margin: "20px auto", padding: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14
        }}
      >
        <h2 style={{ margin: 0 }}>Patients</h2>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            placeholder="Search by name, email or phone"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
            style={{ width: 320 }}
          />
          <button
            onClick={fetchPatients}
            className={styles.button}
            style={{ padding: "8px 12px" }}
          >
            Refresh
          </button>
        </div>
      </div>

      {loading && <p>Loading patients...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div style={{ display: "grid", gap: 12 }}>
        {filtered.length === 0 && !loading ? (
          <div
            style={{
              padding: 12,
              borderRadius: 8,
              background: "#fff",
              boxShadow: "0 6px 18px rgba(12,15,22,0.04)"
            }}
          >
            No patients found.
          </div>
        ) : (
          filtered.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))
        )}
      </div>
    </div>
  );
}
