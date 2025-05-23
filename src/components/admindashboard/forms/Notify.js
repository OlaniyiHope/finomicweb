import React, { useState } from "react";
import "./point.css";
const Notify = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <div>
      <div className="setting-title">
        <h4 style={{ color: "white" }}>Notification Settings</h4>
      </div>

      {/* Theme */}
      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Responses</label>
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
          <option value="dark">Push</option>
          <option value="light">Email</option>
        </select>
      </div>
      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Tasks</label>
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
          <option value="dark">Push</option>
          <option value="light">Email</option>
        </select>
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

export default Notify;
