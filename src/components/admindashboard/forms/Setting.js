import { React, useEffect, useState } from "react";
// import useFetch from "hooks/useFetch";

import axios from "axios";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import useAuth from "../../hooks/useAuth";
import {
  FiSettings,
  FiBell,
  FiMic,
  FiDatabase,
  FiShield,
  FiUser,
} from "react-icons/fi";
import Profile from "./Profile";
import General from "./General";
import "./point.css";
import Notify from "./Notify";
import Voice from "./Voice";
import Data from "./Data";
import "./all.css";
import Security from "./Security";
const Setting = () => {
  const { user } = useAuth(); // Get authenticated user from context
  const [activeSetting, setActiveSetting] = useState("general"); // or "general"

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <body>
        <div class="main-wrapper">
          <TopNav />
          <SideNav />
          <div
            class="page-wrapper"
            style={{
              backgroundColor: "#212121",
              marginBottom: "0",
              height: "100%",
            }}
          >
            <div
              class="content settings-content"
              style={{
                backgroundColor: "#000",
                marginTop: "30px",
                borderRadius: "20px",
                height: "100%",
              }}
            >
              <div class="row">
                <div class="col-xl-12">
                  <div class="settings-wrapper d-flex">
                    <div
                      class="sidebars settings-sidebar theiaStickySidebar"
                      id="sidebar2"
                      style={{
                        backgroundColor: "#000",
                        border: "none",
                      }}
                    >
                      <div class="sidebar-inner slimscroll">
                        <div id="sidebar-menu5" class="sidebar-menu">
                          <ul>
                            <li class="submenu-open">
                              <ul>
                                <li>
                                  <a
                                    onClick={() => setActiveSetting("general")}
                                  >
                                    <FiSettings
                                      size={16}
                                      style={{
                                        marginRight: "8px",
                                        color: "white",
                                      }}
                                    />
                                    <span
                                      style={{
                                        color: "white",
                                        fontSize: "20px",
                                      }}
                                    >
                                      General Settings
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() =>
                                      setActiveSetting("notification")
                                    }
                                  >
                                    <FiBell
                                      size={16}
                                      style={{
                                        marginRight: "8px",
                                        color: "white",
                                      }}
                                    />
                                    <span
                                      style={{
                                        color: "white",
                                        fontSize: "20px",
                                      }}
                                    >
                                      Notification
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a onClick={() => setActiveSetting("speech")}>
                                    <FiMic
                                      size={16}
                                      style={{
                                        marginRight: "8px",
                                        color: "white",
                                      }}
                                    />
                                    <span
                                      style={{
                                        color: "white",
                                        fontSize: "20px",
                                      }}
                                    >
                                      Speech
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() => setActiveSetting("profile")}
                                  >
                                    <FiUser
                                      size={16}
                                      style={{
                                        marginRight: "8px",
                                        color: "white",
                                      }}
                                    />
                                    <span
                                      style={{
                                        color: "white",
                                        fontSize: "20px",
                                      }}
                                    >
                                      Profile Settings
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a onClick={() => setActiveSetting("data")}>
                                    <FiDatabase
                                      size={16}
                                      style={{
                                        marginRight: "8px",
                                        color: "white",
                                      }}
                                    />
                                    <span
                                      style={{
                                        color: "white",
                                        fontSize: "20px",
                                      }}
                                    >
                                      Data control
                                    </span>
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() => setActiveSetting("security")}
                                  >
                                    <FiShield
                                      size={16}
                                      style={{
                                        marginRight: "8px",
                                        color: "white",
                                      }}
                                    />
                                    <span
                                      style={{
                                        color: "white",
                                        fontSize: "20px",
                                      }}
                                    >
                                      Security
                                    </span>
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="settings-page-wrap ">
                      {activeSetting === "profile" && <Profile />}
                      {activeSetting === "general" && <General />}
                      {activeSetting === "notification" && <Notify />}
                      {activeSetting === "speech" && <Voice />}
                      {activeSetting === "data" && <Data />}
                      {activeSetting === "security" && <Security />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Setting;
