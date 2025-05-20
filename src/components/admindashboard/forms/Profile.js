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

    if (storedUser?.id) {
      axios
        .get(`${apiUrl}/api/auth/profile/${storedUser.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        })
        .then((res) => {
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

  if (loading || !profile) return <p>Loading profile...</p>;

  return (
    <div>
      <div className="main-wrapper">
        <TopNav />
        <SideNav />
        <div className="page-wrapper" style={{ backgroundColor: "#2f2f2f" }}>
          <div className="content">
            <div className="page-header">
              <div className="page-title">
                <h4 style={{ color: "white" }}>Profile</h4>
                <h6 style={{ color: "white" }}> User Profile</h6>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="profile-set">
                  <div className="profile-head"></div>
                  <div className="profile-top">
                    <div className="profile-content">
                      <div className="profile-contentimg">
                        <img
                          src={
                            profile.profileImage ||
                            "https://via.placeholder.com/150"
                          }
                          alt="Profile"
                          id="blah"
                        />
                        <div className="profileupload">
                          <input type="file" id="imgInp" />
                          <a href="#!">
                            <img
                              src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/edit-set.svg"
                              alt="Edit"
                            />
                          </a>
                        </div>
                      </div>
                      <div className="profile-contentname">
                        <h2>{profile.fullname}</h2>
                        <h4>Update your photo and personal details.</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-sm-12">
                    <div className="input-blocks">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profile.fullname}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-12">
                    <div className="input-blocks">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={profile.email}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-12">
                    <div className="input-blocks">
                      <label className="form-label">Password</label>
                      <div className="pass-group">
                        <input
                          type="password"
                          className="pass-input form-control"
                          value="********"
                          readOnly
                        />
                        <span className="fas toggle-password fa-eye-slash"></span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <button className="btn btn-submit me-2">Submit</button>
                    <button className="btn btn-cancel">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
