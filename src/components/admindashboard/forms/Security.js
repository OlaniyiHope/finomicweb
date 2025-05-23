import React, { useState } from "react";
import "./point.css";
const Security = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <div>
      <div className="setting-title">
        <h4 style={{ color: "white" }}>Security Settings</h4>
      </div>

      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Multi-factor Authentication</label>
        <br></br>

        <button
          className="btn"
          style={{
            backgroundColor: "transparent",
            borderRadius: "50px",
            border: "1px solid white",
            color: "white",
          }}
        >
          Enable
        </button>
      </div>
      <p style={{ color: "white", fontSize: "13px", fontWeight: "300" }}>
        Require an extra security challenge when logging in. If you are unable
        to pass this challenge, you will have the option to recover your account
        via email.
      </p>
      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Logout of all device</label>
        <br></br>

        <button
          className="btn"
          style={{
            backgroundColor: "transparent",
            borderRadius: "50px",
            border: "1px solid white",
            color: "white",
          }}
        >
          Log out all
        </button>
      </div>
      <p style={{ color: "white", fontSize: "13px", fontWeight: "300" }}>
        Log out of all active sessions across all devices, including your
        current session. It may take up to 30 minutes for other devices to be
        logged out.
      </p>
      {/* Save/Cancel */}
      {/*} <div className="text-end settings-bottom-btn mt-4">
        <button
          type="button"
          className="btn me-2"
          style={{ backgroundColor: "red", color: "white" }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: "#4444ff", color: "white" }}
        >
          Save Changes
        </button>
      </div>*/}
    </div>
  );
};

export default Security;
