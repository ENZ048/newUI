import React from "react";

const SuggestionsList = ({ suggestions, handleSendMessage }) => {
  return (
    <div style={{ padding: "0 20px 20px", marginTop: "16px" }}>
      <p style={{ fontSize: "13px", color: "#888", marginBottom: "10px" }}>
        Try asking me about:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {suggestions.map(({ label, icon, bg }, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(label)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#f9f9f9",
              color: "#111",
              border: "1px solid transparent",
              borderRadius: "14px",
              padding: "12px 16px",
              fontSize: "14px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              const textLabel = e.currentTarget.querySelector(".label-text");
              if (textLabel) {
                textLabel.style.backgroundImage =
                  "linear-gradient(90deg, hsla(344, 97%, 63%, 1), hsla(232, 90%, 59%, 1))";
                textLabel.style.backgroundClip = "text";
                textLabel.style.webkitBackgroundClip = "text";
                textLabel.style.webkitTextFillColor = "transparent";
              }
              e.currentTarget.style.border = "1px solid #ddd";
            }}
            onMouseLeave={(e) => {
              const textLabel = e.currentTarget.querySelector(".label-text");
              if (textLabel) {
                textLabel.style.backgroundImage = "";
                textLabel.style.backgroundClip = "";
                textLabel.style.webkitBackgroundClip = "";
                textLabel.style.webkitTextFillColor = "";
                textLabel.style.color = "#111";
              }
              e.currentTarget.style.border = "1px solid transparent";
            }}
          >
            <div
              style={{
                background: bg,
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {icon}
            </div>
            <span className="label-text">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsList;
