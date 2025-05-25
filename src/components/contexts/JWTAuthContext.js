import React, { createContext, useEffect, useState, useReducer } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  loading: true,
};

const apiUrl = process.env.REACT_APP_API_URL;

// Utility function to check if the token is still valid
const isValidToken = (jwtToken) => {
  if (!jwtToken) {
    return false;
  }
  const decodedToken = jwtDecode(jwtToken);

  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (token, refreshToken) => {
  if (token) {
    console.log("Saving tokens:", token, refreshToken);
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("refreshToken", refreshToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    console.log("Removing tokens");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");
    delete axios.defaults.headers.common["Authorization"];
  }
};
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return null;
  }

  try {
    const response = await axios.post(`${apiUrl}/api/auth/refresh-token`, {
      refreshToken,
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    await setSession(accessToken, newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error("Refresh token failed:", error);
    setSession(null, null);
    return null;
  }
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
// Reducer function to manage state changes
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialised: true,
        user: action.payload.user,
      };
    case "LOGIN":
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true); // Add loading state
  const [showModal, setShowModal] = useState(false); // Modal state
  const navigate = useNavigate();
  let logoutTimer;

  // Function to reset inactivity timer
  const resetTimer = () => {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      console.log("User inactive for 1 hour. Logging out...");
      logout();
    }, 60 * 60 * 1000); // 1 hour
  };

  useEffect(() => {
    // Listen for user activity and reset the timer
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    // Start the timer initially
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearTimeout(logoutTimer);
    };
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      // const accessToken = localStorage.getItem("accessToken");
      const accessToken = localStorage.getItem("jwtToken");

      if (accessToken && isValidToken(accessToken)) {
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        dispatch({
          type: "INIT",
          payload: {
            isAuthenticated: true,
            user: null, // Fetch user profile if necessary
          },
        });
      } else {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: true,
              user: null, // Fetch user profile if necessary
            },
          });
        } else {
          dispatch({
            type: "INIT",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    console.log("GoogleOauth useEffect triggered");
    console.log("Full URL:", window.location.href);

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    console.log("Extracted Tokens from URL:", { accessToken, refreshToken });

    if (accessToken && refreshToken) {
      console.log("Tokens found! Storing them in localStorage.");
      localStorage.setItem("jwtToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      console.log("Tokens saved! Navigating to /home...");
      navigate("/home", { replace: true });
    } else {
      console.log("No valid tokens found in URL. Staying on /login.");
    }
  }, [navigate]);

  useEffect(() => {
    const initAuth = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      console.log("Retrieved JWT Token from localStorage:", jwtToken); // Debugging

      if (jwtToken) {
        const decoded = jwtDecode(jwtToken);
        console.log("Decoded Token:", decoded);

        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expired. Logging out user.");
          // setShowModal(true); // Show modal
          dispatch({ type: "LOGOUT" }); // Log out user
          setLoading(false);
          return;
        }

        if (isValidToken(jwtToken)) {
          console.log("Token is valid. Fetching user profile...");
          setSession(jwtToken, localStorage.getItem("refreshToken"));

          try {
            console.log("Fetching user profile...");

            const response = await axios.get(`${apiUrl}/api/auth/profile`, {
              headers: { Authorization: `Bearer ${jwtToken}` },
              withCredentials: true,
            });
            console.log("Fetched User Profile:", response.data); // Debugging
            console.log("Full API Response:", response); // Log entire response

            if (response.data) {
              localStorage.setItem("user", JSON.stringify(response.data)); // Ensure user is stored
              dispatch({
                type: "INIT",
                payload: { isAuthenticated: true, user: response.data },
              });
            } else {
              console.log("No user found in API response");
              dispatch({
                type: "INIT",
                payload: { isAuthenticated: false, user: null },
              });
            }
          } catch (err) {
            console.error("Error fetching user profile:", err); // Added missing console.error
            dispatch({
              type: "INIT",
              payload: { isAuthenticated: false, user: null },
            });
          }
        } else {
          console.log("Token is invalid");
          dispatch({
            type: "INIT",
            payload: { isAuthenticated: false, user: null },
          });
        }
      } else {
        console.log("No JWT token found");
        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null },
        });
      }

      setLoading(false);
    };
    initAuth();
  }, []);

  // useEffect(() => {
  //   initAuth();
  // }, []);

  if (loading) return <p>Loading...</p>; // Prevent rendering before auth check

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { accessToken, refreshToken, user } = response.data.data;

        // Store in localStorage
        localStorage.setItem("jwtToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        // Set session headers
        setSession(accessToken, refreshToken);

        // Dispatch to context
        dispatch({
          type: "LOGIN",
          payload: { user },
        });

        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (fullname, email, phone, password) => {
    try {
      const payload = {
        fullname,
        email,
        phone,
        password,
      };

      const response = await axios.post(`${apiUrl}/api/auth/register`, payload);

      if (response.status === 201) {
        const { token, user, refreshToken } = response.data;

        // Save token and user in localStorage
        setSession(token, refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({
          type: "REGISTER",
          payload: { user },
        });

        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  };

  // Logout method to clear session
  const logout = () => {
    setShowModal(false);
    setSession(null); // Clear session and tokens
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");

    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  // Wait until initial state is loaded

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
