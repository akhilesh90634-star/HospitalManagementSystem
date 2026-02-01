import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Reg/Reg.module.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
      {/* Hero */}
      <header
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #0ea5a9 60%)",
          color: "white",
          padding: "72px 24px",
          borderRadius: "0 0 24px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            gap: 40,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 300 }}>
            <h1 style={{ fontSize: 40, margin: 0, lineHeight: 1.05, fontWeight: 700 }}>
              Modern Hospital Management
            </h1>

            <p style={{ marginTop: 16, fontSize: 18, opacity: 0.95 }}>
              Streamline patient care, appointments, and admin tasks — all in one
              beautiful, secure dashboard.
            </p>

            {/* CTA buttons */}
            <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("/register")}
                style={{
                  padding: "12px 20px",
                  borderRadius: 10,
                  background: "#06b6d4",
                  border: "none",
                  color: "#052f3d",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Register as Patient
              </button>

              {/* 🔥 LOGIN OPENS IN NEW TAB */}
              <button
                onClick={() => window.open("/login", "_blank")}
                style={{
                  padding: "12px 20px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            </div>

            {/* Stats */}
            <div
              style={{
                marginTop: 20,
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>99.9%</div>
                <div style={{ fontSize: 13 }}>Uptime</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>1000+</div>
                <div style={{ fontSize: 13 }}>Patients Managed</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>24/7</div>
                <div style={{ fontSize: 13 }}>Support</div>
              </div>
            </div>
          </div>

          {/* Preview card */}
          <div style={{ width: 420, minWidth: 260 }}>
            <div
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                borderRadius: 14,
                padding: 18,
                color: "white",
                boxShadow: "0 10px 30px rgba(2,6,23,0.6)",
              }}
            >
              <h3 style={{ marginTop: 0 }}>Quick Preview</h3>
              <ul style={{ margin: "12px 0 0 18px", lineHeight: 1.6 }}>
                <li>Easily add or manage patients</li>
                <li>Admin-approved access & role controls</li>
                <li>Secure local JSON DB for demo (JSON Server)</li>
              </ul>

              <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                <button
                  onClick={() => window.open("/admin-dashboard", "_blank")}
                  style={{ padding: "8px 12px", borderRadius: 8, border: "none", cursor: "pointer" }}
                >
                  Try Admin
                </button>
                <button
                  onClick={() => window.open("/patient-dashboard", "_blank")}
                  style={{ padding: "8px 12px", borderRadius: 8, border: "none", cursor: "pointer" }}
                >
                  Try Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <main style={{ maxWidth: 1100, margin: "36px auto", padding: "0 20px" }}>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 18,
          }}
        >
          {[
            ["Patient Management", "Add, edit and monitor patient records quickly."],
            ["Role-based Access", "Admins and patients have dedicated dashboards."],
            ["Lightweight Demo DB", "Powered by JSON Server for quick prototyping."],
            ["Secure & Simple", "Demo-only passwords. Use backend auth in production."],
          ].map(([title, desc]) => (
            <div
              key={title}
              style={{
                padding: 18,
                borderRadius: 12,
                background: "#fff",
                boxShadow: "0 6px 20px rgba(12,15,22,0.06)",
              }}
            >
              <h4 style={{ margin: 0 }}>{title}</h4>
              <p style={{ marginTop: 8, color: "#374151" }}>{desc}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          marginTop: 42,
          padding: "18px 12px",
          textAlign: "center",
          color: "#6b7280",
        }}
      >
        <small>
          © {new Date().getFullYear()} Hospital Management — Demo. Not for production
          use.
        </small>
      </footer>
    </div>
  );
}
