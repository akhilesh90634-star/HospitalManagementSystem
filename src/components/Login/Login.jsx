import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Reg/Reg.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔥 FORCE LOGOUT WHEN LOGIN PAGE LOADS
  useEffect(() => {
    localStorage.removeItem("loggedUser");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch(
      `https://hospitalbackendrender.onrender.com/users?email=${email}&password=${password}`
    );
    const data = await res.json();
    console.log(data);

    if (data.length === 0) {
      setError("Invalid email or password");
      return;
    }

    const user = data[0];
    localStorage.setItem("loggedUser", JSON.stringify(user));

    if (user.role === "admin") {
      navigate("/admin-dashboard", { replace: true });
    } else {
      navigate("/patient-dashboard", { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.button}>Login</button>
      </form>
    </div>
  );
}

export default Login;
