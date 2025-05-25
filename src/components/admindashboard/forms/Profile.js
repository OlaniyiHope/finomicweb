import React, { useEffect, useState } from "react";
import TopNav from "../TopNav";
import useAuth from "../../hooks/useAuth";
import SideNav from "../SideNav";
import { FaUserCircle } from "react-icons/fa";

import axios from "axios";

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null); // local profile state
  const { user } = useAuth(); // Get authenticated user from context
  const apiUrl = process.env.REACT_APP_API_URL;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("Stored user from localStorage:", storedUser);

    if (storedUser?._id) {
      axios
        .get(`${apiUrl}/api/auth/profile/${storedUser._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        })
        .then((res) => {
          console.log("Profile API response:", res.data);
          setProfile(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load profile", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [apiUrl]);

  // Debug: log the current profile on each render
  console.log("Current profile state:", profile);

  return (
    <div>
      <form action="">
        <div class="setting-title">
          <h4 style={{ color: "white" }}>Profile Settings</h4>
        </div>
        <div class="card-title-head">
          <h6 style={{ color: "white" }}>
            <span>
              <i data-feather="user" class="feather-chevron-up"></i>
            </span>
            User Information
          </h6>
        </div>
        <div class="profile-pic-upload">
          <div class="profile-pic">
            <span>
              <i data-feather="plus-circle" class="plus-down-add"></i> Profile
              Photo
            </span>
          </div>
          <div class="new-employee-field">
            <div class="mb-0">
              <label
                className="image-upload mb-0"
                style={{
                  backgroundColor: "#4444ff",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  borderRadius: "4px",
                  height: "50px", // Optional: consistent height
                }}
              >
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                  }}
                />
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Change Image
                </span>
              </label>

              <span>
                For better preview recommended size is 450px x 450px. Max size
                5MB.
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="mb-3">
              <label class="form-label" style={{ color: "white" }}>
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "1px solid #ccc",
                }}
                value={profile?.fullname || ""} // use optional chaining and fallback to empty string
                onChange={(e) => {
                  setProfile((prev) => ({ ...prev, fullname: e.target.value }));
                }}
              />
            </div>
          </div>

          <div class="col-md-12">
            <div class="mb-3">
              <label class="form-label" style={{ color: "white" }}>
                Email
              </label>
              <input
                type="email"
                className="form-control"
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  border: "1px solid #ccc",
                }}
                value={profile?.email || ""}
                onChange={(e) => {
                  setProfile((prev) => ({ ...prev, email: e.target.value }));
                }}
              />
            </div>
          </div>
        </div>

        <div class="text-end settings-bottom-btn">
          <button
            type="button"
            class="btn btn-cancel me-2 "
            style={{ backgroundColor: "red", color: "white" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-submit "
            style={{
              backgroundColor: "#4444ff",
              color: "white",
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
