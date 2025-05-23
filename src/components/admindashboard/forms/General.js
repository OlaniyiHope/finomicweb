import React, { useState } from "react";
import "./point.css";
const General = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <div>
      <div className="setting-title">
        <h4 style={{ color: "white" }}>General Settings</h4>
      </div>

      {/* Theme */}
      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Theme</label>
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
          <option value="dark">Dark Mode</option>
          <option value="light">Light Mode</option>
        </select>
      </div>

      {/* Follow-up Suggestions */}
      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Follow-up Suggestions</label>
        <div>
          <input
            type="checkbox"
            checked={showSuggestions}
            onChange={() => setShowSuggestions(!showSuggestions)}
            style={{ marginRight: "10px" }}
          />
          <span>{showSuggestions ? "On" : "Off"}</span>
        </div>
      </div>

      {/* Language */}
      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="form-select"
          style={{
            width: "200px",
            backgroundColor: "transparent",
            color: "white",
            border: "1px solid #ccc",
          }}
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      {/* Archive Actions */}
      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Archive Chat</label>
        <button className="btn btn-warning">Archive Chat</button>
      </div>

      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Archive All Chats</label>
        <button className="btn btn-warning">Archive All Chats</button>
      </div>

      <div
        className="mb-3 d-flex justify-content-between align-items-center"
        style={{ color: "white" }}
      >
        <label>Delete Chat</label>
        <button className="btn btn-danger">Delete Chat</button>
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

export default General;
