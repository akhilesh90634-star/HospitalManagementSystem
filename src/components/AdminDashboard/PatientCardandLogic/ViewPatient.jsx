import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ViewPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://hospitalbackendrender.onrender.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPatient(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <h3 style={{ padding: 20 }}>Loading...</h3>;
  if (!patient) return <h3 style={{ padding: 20 }}>Patient not found</h3>;

  return (
    <div style={{ padding: 30 }}>
      <h1>Patient Details</h1>

      <div style={{ marginTop: 20 }}>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Phone:</strong> {patient.phoneno}</p>
        <p><strong>Role:</strong> {patient.role}</p>
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

export default ViewPatient;
