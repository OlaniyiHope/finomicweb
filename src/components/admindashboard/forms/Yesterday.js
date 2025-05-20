import React, { useEffect, useRef, useState, Fragment } from "react";

import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import TopNav from "../TopNav";
import SideNav from "../SideNav";
import Sidebars from "../Sidebars";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import "./point.css";
import { useSidebar } from "../SidebarProvider";

import { FaPlus, FaMicrophone } from "react-icons/fa";
import { FiSend } from "react-icons/fi"; // Optional send icon
const iconButtonStyle = {
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
  padding: "6px",
  borderRadius: "5px",
  transition: "background 0.3s",
};

const Yesterday = () => {
  const { user } = useAuth();
  const { isSidebarOpen } = useSidebar(); // Sidebar state
  const apiUrl = process.env.REACT_APP_API_URL;

  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I assist you today?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(uuidv4()); // Generate chatId once
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null); // For triggering file input click
  const imageInputRef = useRef(null);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const chatTitle = "Investment Chat"; // or any dynamic title you prefer
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/ai/fin-inquiry/yesterday`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }
        );
        console.log(response.data); // Log the full response

        // Check if chat data exists and update the messages state
        if (response.data && response.data.data) {
          const chatMessages = response.data.data.map((msg) => ({
            sender: msg.sender,
            text: msg.user_message,
            aiResponse: msg.ai_response,
          }));
          // setMessages(chatMessages);
          setMessages(chatMessages.reverse());
        }
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };

    fetchChatHistory();
  }, [apiUrl]); // Only re-run when apiUrl changes

  // const handleSendMessage = async (e) => {
  //   e.preventDefault();
  //   if (!newMessage.trim()) return;

  //   const userMessage = { sender: "user", text: newMessage };
  //   setMessages((prev) => [...prev, userMessage]); // Optimistic UI

  //   try {
  //     const response = await axios.post(
  //       `${apiUrl}/api/ai/fin-inquiry`,
  //       {
  //         chatTitle,
  //         chatId,
  //         userMessage: newMessage,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
  //         },
  //       }
  //     );

  //     // Access AI response correctly
  //     const aiReply = {
  //       sender: "ai",

  //       text: response.data.data.ai_response || "Received",
  //     };

  //     setMessages((prev) => [...prev, aiReply]);
  //     setNewMessage("");
  //   } catch (err) {
  //     console.error(err);
  //     const aiError = { sender: "ai", text: "Failed to send. Try again." };
  //     setMessages((prev) => [...prev, aiError]);
  //   }
  // };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedFile) return;

    const userMessage = { sender: "user", text: newMessage };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const formData = new FormData();
      formData.append("chatTitle", chatTitle);
      formData.append("chatId", chatId);
      formData.append("userMessage", newMessage);
      if (selectedFile) {
        formData.append("supportingFile", selectedFile);
      }

      const response = await axios.post(
        `${apiUrl}/api/ai/fin-inquiry`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const aiReply = {
        sender: "ai",
        text: response.data.data.ai_response || "Received",
      };

      setMessages((prev) => [...prev, aiReply]);
      setNewMessage("");
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Failed to send. Try again." },
      ]);
    }
  };
  // This handles clicking the "+" button
  const toggleUploadMenu = () => {
    setShowUploadMenu((prev) => !prev);
  };

  // Handle file and image selection
  const handleFileClick = () => {
    fileInputRef.current.click();
    setShowUploadMenu(false);
  };

  const handleImageClick = () => {
    imageInputRef.current.click();
    setShowUploadMenu(false);
  };
  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  return (
    <div>
      <body>
        <div className={`main-wrapper ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <SideNav />
          <TopNav />
          <div
            className="page-wrapper"
            style={{
              marginTop: "10px",
              backgroundColor: "#212121",
              marginBottom: "0px",
              height: "100%",
              marginBottom: "0",
            }}
          >
            <div className="content">
              <div
                className="chat-container"
                style={{
                  backgroundColor: "#212121",
                }}
              >
                <div className="chat-messages">
                  {messages.map((msg, index) => (
                    <Fragment key={index}>
                      {/* User Message */}
                      <div className="message user-message">
                        <div className="message-text">{msg.text}</div>
                      </div>

                      {/* AI Response (if exists) */}
                      {msg.aiResponse && (
                        <div className="message ai-message">
                          <div className="message-text">{msg.aiResponse}</div>
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>

                {/* Message Input */}
                <form
                  onSubmit={handleSendMessage}
                  className="chat-input-area"
                  style={{ backgroundColor: "#212121" }}
                >
                  {/* Show selected file */}
                  {selectedFile && (
                    <div
                      style={{
                        marginBottom: "8px",
                        backgroundColor: "#333",
                        padding: "8px",
                        borderRadius: "6px",
                        color: "white",
                        fontSize: "13px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{selectedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#ff5c5c",
                          fontSize: "14px",
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <textarea
                    className="chat-textarea"
                    placeholder="Send a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{
                      resize: "none",
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                      color: "white",
                      fontSize: "14px",
                      width: "100%",
                      minHeight: "60px",
                    }}
                    rows={3}
                  />

                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <input
                    type="file"
                    ref={imageInputRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {/* Action buttons (bottom right) */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "8px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        title="Upload"
                        style={iconButtonStyle}
                        onClick={toggleUploadMenu}
                        // onClick={handleUploadClick}
                      >
                        <FaPlus size={16} />
                      </button>

                      {showUploadMenu && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: "70px",

                            background: "#333",
                            borderRadius: "8px",
                            padding: "10px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                            zIndex: 10,
                            color: "white",
                            minWidth: "160px",
                          }}
                        >
                          <div
                            style={{ padding: "8px", cursor: "pointer" }}
                            onClick={handleFileClick}
                          >
                            📁 Upload file
                          </div>
                          <div
                            style={{ padding: "8px", cursor: "pointer" }}
                            onClick={handleImageClick}
                          >
                            🖼️ Upload image
                          </div>
                          <div
                            style={{
                              padding: "8px",
                              color: "gray",
                              cursor: "not-allowed",
                            }}
                          >
                            🔗 Connect to Google Drive
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        title="Voice"
                        style={iconButtonStyle}
                      >
                        <FaMicrophone size={16} />
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="send-button"
                      style={{
                        backgroundColor: "#01007a",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "8px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <FiSend size={16} />
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Yesterday;
