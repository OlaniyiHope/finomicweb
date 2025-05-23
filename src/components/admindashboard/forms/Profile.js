// import React, { useEffect, useState } from "react";
// import TopNav from "../TopNav";
// import useAuth from "../../hooks/useAuth";
// import SideNav from "../SideNav";
// import { FaUserCircle } from "react-icons/fa";

// import axios from "axios";

// const Profile = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState(null); // local profile state
//   const { user } = useAuth(); // Get authenticated user from context
//   const apiUrl = process.env.REACT_APP_API_URL;

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (storedUser?.id) {
//       axios
//         .get(`${apiUrl}/api/auth/profile/${storedUser.id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
//           },
//         })
//         .then((res) => {
//           setProfile(res.data.data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Failed to load profile", err);
//           setLoading(false);
//         });
//     } else {
//       setLoading(false);
//     }
//   }, [apiUrl]);

//   if (loading || !profile) return <p>Loading profile...</p>;

//   return (
//     <div>
//       <div className="main-wrapper">
//         <TopNav />
//         <SideNav />
//         <div className="page-wrapper" style={{ backgroundColor: "#2f2f2f" }}>
//           <div className="content">
//             <div className="page-header">
//               <div className="page-title">
//                 <h4 style={{ color: "white" }}>Profile</h4>
//                 <h6 style={{ color: "white" }}> User Profile</h6>
//               </div>
//             </div>

//             <div className="card">
//               <div className="card-body">
//                 <div className="profile-set">
//                   <div className="profile-head"></div>
//                   <div className="profile-top">
//                     <div className="profile-content">
//                       <div className="profile-contentimg">
//                         <img
//                           src={
//                             profile.profileImage ||
//                             "https://via.placeholder.com/150"
//                           }
//                           alt="Profile"
//                           id="blah"
//                         />
//                         <div className="profileupload">
//                           <input type="file" id="imgInp" />
//                           <a href="#!">
//                             <img
//                               src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/edit-set.svg"
//                               alt="Edit"
//                             />
//                           </a>
//                         </div>
//                       </div>
//                       <div className="profile-contentname">
//                         <h2>{profile.fullname}</h2>
//                         <h4>Update your photo and personal details.</h4>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-lg-6 col-sm-12">
//                     <div className="input-blocks">
//                       <label className="form-label">Full Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={profile.fullname}
//                         readOnly
//                       />
//                     </div>
//                   </div>

//                   <div className="col-lg-6 col-sm-12">
//                     <div className="input-blocks">
//                       <label>Email</label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         value={profile.email}
//                         readOnly
//                       />
//                     </div>
//                   </div>

//                   <div className="col-lg-6 col-sm-12">
//                     <div className="input-blocks">
//                       <label className="form-label">Password</label>
//                       <div className="pass-group">
//                         <input
//                           type="password"
//                           className="pass-input form-control"
//                           value="********"
//                           readOnly
//                         />
//                         <span className="fas toggle-password fa-eye-slash"></span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-12">
//                     <button className="btn btn-submit me-2">Submit</button>
//                     <button className="btn btn-cancel">Cancel</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
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

  return (
    <div>
      <form action="https://dreamspos.dreamstechnologies.com/html/template/general-settings.html">
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
                class="form-control"
                style={{
                  backgroundColor: "transparent", // ✅ transparent instead of "none"
                  color: "white", // Optional: white text
                  border: "1px solid #ccc", // Optional: custom border if needed
                }}
                // value={user?.fullname}
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
                class="form-control"
                style={{
                  backgroundColor: "transparent", // ✅ transparent instead of "none"
                  color: "white", // Optional: white text
                  border: "1px solid #ccc", // Optional: custom border if needed
                }}
                // value={user.fullname}
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
