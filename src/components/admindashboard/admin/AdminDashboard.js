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

const AdminDashboard = () => {
  const { user } = useAuth();
  const { isSidebarOpen } = useSidebar(); // Sidebar state
  const apiUrl = process.env.REACT_APP_API_URL;

  const [messages, setMessages] = useState([
    // { sender: "ai", text: "Hello! How can I assist you today?" },
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
        const response = await axios.get(`${apiUrl}/api/ai/fin-inquiry`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        });
        console.log(response.data); // Log the full response

        // Check if chat data exists and update the messages state
        // if (response.data && response.data.data) {
        //   const chatMessages = response.data.data.map((msg) => ({
        //     sender: msg.userId, // or msg.sender if you have it
        //     text: msg.userMessage, // Correct property name
        //     aiResponse: msg.aiResponse,
        //   }));
        //   // setMessages(chatMessages);
        //   setMessages(chatMessages.reverse());
        // }
        if (response.data && response.data.data) {
          const chatMessages = response.data.data
            .slice() // Clone the array to avoid mutating original
            .reverse() // Reverse the chat entries
            .flatMap((msg) => [
              {
                sender: "user",
                text: msg.userMessage,
              },
              {
                sender: "ai",
                text: msg.aiResponse,
              },
            ]);

          setMessages(chatMessages);
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

      // const chatData = response.data.data;
      // const lastMessage = chatData[chatData.length - 1];

      // const aiReply = {
      //   sender: "ai",
      //   text: lastMessage.aiResponse || "Received",
      // };
      const chatData = response.data.data;

      const aiReply = {
        sender: "ai",
        text: chatData.aiResponse || "Received",
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
            }}
          >
            <div className="content">
              <div
                className="chat-container"
                // style={{
                //   backgroundColor: "#212121",
                // }}
              >
                <div className="chat-messages">
                  {messages.length === 0 ? (
                    <div className=" placeholder-message">
                      <div
                        style={{
                          color: "white",
                          fontWeight: "800",
                          fontSize: "30px",
                          width: "100%",
                        }}
                      >
                        What can I help you with?
                      </div>
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <Fragment key={index}>
                        {msg.sender === "user" && (
                          <div className="message user-message">
                            <div className="message-text">{msg.text}</div>
                          </div>
                        )}
                        {msg.sender === "ai" && (
                          <div className="message ai-message">
                            <div className="message-text">{msg.text}</div>
                          </div>
                        )}
                      </Fragment>
                    ))
                  )}
                </div>

                <form onSubmit={handleSendMessage} className="chat-input-area">
                  {/* Selected file preview */}
                  {selectedFile && (
                    <div className="chat-upload-preview">
                      <span>{selectedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
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
                    rows={3}
                  />

                  {/* Hidden file/image inputs */}
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

                  {/* Action buttons */}
                  <div className="chat-input-actions">
                    <div className="chat-icon-buttons">
                      <button
                        type="button"
                        title="Upload"
                        style={iconButtonStyle}
                        onClick={toggleUploadMenu}
                      >
                        <FaPlus size={16} />
                      </button>

                      {showUploadMenu && (
                        <div className="upload-menu">
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

                    <button type="submit" className="chat-send-button">
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

export default AdminDashboard;
