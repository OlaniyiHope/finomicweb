import { useState, useEffect } from "react";
import logo from "./oga4.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSidebar } from "./SidebarProvider";
import "./side.css";
import {
  FiHome,
  FiCreditCard,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiBookOpen,
  FiChevronDown,
  FiCompass,
  FiMessageSquare,
  FiClock,
} from "react-icons/fi";
import { MdPermMedia } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation

const SideNav = () => {
  const [openSubmenus, setOpenSubmenus] = useState(new Set());
  const { isSidebarOpen } = useSidebar();
  const toggleSubmenu = (index) => {
    const updatedSubmenus = new Set(openSubmenus);
    if (updatedSubmenus.has(index)) {
      updatedSubmenus.delete(index);
    } else {
      updatedSubmenus.add(index);
    }
    setOpenSubmenus(updatedSubmenus);
  };
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/categories`);
        const allCategories = res.data;
        setCategories(allCategories);
        const parents = allCategories.filter(
          (cat) => !cat.parent || cat.parent === null
        );
        setParentCategories(parents);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);
  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();
    // Navigate to login page
    navigate("/login");
  };
  return (
    <div className="main-wrapper">
      <div
        className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}
        id="sidebar"
        style={{ backgroundColor: "#202123", color: "#fff" }}
      >
        <div
          className="sidebar-inner slimscroll"
          style={{
            overflowY: "auto",
            maxHeight: "100vh",
          }}
        >
          <div id="sidebar-menu" className="sidebar-menu">
            <ul style={{ paddingBottom: "80px" }}>
              <li className="submenu-open">
                <ul>
                  <li className="submenu">
                    <a
                      href="/home"
                      className={`${isActive("/home") ? "active-menu" : ""}`}
                      style={{
                        backgroundColor: isActive("/home")
                          ? "#343541"
                          : "transparent",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <FiHome
                        size={20}
                        color={isActive("/home") ? "white" : "#ccc"}
                      />
                      <span
                        style={{
                          fontSize: "18px",
                          color: isActive("/home") ? "white" : "#ccc",
                        }}
                      >
                        Dashboard
                      </span>
                    </a>
                  </li>

                  <li className="submenu">
                    <a href="/library">
                      <MdPermMedia
                        size={20}
                        color={isActive("/digital") ? "white" : "white"}
                      />
                      <span
                        style={{
                          fontSize: "18px",
                          color: isActive("/digital") ? "white" : "white",
                        }}
                      >
                        Library
                      </span>
                    </a>
                  </li>
                  <li className="submenu">
                    <a href="/api-docs">
                      <FiBookOpen
                        size={20}
                        color={isActive("/digital") ? "white" : "white"}
                      />
                      <span
                        style={{
                          fontSize: "18px",
                          color: isActive("/digital") ? "white" : "white",
                        }}
                      >
                        Api Docs
                      </span>
                    </a>
                  </li>

                  {/* Settings */}

                  <li className="submenu">
                    <a href="/today">
                      <FiMessageSquare
                        size={20}
                        color={isActive("/today") ? "white" : "white"}
                      />
                      <span
                        style={{
                          fontSize: "18px",
                          color: isActive("/today") ? "white" : "white",
                        }}
                      >
                        Today's Chat
                      </span>
                    </a>
                  </li>
                  <li className="submenu">
                    <a href="/yesterday">
                      <FiClock
                        size={20}
                        color={isActive("/yesterday") ? "white" : "white"}
                      />
                      <span
                        style={{
                          fontSize: "18px",
                          color: isActive("/yesterday") ? "white" : "white",
                        }}
                      >
                        Yesterday Chat
                      </span>
                    </a>
                  </li>
                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubmenu(5);
                      }}
                      className={`${
                        openSubmenus.has(5) ? "subdrop active" : ""
                      }`.trim()}
                      style={{
                        backgroundColor: openSubmenus.has(5)
                          ? "#343541"
                          : "transparent",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <MdPermMedia
                        size={20}
                        color={openSubmenus.has(5) ? "white" : "white"}
                      />
                      <span
                        style={{
                          fontSize: "18px",
                          color: openSubmenus.has(5) ? "white" : "white",
                        }}
                      >
                        Financial Inquiry
                      </span>
                      <FiChevronDown
                        style={{
                          marginLeft: "auto",
                          transform: openSubmenus.has(5)
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          color: "white",
                        }}
                      />
                    </a>
                    {openSubmenus.has(5) && (
                      <ul className="submenu-list">
                        <li>
                          <a href="/inquiries">Inquiries</a>
                        </li>
                        <li>
                          <a href="/budgeting">Budgeting</a>
                        </li>
                        <li>
                          <a href="/investment-recommendation">
                            Investment Recomendaions
                          </a>
                        </li>
                        <li>
                          <a href="/money-management">Money Management</a>
                        </li>
                        <li>
                          <a href="/budgeting-insight">Budgeting Insight</a>
                        </li>
                        <li>
                          <a href="/goal-tracking">Goal Tracking</a>
                        </li>
                        <li>
                          <a href="/financial-advice">Financial Advice</a>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubmenu(7);
                      }}
                      className={`${
                        openSubmenus.has(7) ? "subdrop active" : ""
                      }`.trim()}
                      style={{
                        backgroundColor: openSubmenus.has(7)
                          ? "#343541"
                          : "transparent",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <MdPermMedia
                        size={20}
                        color={openSubmenus.has(7) ? "white" : "white"}
                      />
                      <span
                        style={{
                          fontSize: "18px",
                          color: openSubmenus.has(7) ? "white" : "white",
                        }}
                      >
                        Investment
                      </span>
                      <FiChevronDown
                        style={{
                          marginLeft: "auto",
                          transform: openSubmenus.has(7)
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          color: "white",
                        }}
                      />
                    </a>
                    {openSubmenus.has(7) && (
                      <ul className="submenu-list">
                        <li>
                          <a href="/investment-portfolio-recommendation">
                            Investment Portfolio Recommendation
                          </a>
                        </li>
                        <li>
                          <a href="/market-analysis">Market Analysis</a>
                        </li>
                        <li>
                          <a href="/decentralized-finance">
                            DeFi(Decentralized Finance)
                          </a>
                        </li>
                        <li>
                          <a href="/ai-powered-credit-solution">
                            AI powered credit solution
                          </a>
                        </li>
                        <li>
                          <a href="/stock">Stocks</a>
                        </li>
                        <li>
                          <a href="/bond">Bond</a>
                        </li>
                        <li>
                          <a href="/crypto">Crypto</a>
                        </li>
                        <li>
                          <a href="/forex">Forex</a>
                        </li>
                        <li>
                          <a href="/real-estate">Real Estate</a>
                        </li>
                        <li>
                          <a href="/block-chain">Block Chain</a>
                        </li>
                        <li>
                          <a href="/market-insight">Market Insight</a>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li className="submenu">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubmenu(8);
                      }}
                      className={`${
                        openSubmenus.has(8) ? "subdrop active" : ""
                      }`.trim()}
                      style={{
                        backgroundColor: openSubmenus.has(8)
                          ? "#343541"
                          : "transparent",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <MdPermMedia
                        size={20}
                        color={openSubmenus.has(8) ? "white" : "white"}
                      />
                      <span
                        style={{
                          fontSize: "18px",
                          color: openSubmenus.has(8) ? "white" : "white",
                        }}
                      >
                        Business Advisory
                      </span>
                      <FiChevronDown
                        style={{
                          marginLeft: "auto",
                          transform: openSubmenus.has(8)
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          color: "white",
                        }}
                      />
                    </a>
                    {openSubmenus.has(8) && (
                      <ul className="submenu-list">
                        <li>
                          <a href="/finance-literacy">Financial Litracy Hub</a>
                        </li>

                        <li>
                          <a href="/ai-based-tax">AI-based tax</a>
                        </li>

                        <li>
                          <a href="/mobile-money">Mobile Money</a>
                        </li>

                        <li>
                          <a href="/digital-finance-integration">
                            DIgital Finance Integration
                          </a>
                        </li>

                        <li>
                          <a href="/connectivity">Connectivity</a>
                        </li>

                        <li>
                          <a href="/expense-tracker">Expense Tracking</a>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="submenu">
                    <a
                      href="/loan-recommendation"
                      onClick={() => setShowLogoutModal(true)}
                    >
                      <FiLogOut size={20} color="white" />
                      <span style={{ fontSize: "18px", color: "white" }}>
                        Loan Recomendation
                      </span>
                    </a>
                  </li>
                  <li className="submenu">
                    <a
                      href="/financial-coaching"
                      onClick={() => setShowLogoutModal(true)}
                    >
                      <FiLogOut size={20} color="white" />
                      <span style={{ fontSize: "18px", color: "white" }}>
                        Financial Coaching
                      </span>
                    </a>
                  </li>

                  <li className="submenu">
                    <a href="#" onClick={() => setShowLogoutModal(true)}>
                      <FiLogOut size={20} color="white" />
                      <span style={{ fontSize: "18px", color: "white" }}>
                        Logout
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="sidebar-overlay" data-reff="#sidebar"></div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div
            className=" rounded-lg shadow-lg max-w-md w-full p-6"
            style={{ backgroundColor: "#2f2f2f" }}
          >
            <h3
              className="text-lg font-medium  mb-4"
              style={{ color: "white" }}
            >
              Confirm Logout
            </h3>
            <p className="text-gray-500 mb-5">
              Are you sure you want to logout from your account?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add any additional scripts or components here */}
    </div>
  );
};

export default SideNav;
