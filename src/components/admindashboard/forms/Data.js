import React, { useState } from "react";
import "./point.css";
const Data = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <div>
      <div className="setting-title">
        <h4 style={{ color: "white" }}>Data Control Settings</h4>
      </div>

      {/* Theme */}
      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Improve the model for everyone</label>
        <select
          value={darkMode ? "dark" : "light"}
          onChange={(e) => setDarkMode(e.target.value === "dark")}
          className="form-select"
          style={{
            width: "200px",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid #ccc",
          }}
        >
          <option value="dark">on</option>
          <option value="light">off</option>
        </select>
      </div>
      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Shared Link</label>
        <button
          className="btn"
          style={{
            backgroundColor: "transparent",
            borderRadius: "50px",
            border: "1px solid white",
            color: "white",
          }}
        >
          Manage
        </button>
      </div>
      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Export Data</label>
        <button
          className="btn"
          style={{
            backgroundColor: "transparent",
            borderRadius: "50px",
            border: "1px solid white",
            color: "white",
          }}
        >
          Export
        </button>
      </div>
      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Delete Account</label>
        <button
          className="btn"
          style={{
            backgroundColor: "transparent",
            borderRadius: "50px",
            border: "1px solid white",
            color: "white",
          }}
        >
          Delete
        </button>
      </div>
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

export default Data;
