import React from "react";
import PropTypes from "prop-types";

export default function PatientCard({ patient, onEdit, onDelete, onView }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: "#fff",
        boxShadow: "0 6px 18px rgba(12,15,22,0.06)",
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          minWidth: 0
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: "#eef2ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "#4f46e5",
            flexShrink: 0
          }}
        >
          {patient.name
            ? patient.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
            : "P"}
        </div>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 16,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {patient.name || "Unnamed Patient"}
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginTop: 4
            }}
          >
            {patient.gender
              ? `${patient.gender} • ${patient.age} yrs`
              : `${patient.age} yrs`}
          </div>

          <div
            style={{
              fontSize: 13,
              color: "#6b7280",
              marginTop: 4
            }}
          >
            {patient.email} • {patient.phoneno}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {onView && (
          <button
            onClick={() => onView(patient)}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: "transparent",
              cursor: "pointer"
            }}
          >
            View
          </button>
        )}

        {onEdit && (
          <button
            onClick={() => onEdit(patient)}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "none",
              background: "#06b6d4",
              color: "#042f3a",
              cursor: "pointer",
              fontWeight: 700
            }}
          >
            Edit
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(patient)}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              border: "1px solid #fee2e2",
              background: "#fff5f5",
              color: "#b91c1c",
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

PatientCard.propTypes = {
  patient: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onView: PropTypes.func
};
