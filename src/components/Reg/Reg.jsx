import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Reg.module.css";

function Reg() {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confrimPassword, setconfrimPassword] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    if (!age) newErrors.age = "Age is required";
    else if (isNaN(age) || age <= 0) newErrors.age = "Enter a valid age";

    if (!phoneno) newErrors.phoneno = "Phone number is required";
    else if (!/^\d{10}$/.test(phoneno))
      newErrors.phoneno = "Phone number must be 10 digits";

    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Enter a valid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!confrimPassword)
      newErrors.confrimPassword = "Please confirm your password";
    else if (password !== confrimPassword)
      newErrors.confrimPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newUser = {
      name,
      age: Number(age),
      phoneno,
      email,
      password,
      role: "patient"
    };

    try {
      const res = await fetch(
        "https://hospitalbackendrender.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
        }
      );

      if (!res.ok) {
        throw new Error("Failed to register");
      }

      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Age</label>
          <input
            type="number"
            className={styles.input}
            value={age}
            onChange={(e) => setage(e.target.value)}
          />
          {errors.age && <p className={styles.error}>{errors.age}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            className={styles.input}
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
          />
          {errors.phoneno && (
            <p className={styles.error}>{errors.phoneno}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Confirm Password</label>
          <input
            type="password"
            className={styles.input}
            value={confrimPassword}
            onChange={(e) => setconfrimPassword(e.target.value)}
          />
          {errors.confrimPassword && (
            <p className={styles.error}>{errors.confrimPassword}</p>
          )}
        </div>

        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Reg;
