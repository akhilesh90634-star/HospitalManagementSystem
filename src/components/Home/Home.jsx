import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20
      }}
    >
      <h1>Hospital Management System</h1>
      <p>Please login or register to continue</p>

      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/login">
          <button style={{ padding: "8px 16px" }}>Login</button>
        </Link>

        <Link to="/register">
          <button style={{ padding: "8px 16px" }}>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
