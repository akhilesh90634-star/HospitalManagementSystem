import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    phoneno: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://hospitalbackendrender.onrender.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPatient({
          name: data.name || "",
          age: data.age || "",
          gender: data.gender || "",
          email: data.email || "",
          phoneno: data.phoneno || ""
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `https://hospitalbackendrender.onrender.com/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(patient)
      }
    );

    if (res.ok) {
      alert("Patient updated successfully");
      navigate("/admin-dashboard");
    } else {
      alert("Update failed");
    }
  };

  if (loading) return <h3 style={{ padding: 20 }}>Loading...</h3>;

  return (
    <div style={{ padding: 30 }}>
      <h1>Edit Patient</h1>

      <form onSubmit={handleUpdate} style={{ maxWidth: 400 }}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={patient.name}
          onChange={handleChange}
          required
        />

        <label>Age</label>
        <input
          type="number"
          name="age"
          value={patient.age}
          onChange={handleChange}
          required
        />

        <label>Gender</label>
        <select
          name="gender"
          value={patient.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={patient.email}
          onChange={handleChange}
          required
        />

        <label>Phone</label>
        <input
          type="text"
          name="phoneno"
          value={patient.phoneno}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: 15 }}>
          Update
        </button>
      </form>
    </div>
  );
}

export default EditPatient;
